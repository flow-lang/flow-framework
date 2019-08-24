/* global WebSocket */
export const event = (handler, eventName) => ({ __eventType: 'ws', eventName, handler })

export const onopen = handler => event(handler, 'open')
export const onerror = handler => event(handler, 'error')
export const onmessage = handler => event(handler, 'message')
export const onclose = handler => event(handler, 'close')

export const effect = handler => ({ __effectType: 'ws', run: handler })

export default ({ url, protocols = [] }) => {
  return {
    event,
    onopen,
    onerror,
    onmessage,
    onclose,
    send (data) {
      return effect(() => this.$ws.send(data))
    },
    close () {
      return effect(() => this.$ws.close())
    },
    // Plugin data ===============================================================
    // The runtime needs to know what type of plugin to install
    __pluginType: 'event',
    // In the future, __pluginName will be used to stop duplicate plugins being
    // registered.
    __pluginName: 'WebSocket',
    // The event type should match the __eventType of any event objects you want
    // this plugin to handle.
    __eventType: 'ws',
    // Install is called after a program has been started. It is always passed an
    // object with $context, $root, and $dispatch but a plugin may choose to ignore
    // any or all of these fields.
    __install ({ $dispatch }) {
      this.$ws = new WebSocket(url, protocols)
      this.$dispatch = $dispatch

      Object.keys(this.$events).forEach(event => {
        this.$ws.addEventListener(event, e => {
          this.$events[event].forEach(({ handler }) => {
            handler(e)
          })
        })
      })
    },
    // Update is called every time the model is updated, and it receives a filtered
    // list of all the new event listeners. The list is filtered based on the
    // __eventType defined above.
    __update (newEvents) {
      newEvents = newEvents.map(event => ({
        ...event,
        handler: e => this.$dispatch(event.handler(e))
      }))

      for (const event in this.$events) {
        this.$events[event] = newEvents.filter(({ eventName }) =>
          eventName === event
        )
      }
    },
    //
    $dispatch: null,
    $ws: null,
    $events: {
      open: [],
      error: [],
      message: [],
      close: []
    }
  }
}
