import { Node as N, Keyed as K, Property as P } from '../../dist/audio'

const voice = (currentTime, step, { attack, decay, type }) => ({ note, steps }) => {
  const amp = steps[step] ? 0.2 : 0
  const atk = P.linearRampToValueAtTime(P.gain(amp), currentTime + attack)
  const dcy = P.linearRampToValueAtTime(P.gain(0), currentTime + attack + decay)
  
  return N.oscillator([ P.frequency(note), P.type(type) ], [
    N.gain([ atk, dcy ], [
      N.ref('delay'),
      N.ref('master'),
    ]),
  ])
}

export default ({ currentTime, sequencer, synth }) => {
  return sequencer.rows.map(voice(currentTime, sequencer.step, synth)).concat([
    K.delay('delay', [ P.delayTime(synth.delayTime) ], [
      N.gain([ P.gain(synth.delayAmount) ], [
        N.biquadFilter([ P.type('lowpass'), P.frequency(400) ], [
          N.ref('delay'),
          N.ref('master')
        ])
      ])
    ]),
    K.gain('master', [ P.gain(synth.masterGain) ], [
      N.dac()
    ])
  ])
}