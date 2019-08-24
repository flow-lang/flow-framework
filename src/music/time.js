// Tempos ======================================================================
export const pretissimo = 200
export const presto = 168
export const vivace = 140
export const allegro = 120
export const allegroModera = 112
export const moderato = 108
export const andante = 78
export const adagietto = 70
export const adagio = 66
export const larghetto = 60
export const largo = 50
export const lento = 40
export const larghissimo = 20

// Time ratios =================================================================
export const Whole = 0.25
export const HalfDotted = 1 / 3
export const Half = 0.5
export const HalfTripplet = 0.75
export const QuarterDotted = 1 / 3 * 2
export const Quarter = 1
export const QuarterTripplet = 1.5
export const EighthDotted = 1 + 1 / 3
export const Eighth = 2
export const EighthTripplet = 3
export const SixteenthDotted = 2 + 1 / 3 * 2
export const Sixteenth = 4
export const SixteenthTripplet = 6
export const ThirtysecondDotted = 5 + 1 / 3
export const Thirtysecond = 8
export const ThirtysecondTripplet = 12

// Conversions =================================================================
export const ms = (bpm, time) => 1 / (bpm / 60 * time * 0.001)
export const sec = (bpm, time) => ms(bpm, time) / 1000

//
export default {
  // Tempos
  pretissimo,
  presto,
  vivace,
  allegro,
  allegroModera,
  moderato,
  andante,
  adagietto,
  adagio,
  larghetto,
  largo,
  lento,
  larghissimo,
  // Time ratios
  Whole,
  HalfDotted,
  Half,
  HalfTripplet,
  QuarterDotted,
  Quarter,
  QuarterTripplet,
  EighthDotted,
  Eighth,
  EighthTripplet,
  SixteenthDotted,
  Sixteenth,
  SixteenthTripplet,
  ThirtysecondDotted,
  Thirtysecond,
  ThirtysecondTripplet,
  // Conversions
  ms,
  sec
}
