import { Program, DOM, Audio, Music } from '../../src'

// Main ------------------------------------------------------------------------
const App = Program.instrument(init, update, audio, view, listen)

App.use(DOM.Event)

// Model -----------------------------------------------------------------------
function init () {
  const voices = [ 'C3', 'E3', 'G3', 'B3', 'D4', 'G4', 'B4' ]

  return {
    count: 0,
    voices: voices.map(Music.Note.ntof)
  }
}

// Update ----------------------------------------------------------------------
const Increment = 'Increment'
const Decrement = 'Decrement'

function update ({ action }, model) {
  switch (action) {
    case Increment:
      if (model.count < model.voices.length) {
        return [{ ...model, count: model.count + 1 }]
      } else {
        return [{ ...model }]
      }

    case Decrement:
      if (model.count > 0) {
        return [{ ...model, count: model.count - 1 }]
      } else {
        return [{ ...model }]
      }
  }
}

// Audio -----------------------------------------------------------------------
function audio (model) {
  return model.voices.map((note, i) => 
    Audio.Node.oscillator([ Audio.Property.frequency(note) ], [
      Audio.Node.gain([ Audio.Property.gain(i < model.count ? 0.1 : 0) ], [
        Audio.Node.dac()
      ])
    ])  
  )
}

// View ------------------------------------------------------------------------
function view ({ count, voices }) {
  return DOM.Element.div([], [
    DOM.Element.button([ DOM.Attribute.id('incr') ], [ '+' ]),
    DOM.Element.div([], [ count.toString() ]),
    DOM.Element.button([ DOM.Attribute.id('decr') ], [ '-' ])
  ])
}

// Listen ----------------------------------------------------------------------
function listen (model) {
  return [
    DOM.Event.click('#incr', e => ({ action: Increment })),
    DOM.Event.click('#decr', e => ({ action: Decrement })),
  ]
}

// Start -----------------------------------------------------------------------
App.start({
  root: document.querySelector('#app'),
  context: new AudioContext(),
  flags: {
    debug: true
  }
})
