//
import instrument from './program/instrument'
//
export { default as Effect } from './effect'
export { default as Action } from './action'
//
import Node from './audio/node'
import Property from './audio/property'
import Keyed from './audio/keyed'
import AudioEvent from './audio/event'
//
import Note from './music/note'
import Time from './music/time'
//
import Element from './dom/element'
import Attribute from './dom/attribute'
import DOMEvent from './dom/event'

export const Program = { instrument }
export const Audio = { Node, Property, Keyed, Event: AudioEvent }
export const DOM = { Element, Attribute, Event: DOMEvent }
export const Music = { Note, Time }

export default {
  Program,
  Effect,
  Action,
  Audio,
  DOM,
  Music
}
