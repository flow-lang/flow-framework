import { Element as E, Attribute as A } from '../src/dom'

// Utils -----------------------------------------------------------------------
const combineTailwindCategories = categories =>
  A.className(categories.filter(c => c !== '').join(' '))

// Basic components ------------------------------------------------------------
const button = (id, colour, attributes, children) => {
  // These are all the different parts of the Tailwind css library. They're not
  // essential to the code but they make everything look pretty.
  const typography = 'text-white'
  const background = `bg-${colour}-600 hover:bg-${colour}-800`
  const borders = 'border-4 border-gray-900'
  const spacing = 'p-2 mr-4 my-2'
  const classes = combineTailwindCategories([
    typography, background, borders, spacing
  ])

  return E.button([...attributes, classes, A.id(id)], [
    ...children
  ])
}

const slider = (attrs) => {
  return E.div([A.className('flex')], [
    E.span([A.className('mr-4 my-2 p-2')], ['Frequency']),
    E.input([
      A.className('flex-1'),
      A.type('range'),
      ...attrs
    ])
  ])
}

const sequencerDisplay = (rows, highlightedColumn) => {
  // These are all the different parts of the Tailwind css library. They're not
  // essential to the code but they make everything look pretty.
  const layout = 'overflow-x-scroll'
  const borders = 'border-4 border-gray-900'
  const spacing = 'my-4'
  const sizing = 'w-auto'
  const classes = combineTailwindCategories([
    layout, borders, spacing, sizing
  ])

  return E.div([classes], [
    ...rows.map(sequencerRow(highlightedColumn))
  ])
}

const sequencerRow = (highlightedColumn) => ({ name, steps }) => {
  // These are all the different parts of the Tailwind css library. They're not
  // essential to the code but they make everything look pretty.
  const layout = 'flex'
  const flexbox = 'items-center'
  const classes = combineTailwindCategories([
    layout, flexbox
  ])

  return E.div([classes], [
    E.span([A.className('pl-2 pr-6 font-bold')], [name]),
    ...steps.map(sequencerStep(name, highlightedColumn))
  ])
}

const sequencerStep = (note, highlightedColumn) => (active, i) => {
  // These are all the different parts of the Tailwind css library. They're not
  // essential to the code but they make everything look pretty.
  const typography = 'text-white'
  const background = `bg-gray-${active ? '900' : '600'} hover:bg-gray-800`
  const borders = 'border-4 border-gray-900'
  const spacing = 'py-4 px-6'
  const classes = combineTailwindCategories([
    typography, background, borders, spacing
  ])

  return E.div([A.className(`p-2 bg-${highlightedColumn == i ? 'gray-300' : 'transparent'}`)], [
    E.button([
      A.dataCustom('step', `${i}`),
      A.dataCustom('note', note),
      classes
    ])
  ])
}

// Complex components ----------------------------------------------------------


// Export ----------------------------------------------------------------------
export default ({ sequencer, synth }) => {
  // These are all the different parts of the Tailwind css library. They're not
  // essential to the code but they make everything look pretty.
  const layout = 'container'
  const typography = 'font-mono'
  const spacing = 'mx-auto py-6 px-4'
  const classes = combineTailwindCategories([
    layout, typography, spacing
  ])

  return E.main([classes], [
    // Title and info ----------------------------------------------------------
    E.section([], [
      E.h1([A.className('text-2xl font-bold')], ['Flow.js'])
    ]),
    // Sequencer controls ------------------------------------------------------
    E.section([], [
      button('play', 'gray', [], ['play']),
      button('stop', 'gray', [], ['stop']),
      button('add-step', 'gray', [], ['add step']),
      button('rmv-step', 'gray', [], ['remove step']),
      button('reset-steps', 'orange', [], ['reset steps']),
    ]),
    // Sequencer steps ---------------------------------------------------------
    E.section([], [
      `${sequencer.step}`,
      sequencerDisplay(sequencer.rows, sequencer.step),
    ]),
    // Synth controls ----------------------------------------------------------
    E.section([], [
      E.h2([A.className('text-lg font-bold')], ['Synth controls:']),
      button('mute-toggle', 'gray', [], [
        synth.masterGain == 1 ? 'mute' : 'unmute'
      ])
    ]),
    E.section([], [
      E.h2([A.className('text-lg font-bold')]['Filter']),
      slider([A.dataCustom('cutoff'), A.min(50), A.max(4000), A.value(synth.cutoff)]),
    ]),
    E.section([], [
      E.h2([A.className('text-lg font-bold')], ['Waveform:']),
      button('', 'blue', [A.dataCustom('waveform', 'sine')], ['sine']),
      button('', 'green', [A.dataCustom('waveform', 'triangle')], ['triangle']),
      button('', 'red', [A.dataCustom('waveform', 'sawtooth')], ['sawtooth']),
      button('', 'yellow', [A.dataCustom('waveform', 'square')], ['square']),
    ]),
    E.section([], [
      E.h2([A.className('text-lg font-bold')], ['Delay time:']),
      button('delay-short', 'purple', [A.dataCustom('delay', 'short')], ['short']),
      button('delay-long', 'purple', [A.dataCustom('delay', 'long')], ['long']),
    ])
  ])
}
