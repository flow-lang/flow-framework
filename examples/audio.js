import { Node as N, Keyed as K, Property as P } from '../src/audio'

const voice = (step, { type }) => ({ note, steps }) => {
  const amp = steps[step] ? 0.2 : 0

  return N.oscillator([P.frequency(note), P.type(type)], [
    N.gain([P.gain(amp)], [
      N.ref('delay'),
      N.ref('master'),
    ]),
  ])
}

export default ({ sequencer, synth }) => {
  const voices = sequencer.rows.map(voice(sequencer.step, synth))

  return [
    ...voices,
    K.delay('delay', [P.delayTime(synth.delayTime)], [
      N.gain([P.gain(synth.delayAmount)], [
        N.biquadFilter([P.type('lowpass'), P.frequency(400)], [
          N.ref('delay'),
          N.ref('master')
        ])
      ])
    ]),
    K.gain('master', [P.gain(synth.masterGain)], [
      N.biquadFilter([P.type('lowpass'), P.frequency(synth.cutoff)], [
        N.dac()
      ])
    ])
  ]
}