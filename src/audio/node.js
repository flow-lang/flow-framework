export const node = (type, properties = [], connections = []) => ({ type, properties, connections })
export const ref = key => ({ type: 'RefNode', key })

// export const analyser = (properties, connections) => node('AnalyserNode', properties, connections)
export const audioBufferSource = (properties, connections) => node('AudioBufferSourceNode', properties, connections)
export const audioDestination = () => node('AudioDestinationNode')
export const audioScheduledSource = (properties, connections) => node('AudioScheduledSourceNode', properties, connections)
export const biquadFilter = (properties, connections) => node('BiquadFilterNode', properties, connections)
export const channelMerger = (properties, connections) => node('ChannelMergerNode', properties, connections)
export const channelSplitter = (properties, connections) => node('ChannelSplitterNode', properties, connections)
export const constantSource = (properties, connections) => node('ConstantSourceNode', properties, connections)
export const convolver = (properties, connections) => node('ConvolverNode', properties, connections)
export const delay = (properties, connections) => node('DelayNode', properties, connections)
export const dynamicsCompressor = (properties, connections) => node('DynamicsCompressorNode', properties, connections)
export const gain = (properties, connections) => node('GainNode', properties, connections)
export const iirFilter = (properties, connections) => node('IIRFilterNode', properties, connections)
// export const mediaElementAudioSource = (properties, connections) => node('MediaElementAudioSourceNode', properties, connections)
// export const mediaStreamAudioDestination = (properties, connections) => node('MediaStreamAudioDestinationNode', properties, connections)
// export const mediaStreamAudioSource = (properties, connections) => node('MediaStreamAudioSourceNode', properties, connections)
export const oscillator = (properties, connections) => node('OscillatorNode', properties, connections)
export const panner = (properties, connections) => node('PannerNode', properties, connections)
export const stereoPanner = (properties, connections) => node('StereoPannerNode', properties, connections)
export const waveShaper = (properties, connections) => node('WaveShaperNode', properties, connections)

export const compressor = dynamicsCompressor
export const dac = audioDestination
export const filter = biquadFilter
export const num = constantSource
export const osc = oscillator

export default {
  // Core
  node,
  ref,
  // Web Audio nodes
  // analyser,
  audioBufferSource,
  audioDestination,
  audioScheduledSource,
  biquadFilter,
  channelMerger,
  channelSplitter,
  constantSource,
  convolver,
  delay,
  dynamicsCompressor,
  gain,
  iirFilter,
  // mediaElementAudioSource,
  // mediaStreamAudioDestination,
  // mediaStreamAudioSource,
  oscillator,
  panner,
  stereoPanner,
  waveShaper,
  // Aliases
  compressor,
  dac,
  filter,
  num,
  osc
}
