export const event = (selector, eventName, handler, opts = {}) => ({
  __eventType: 'DOM', selector, eventName, handler, opts
})

// MOST COMMON EVENTS -------------------------------------------------------
// Focus events
export const focus = (selector, handler, opts) => event(selector, 'focus', handler, opts)
export const blur = (selector, handler, opts) => event(selector, 'blur', handler, opts)

// Form events
export const reset = (selector, handler, opts) => event(selector, 'reset', handler, opts)
export const submit = (selector, handler, opts) => event(selector, 'submit', handler, opts)

// View events
export const fullscreenchange = (selector, handler, opts) => event(selector, 'fullscreenchange', handler, opts)
export const fullscreenerror = (selector, handler, opts) => event(selector, 'fullscreenerror', handler, opts)
export const resize = (selector, handler, opts) => event(selector, 'resize', handler, opts)
export const scroll = (selector, handler, opts) => event(selector, 'scroll', handler, opts)

// Clipboard events
export const cut = (selector, handler, opts) => event(selector, 'cut', handler, opts)
export const copy = (selector, handler, opts) => event(selector, 'copy', handler, opts)
export const paste = (selector, handler, opts) => event(selector, 'paste', handler, opts)

// Keyboard events
export const keydown = (selector, handler, opts) => event(selector, 'keydown', handler, opts)
export const keypress = (selector, handler, opts) => event(selector, 'keypress', handler, opts)
export const keyup = (selector, handler, opts) => event(selector, 'keyup', handler, opts)

// Mouse events
export const auxclick = (selector, handler, opts) => event(selector, 'auxclick', handler, opts)
export const click = (selector, handler, opts) => event(selector, 'click', handler, opts)
export const contextmenu = (selector, handler, opts) => event(selector, 'contextmenu', handler, opts)
export const dblclick = (selector, handler, opts) => event(selector, 'dblclick', handler, opts)
export const mousedown = (selector, handler, opts) => event(selector, 'mousedown', handler, opts)
export const mouseenter = (selector, handler, opts) => event(selector, 'mouseenter', handler, opts)
export const mouseleave = (selector, handler, opts) => event(selector, 'mouseleave', handler, opts)
export const mousemove = (selector, handler, opts) => event(selector, 'mousemove', handler, opts)

export const mouseover = (selector, handler, opts) => event(selector, 'mouseover', handler, opts)
export const mouseout = (selector, handler, opts) => event(selector, 'mouseout', handler, opts)
export const mouseup = (selector, handler, opts) => event(selector, 'mouseup', handler, opts)
export const pointerlockchange = (selector, handler, opts) => event(selector, 'pointerlockchange', handler, opts)
export const pointerlockerror = (selector, handler, opts) => event(selector, 'pointerlockerror', handler, opts)
export const select = (selector, handler, opts) => event(selector, 'select', handler, opts)
export const wheel = (selector, handler, opts) => event(selector, 'wheel', handler, opts)

// Drag & Drop events
export const drag = (selector, handler, opts) => event(selector, 'drag', handler, opts)
export const dragend = (selector, handler, opts) => event(selector, 'dragend', handler, opts)
export const dragenter = (selector, handler, opts) => event(selector, 'dragenter', handler, opts)
export const dragstart = (selector, handler, opts) => event(selector, 'dragstart', handler, opts)
export const dragleave = (selector, handler, opts) => event(selector, 'dragleave', handler, opts)
export const dragover = (selector, handler, opts) => event(selector, 'dragover', handler, opts)
export const drop = (selector, handler, opts) => event(selector, 'drop', handler, opts)

// Value change events
export const broadcast = (selector, handler, opts) => event(selector, 'broadcast', handler, opts)
export const CheckboxStateChange = (selector, handler, opts) => event(selector, 'CheckboxStateChange', handler, opts)
export const hashchange = (selector, handler, opts) => event(selector, 'hashchange', handler, opts)
export const input = (selector, handler, opts) => event(selector, 'input', handler, opts)
export const RadioStateChange = (selector, handler, opts) => event(selector, 'RadioStateChange', handler, opts)
export const readystatechange = (selector, handler, opts) => event(selector, 'readystatechange', handler, opts)
export const ValueChange = (selector, handler, opts) => event(selector, 'ValueChange', handler, opts)

// LESS COMMON EVENTS -------------------------------------------------------
// Sensor events
export const compassneedscalibration = (selector, handler, opts) => event(selector, 'compassneedscalibration', handler, opts)
export const devicelight = (selector, handler, opts) => event(selector, 'devicelight', handler, opts)
export const devicemotion = (selector, handler, opts) => event(selector, 'devicemotion', handler, opts)
export const deviceorientation = (selector, handler, opts) => event(selector, 'deviceorientation', handler, opts)
export const deviceproximity = (selector, handler, opts) => event(selector, 'deviceproximity', handler, opts)
export const orientationchange = (selector, handler, opts) => event(selector, 'orientationchange', handler, opts)
export const userproximity = (selector, handler, opts) => event(selector, 'userproximity', handler, opts)

// Touch events
export const touchcancel = (selector, handler, opts) => event(selector, 'touchcancel', handler, opts)
export const touchend = (selector, handler, opts) => event(selector, 'touchend', handler, opts)
export const touchenter = (selector, handler, opts) => event(selector, 'touchenter', handler, opts)
export const touchleave = (selector, handler, opts) => event(selector, 'touchleave', handler, opts)
export const touchmove = (selector, handler, opts) => event(selector, 'touchmove', handler, opts)
export const touchstart = (selector, handler, opts) => event(selector, 'touchstart', handler, opts)

