# The Flow Framework
An Elm-inspired framework for Web Audio applications. Flow is positioned as an
alternative to frameworks like React, with a tight integration with the Web
Audio API.

## Motivation
A number of projects exist to provide complete frameworks for building Web Audio
applications such as BRAID, WAAX, and Flocking. All of these examples encourage
a tight coupling between the UI and the audio graph:

- BRAID relies on global variables and callbacks attached to UI elements to
directly manipulate audio nodes.
- WAAX uses Web Components to provide a `.connect` method for UI elements. These
elements can be connected directly to audio node parameters to control their 
value.
- Similarly, Flocking UI elements directly manipulate audio params.

While such an approach is acceptable for small applications. It becomes increasingly
difficult to manage application and audio graph state as an application grows. 
Relying on global variables as done in BRAID is simply not a scalalbe solution
for serious applications, and the tight coupling between UI and audio found in
WAAX and Flocking can make it difficult to determine how and when application
state is being changed.

Flow takes a different approach in line with more modern frontend frameworks. We
argue for strict separation of audio and view code, instead choosing to generate
both from a single, immutable model. This prevents one going out of sync with
the other while also ensuring that a refactor of the view won't impact how the 
app handles audio.

Flow also provides a declarative API for Web Audio development that is
signficantly clearer than the vanilla Web Audio API. Connections, for example,
are much more clearly expressed with Flow's audio library:

```javascript
// Flow
osc([], [
  gain([], [
    dac()
  ])
])

// Web Audio API
const osc = context.createOscillator()
const amp = context.createGain()

osc.connect(amp)
amp.connect(context.destination)
```

It is also much easier to define reusable _sub graphs_ such as combining the
above oscillator and gain node into a reusable synth node:

```javascript
// Flow
const synth = (freq, vol, connections) =>
  osc([ Prop.frequency(freq) ], [
    gain([ Prop.gain(vol) ], [
      ...connections
    ])
  ])

// Web Audio API
const synth = (freq, vol) => {
  const osc = context.createOscillator()
  const amp = context.createGain()

  osc.frequency.value = freq
  amp.gain.value = vol

  osc.connect(amp)

  return {
    connect (node) {
      amp.connect(node)
    }
  }
}
```

## Features

- [x] Declarative audio API
- [x] "Anonymous" audio nodes
- [x] Clear unidirectional dataflow thanks to the MVU architecture
- [x] Predictable model updates thanks to Actions and single update function
- [x] Managed side effects thanks to Effects
- [x] Plugin system allowing custom events
- [ ] TODO: Time travel debugger
- [ ] TODO: Plugin system allowing custom audio nodes and DOM elements

## Installation
First, install the library from npm:

```
npm i @flow-lang/framework
````

Then make sure your HTMl has an element for Flow to mount to:

```html
<body>
  <div id="app"></div>
  <script src="main.js"></script>
</body>
```

Finally, create a `main.js` to init your application:

```javascript
import { Program, DOM, Audio, Music } from '@flow-lang/framework'

...

const App = Program.instrument(init, update, audio, view listen)

App.use(DOM.Event)
App.use(Audio.Event)
App.start({
  root: document.querySelector('#app'),
  context: new AudioContext()
})
```

## Example
It's not uncommon for frameworks to have a simple counter application to
demonstrate how they work. Flow is no different, but this time it's a counter
with an audio twist!

First, import everything we need from Flow

```javascript
import { Program, DOM, Audio, Music } from '@flow-lang/framework'
```

The init function is called once when we call `App.start` and is used to generate
the initial model for our application. For our counter app we need to keep track
of the current count, and we're also going to define some notes of a chord to
trigger.

The `Music.Note` library contains some handy utilities for converting to and from
different formats. Here we're converting note names to frequency values.

```javascript
function init () {
  const voices = [ 'C3', 'E3', 'G3', 'B3', 'D4', 'G4', 'B4' ]

  return {
    count: 0,
    voices: voices.map(Music.Note.ntof)
  }
}
```

Update is called by the runtime whenever a new model needs to be created. Here,
we switch on our two actions (Increment and Decrement) to increase or decrease
the counter.

Because we're also going to use the count to trigger notes in a
chord we need to make sure the counter doesn't dip below 0 or increase above the
number of notes we have defined.

```javascript
const Increment = 0
const Decrement = 1

function update ({ action }, model) {
  switch (action) {
    case Increment:
      if (model.count < model.voices.length) {
        return { ...model, count: model.count + 1 }
      } else {
        return { ...model }
      }

    case Decrement:
      if (model.count > 0) {
        return { ...model, count: model.count - 1 }
      } else {
        return { ...model }
      }
  }
}
```

We've declared our two actions as constants in a sort of enum but this isn't
necessary. You may wish to use strings instead of numbers (perhaps for better
debugging) or not to use constants at all.

The audio function is called every time the model updates. Here, we map over
the voices array and map each note into an oscillator. By comparing the current
index to the model's count we can conditionally turn off some voices by setting
the gain to 0.

```javascript
function audio ({ count, voices ) {
  return voices.map((note, i) => 
    Audio.Node.oscillator([ Audio.Property.frequency(note) ], [
      Audio.Node.gain([ Audio.Property.gain(i < count ? 0.1 : 0) ], [
        Audio.Node.dac()
      ])
    ])  
  )
}
```

As with the audio function, the view function is also called whenever the model
changes. 

```javascript
function view ({ count, voices }) {
  return DOM.Element.div([], [
    DOM.Element.button([ DOM.Attribute.id('incr') ], [ '+' ]),
    DOM.Element.div([], [ count.toString() ]),
    DOM.Element.button([ DOM.Attribute.id('decr') ], [ '-' ])
  ])
}
```

Instead of attaching event listeners to DOM nodes directly, the listen function
serves as the single place to define all event listeners. Here we attach click
event listeners to the two buttons and return an appropriate action.

```javascript
function listen (model) {
  return [
    DOM.Event.click('#incr', e => ({ action: Increment })),
    DOM.Event.click('#decr', e => ({ action: Decrement })),
  ]
}
```

With everything defined we can create a new application. The `instrument` program
is a complete Flow application with an audio, view, and listen function. 

The Flow runtime needs to know how to setup and handle different types of events,
so we tell our application to use the DOM.Event plugin.

Finally we start the application, supplying a DOM node to inject our view into
and an audio context used to create our audio nodes.

```javascript
const App = Program.instrument(init, update, audio, view, listen)

App.use(DOM.Event)
App.start({
  root: document.querySelector('#app'),
  context: new AudioContext()
})
```

## Contributing