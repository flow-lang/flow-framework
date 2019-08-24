export const property = (type, label, value) => ({ type, label, value })
export const scheduledProperty = (method, prop, time) => property('ScheduledAudioParam', prop.label, { method, target: prop.value, time })

export const setValueAtTime = (property, time) => scheduledProperty('setValueAtTime', property, time)
export const linearRampToValueAtTime = (property, time) => scheduledProperty('linearRampToValueAtTime', property, time)
export const exponentialRampToValueAtTime = (property, time) => scheduledProperty('exponentialRampToValueAtTime', property, time)

export const setValuesAtTime = (property, valuesAndTimes) => valuesAndTimes.map(([ value, time ]) => setValueAtTime(property(value), time))
export const linearRampToValuesAtTime = (property, valuesAndTimes) => valuesAndTimes.map(([ value, time ]) => linearRampToValueAtTime(property(value), time))
export const exponentialRampToValuesAtTime = (property, valuesAndTimes) => valuesAndTimes.map(([ value, time ]) => exponentialRampToValueAtTime(property(value), time))

export const attack = value => property('AudioParam', 'attack', value)
export const coneInnerAngle = value => property('NodeProperty', 'coneInnerAngle', value)
export const coneOuterAngle = value => property('NodeProperty', 'coneOuterAngle', value)
export const coneOuterGain = value => property('NodeProperty', 'coneOuterGain', value)
export const curve = value => property('NodeProperty', 'curve', value)
export const delayTime = value => property('AudioParam', 'delayTime', value)
export const detune = value => property('AudioParam', 'detune', value)
export const distanceModel = value => property('NodeProperty', 'distanceModel', value)
export const feedback = value => property('ConstructorProperty', 'feedback', value)
export const feedforward = value => property('ConstructorProperty', 'feedforward', value)
export const fftSize = value => property('NodeProperty', 'fftSize', value)
export const frequency = value => property('AudioParam', 'frequency', value)
export const frequencyBinCount = value => property('NodeProperty', 'frequencyBinCount', value)
export const gain = value => property('AudioParam', 'gain', value)
export const gainAmount = gain
export const knee = value => property('AudioParam', 'knee', value)
export const loop = value => property('NodeProperty', 'loop', value)
export const loopEnd = value => property('NodeProperty', 'loopEnd', value)
export const loopStart = value => property('NodeProperty', 'loopStart', value)
export const maxChannelCount = value => property('NodeProperty', 'maxChannelCount', value)
export const maxDecibels = value => property('NodeProperty', 'maxDecibels', value)
export const maxDelayTime = value => property('ConstructorProperty', 'maxDelayTime', value)
export const maxDistance = value => property('NodeProperty', 'maxDistance', value)
export const mediaElement = value => property('ConstructorProperty', 'mediaElement', value)
export const mediaStream = value => property('ConstructorProperty', 'mediaStream', value)
export const minDecibels = value => property('NodeProperty', 'minDecibels', value)
export const normalize = value => property('NodeProperty', 'normalize', value)
export const offset = value => property('AudioParam', 'offset', value)
export const orientationX = value => property('AudioParam', 'orientationX', value)
export const orientationY = value => property('AudioParam', 'orientationY', value)
export const orientationZ = value => property('AudioParam', 'orientationZ', value)
export const oversample = value => property('NodeProperty', 'oversample', value)
export const pan = value => property('AudioParam', 'pan', value)
export const panningModel = value => property('NodeProperty', 'panningModel', value)
export const playbackRate = value => property('AudioParam', 'playbackRate', value)
export const positionX = value => property('AudioParam', 'positionX', value)
export const positionY = value => property('AudioParam', 'positionY', value)
export const positionZ = value => property('AudioParam', 'positionZ', value)
export const q = value => property('AudioParam', 'Q', value)
export const ratio = value => property('AudioParam', 'ratio', value)
export const reduction = value => property('AudioParam', 'reduction', value)
export const refDistance = value => property('NodeProperty', 'refDistance', value)
export const release = value => property('AudioParam', 'release', value)
export const rolloffFactor = value => property('NodeProperty', 'rolloffFactor', value)
export const smoothingTimeConstant = value => property('NodeProperty', 'smoothingTimeConstant', value)
export const stream = value => property('MediaStream', 'stream', value)
export const threshold = value => property('AudioParam', 'threshold', value)
export const type = value => property('NodeProperty', 'type', value)

export default {
  // Core
  property,
  scheduledProperty,
  // Scheduled properties
  setValueAtTime,
  linearRampToValueAtTime,
  exponentialRampToValueAtTime,
  setValuesAtTime,
  linearRampToValuesAtTime,
  exponentialRampToValuesAtTime,
  // Web Audio properties
  attack,
  coneInnerAngle,
  coneOuterAngle,
  coneOuterGain,
  curve,
  delayTime,
  detune,
  distanceModel,
  feedback,
  feedforward,
  fftSize,
  frequency,
  frequencyBinCount,
  gain,
  gainAmount,
  knee,
  loop,
  loopEnd,
  loopStart,
  maxChannelCount,
  maxDecibels,
  maxDelayTime,
  maxDistance,
  mediaElement,
  mediaStream,
  minDecibels,
  normalize,
  offset,
  orientationX,
  orientationY,
  orientationZ,
  oversample,
  pan,
  panningModel,
  playbackRate,
  positionX,
  positionY,
  positionZ,
  q,
  ratio,
  reduction,
  refDistance,
  release,
  rolloffFactor,
  smoothingTimeConstant,
  stream,
  threshold,
  type
}