// Pointer events
export const pointerover = (selector, handler, opts) => event(selector, 'pointerover', handler, opts)
export const pointerenter = (selector, handler, opts) => event(selector, 'pointerenter', handler, opts)
export const pointerdown = (selector, handler, opts) => event(selector, 'pointerdown', handler, opts)
export const pointermove = (selector, handler, opts) => event(selector, 'pointermove', handler, opts)
export const pointerup = (selector, handler, opts) => event(selector, 'pointerup', handler, opts)
export const pointercancel = (selector, handler, opts) => event(selector, 'pointercancel', handler, opts)
export const pointerout = (selector, handler, opts) => event(selector, 'pointerout', handler, opts)
export const pointerleave = (selector, handler, opts) => event(selector, 'pointerleave', handler, opts)
export const gotpointercapture = (selector, handler, opts) => event(selector, 'gotpointercapture', handler, opts)
export const lostpointercapture = (selector, handler, opts) => event(selector, 'lostpointercapture', handler, opts)

//
export default {
  // Core ======================================================================
  event,
  // Focus events
  focus,
  blur,
  // Form events
  reset,
  submit,
  // View events
  fullscreenchange,
  fullscreenerror,
  resize,
  scroll,
  // Clipboard events
  cut,
  copy,
  paste,
  // Keyboard events
  keydown,
  keypress,
  keyup,
  // Mouse events
  auxclick,
  click,
  contextmenu,
  dblclick,
  mousedown,
  mouseenter,
  mouseleave,
  mousemove,
  mouseover,
  mouseout,
  mouseup,
  pointerlockchange,
  pointerlockerror,
  select,
  wheel,
  // Drag & Drop events
  drag,
  dragend,
  dragenter,
  dragstart,
  dragleave,
  dragover,
  drop,
  // Value change events
  broadcast,
  CheckboxStateChange,
  hashchange,
  input,
  RadioStateChange,
  readystatechange,
  ValueChange,
  // Sensor events
  compassneedscalibration,
  devicelight,
  devicemotion,
  deviceorientation,
  deviceproximity,
  orientationchange,
  userproximity,
  // Touch events
  touchcancel,
  touchend,
  touchenter,
  touchleave,
  touchmove,
  touchstart,
  // Pointer events
  pointerover,
  pointerenter,
  pointerdown,
  pointermove,
  pointerup,
  pointercancel,
  pointerout,
  pointerleave,
  gotpointercapture,
  lostpointercapture,
  // Plugin data ===============================================================
  // The runtime needs to know what type of plugin to install
  __pluginType: 'event',
  // In the future, __pluginName will be used to stop duplicate plugins being
  // registered.
  __pluginName: 'Html.Event',
  // The event type should match the __eventType of any event objects you want
  // this plugin to handle.
  __eventType: 'DOM',
  // Install is called after a program has been started. It is always passed an
  // object with $context, $root, and $dispatch but a plugin may choose to ignore
  // any or all of these fields.
  __install ({ $dispatch }) {
    this.$dispatch = $dispatch

    events.forEach(event => {
      this.$events[event] = []
      this.$handlers[event] = e => {
        this.$events[event].forEach(({ selector, handler }) => {
          if (this.$isGlobal(selector) || e.target.matches(selector)) {
            handler(e)
          }
        })
      }

      window.addEventListener(event, this.$handlers[event])
    })
  },
  // Update is called every time the model is updated, and it receives a filtered
  // list of all the new event listeners. The list is filtered based on the
  // __eventType defined above.
  __update (newEvents) {
    newEvents = newEvents.map(event => {
      const handler = e => this.$dispatch(event.handler(e))
      const selector = event.opts.specific || this.$isGlobal(event.selector)
        ? event.selector
        : `${event.selector}, ${event.selector} > *`

      return { ...event, handler, selector }
    })

    for (const event in this.$events) {
      this.$events[event] = newEvents.filter(({ eventName }) =>
        eventName === event
      )
    }
  },
  // Uninstall is called if a Program's destroy method is invoked. This should
  // clean up any event listeners so they're not left firing once the program
  // has been closed.
  __uninstall () {
    events.forEach(event => {
      window.removeEventListener(event, this.$handlers[event])
    })
  },
  //
  $dispatch: null,
  $events: {},
  $handlers: {},
  $isGlobal (selector) {
    return selector === 'document' || selector === 'window'
  }
}

const events = [
  // Focus events
  'focus', 'blur',
  // Form events
  'reset', 'submit',
  // View events
  'fullscreenchange', 'fullscreenerror', 'resize', 'scroll',
  // Clipboard events
  'cut', 'copy', 'paste',
  // Keyboard events
  'keydown', 'keypress', 'keyup',
  // Mouse events
  'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter',
  'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange',
  'pointerlockerror', 'select', 'wheel',
  // Drag & Drop events
  'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
  // Value change events
  'broadcast', 'CheckboxStateChange', 'hashchange', 'input', 'RadioStateChange',
  'readystatechange', 'ValueChange',
  // Sensor events
  'compassneedscalibration', 'devicelight', 'devicemotion', 'deviceorientation',
  'deviceproximity', 'orientationchange', 'userproximity',
  // Touch events
  'touchcancel', 'touchend', 'touchenter', 'touchleave', 'touchmove', 'touchstart',
  // Pointer events
  'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup',
  'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture',
  'lostpointercapture'
]
