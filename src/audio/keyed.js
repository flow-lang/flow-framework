import { node } from './node'

export const keyed = (key, type, properties = [], connections = []) => ({ key, ...node(type, properties, connections) })
export const key = (key, node) => ({ key, ...node })

export const analyser = (key, properties, connections) => keyed(key, 'AnalyserNode', properties, connections)
export const audioBufferSource = (key, properties, connections) => keyed(key, 'AudioBufferSourceNode', properties, connections)
export const audioScheduledSource = (key, properties, connections) => keyed(key, 'AudioScheduledSourceNode', properties, connections)
export const biquadFilter = (key, properties, connections) => keyed(key, 'BiquadFilterNode', properties, connections)
export const channelMerger = (key, properties, connections) => keyed(key, 'ChannelMergerNode', properties, connections)
export const channelSplitter = (key, properties, connections) => keyed(key, 'ChannelSplitterNode', properties, connections)
export const constantSource = (key, properties, connections) => keyed(key, 'ConstantSourceNode', properties, connections)
export const convolver = (key, properties, connections) => keyed(key, 'ConvolverNode', properties, connections)
export const delay = (key, properties, connections) => keyed(key, 'DelayNode', properties, connections)
export const dynamicsCompressor = (key, properties, connections) => keyed(key, 'DynamicsCompressorNode', properties, connections)
export const gain = (key, properties, connections) => keyed(key, 'GainNode', properties, connections)
export const iirFilter = (key, properties, connections) => keyed(key, 'IIRFilterNode', properties, connections)
export const mediaElementAudioSource = (key, properties, connections) => keyed(key, 'MediaElementAudioSourceNode', properties, connections)
export const mediaStreamAudioDestination = (key, properties, connections) => keyed(key, 'MediaStreamAudioDestinationNode', properties, connections)
export const mediaStreamAudioSource = (key, properties, connections) => keyed(key, 'MediaStreamAudioSourceNode', properties, connections)
export const oscillator = (key, properties, connections) => keyed(key, 'OscillatorNode', properties, connections)
export const panner = (key, properties, connections) => keyed(key, 'PannerNode', properties, connections)
export const stereoPanner = (key, properties, connections) => keyed(key, 'StereoPannerNode', properties, connections)
export const waveShaper = (key, properties, connections) => keyed(key, 'WaveShaperNode', properties, connections)

export const compressor = dynamicsCompressor
export const filter = biquadFilter
export const num = constantSource
export const osc = oscillator

export default {
  // Core
  keyed,
  key,
  // Keyed Web Audio nodes
  analyser,
  audioBufferSource,
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
  mediaElementAudioSource,
  mediaStreamAudioDestination,
  mediaStreamAudioSource,
  oscillator,
  panner,
  stereoPanner,
  waveShaper,
  // Aliases
  compressor,
  filter,
  num,
  osc
}
