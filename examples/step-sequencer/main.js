import { Program, Effect, Action, DOM, Audio } from '../../src'
import { Note, Time } from '../../src/music'

import audio from './audio'
import view from './view'

// Main ------------------------------------------------------------------------
const App = Program.instrument(init, update, audio, view, listen)

App.use(DOM.Event)
App.use(Audio.Event)

App.start({
  root: document.querySelector('#app'),
  context: new AudioContext(),
  flags: {
    debug: true
  }
})

// Model -----------------------------------------------------------------------
function init (flags, time) {
  const row = (note, name, length) => ({ note, name, steps: Array(length).fill(false) })

  const numSteps = 8
  const notes = [ 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4' ] 
  const bpm = 150

  return {
    currentTime: time,
    sequencer: {
      rows: notes.map(note => row(Note.ntof(note), note, numSteps)),
      running: false,
      step: 0,
      stepCount: numSteps,
      stepInterval: Time.sec(bpm, Time.Eighth),
      tempo: bpm,
    },
    synth: {
      attack: 0,
      decay: 0.2,
      type: 'sine',
      delayTime: 1,
      delayAmount: 0.2,
      masterGain: 0
    },
  }
}

// Update ----------------------------------------------------------------------
// Here we declare all of our actions. It's not strictly necessary to do this,
// but doing so allows us to take advantage of auto-completion and helps to
// prevent string-typing our application. 
// Typos and misspellings are common when working with raw strings!
// Sequencer Actions -----------------------------------------------------------
const PLAY = 'play'
const STOP = 'stop'
const TICK = 'tick'
const ADD_STEP = 'add-step'
const RMV_STEP = 'rmv-step'
const TGL_STEP = 'tgl-step'
const RESET_STEPS = 'reset-steps'
// Synth Actions ---------------------------------------------------------------
const MUTE_TOGGLE = 'mute-toggle'
const CHANGE_WAVEFORM = 'change-waveform'
const CHANGE_DELAY = 'change-delay'

function update ({ action, payload }, model) {
  // This is catches mistakes if you try and send the wrong sort of object to
  // the update function.
  if (!action) return model

  switch (action) {
    case PLAY: {
      const sequencer = { ...model.sequencer,
        running: true,
        // The sequencer will immediately tick to the next step after hitting
        // play so setting this to one lower now means we'll start the sequence
        // on the step we're currently on.
        // We also check if the sequencer is already running to prevent this
        // messing with the current step if you hit the play button multiple
        // times.
        step: model.sequencer.running 
          ? model.sequencer.step 
          : model.sequencer.step - 1
      }

      return [{ ...model, sequencer }]
    }

    case STOP: {
      const sequencer = { ...model.sequencer, running: false }

      return [{ ...model, sequencer }]
    }

    case TICK: {
      const { time } = payload
      const step = (model.sequencer.step + 1) % model.sequencer.stepCount
      const sequencer = { ...model.sequencer, step }

      return [{ ...model, currentTime: time, sequencer }]
    }

    case ADD_STEP: {
      const stepCount = model.sequencer.stepCount + 1
      const rows = model.sequencer.rows.map(row => ({
        ...row, steps: [ ...row.steps, false ]
      }))
      const sequencer = { ...model.sequencer, rows, stepCount }

      return [{ ...model, sequencer }]
    }

    case RMV_STEP: {
      // There must always be at least four step sin the sequencer.
      const stepCount = model.sequencer.stepCount > 4
        ? model.sequencer.stepCount - 1
        : model.sequencer.stepCount
      const rows = model.sequencer.rows.map(row => ({
        ...row, steps: row.steps.slice(0, stepCount)
      }))
      const sequencer = { ...model.sequencer, rows, stepCount }

      return [{ ...model, sequencer }]
    }

    case TGL_STEP: {
      const { note, step } = payload
      const rows = model.sequencer.rows.map(row =>
        row.name == note
          ? { ...row, steps: row.steps.map((a, i) => step == i ? !a : a) }
          : row
      )
      const sequencer = { ...model.sequencer, rows }

      return [{ ...model, sequencer }]
    }

    case RESET_STEPS: {
      const rows = model.sequencer.rows.map(row =>
        ({ ...row, steps: row.steps.map(() => false)})  
      )
      const sequencer = { ...model.sequencer, rows }

      return [{ ...model, sequencer }]
    }

    case MUTE_TOGGLE: {
      return [{ ...model, synth: {
        ...model.synth, masterGain: model.synth.masterGain == 1 ? 0 : 1
      }}]
    }

    case CHANGE_WAVEFORM: {
      const { type } = payload
      const synth = { ...model.synth, type }

      return [{ ...model, synth }]
    }

    case CHANGE_DELAY: {
      const { time } = payload
      const synth = { ...model.synth, delayTime: time === 'long' ? 1 : 0.2 }

      return [{ ...model, synth }]
    }

    // This should serve as a handy reminder in case we forget to catch an
    // action in this switch statement while also not crashing that app by just
    // returning the model unchanged.
    default: {
      console.warn(`Unhandled action: ${action}`)
      return [model] 
    }
  }
}

// Listen ----------------------------------------------------------------------
function listen (model) {
  const listeners = [
    DOM.Event.click('#play', () => Action(PLAY)),
    DOM.Event.click('#stop', () => Action(STOP)),
    DOM.Event.click('#add-step', () => Action(ADD_STEP)),
    DOM.Event.click('#rmv-step', () => Action(RMV_STEP)),
    DOM.Event.click('#reset-steps', () => Action(RESET_STEPS)),
    DOM.Event.click('#mute-toggle', () => Action(MUTE_TOGGLE)),
    DOM.Event.click('[data-step]', ({ target }) => { 
      const { note, step } = target.dataset
      return Action(TGL_STEP, { note, step })
    }),
    DOM.Event.click('[data-waveform]', ({ target }) => {
      const { waveform } = target.dataset
      return Action(CHANGE_WAVEFORM, { type: waveform })
    }),
    DOM.Event.click('[data-delay]', ({ target }) => {
      const { delay } = target.dataset
      return Action(CHANGE_DELAY, { time: delay })
    }),
    DOM.Event.keydown('window', ({ key }) => {
      return key == ' '
        ? Action(model.sequencer.running ? STOP : PLAY)
        : {}
    })
  ]

  // We only need to listen for audio timing events when the sequencer is
  // actually running, so we can just conditionally push this listener when we
  // need to.
  if (model.sequencer.running) {
    listeners.push(
      Audio.Event.every('tick', model.sequencer.stepInterval, time => 
        Action(TICK, { time })
      )
    )
  }

  return listeners
}
