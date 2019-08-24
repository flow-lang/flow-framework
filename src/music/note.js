import Notes from './notes.json'

// MIDI note conversions =======================================================
export const mton = note => Object.keys(Notes).find(name => Notes[name] === note)
export const mtof = note => 440 * Math.pow(2, (note - 69) / 12)

// Note name conversions =======================================================
export const ntom = note => note.length === 3
  ? Notes[note[0].toUpperCase() + note[1].toLowerCase() + note[2]]
  : Notes[note[0].toUpperCase() + note[1]]
export const ntof = note => mtof(ntom(note))

// Frequency conversions =======================================================
export const ftom = note => 12 * Math.log2(note / 440) + 69
export const fton = note => mton(ftom(note))

//
export default {
  // MIDI note names and numbers
  Notes,
  // MIDI note conversions
  mton,
  mtof,
  // Note name conversions
  ntom,
  ntof,
  // Frequency conversions
  ftom,
  fton
}
