export const event = (type, id, time, handler) => ({ __eventType: 'audio', type, id, time, handler })

export const every = (id, time, handler) => event('repeat', id, time, handler)
export const at = (id, time, handler) => event('once', id, time, handler)

export default {
  // Core ======================================================================
  every,
  at,
  // Plugin data ===============================================================
  // The runtime needs to know what type of plugin to install
  __pluginType: 'event',
  // In the future, __pluginName will be used to stop duplicate plugins being
  // registered.
  __pluginName: 'Audio.Event',
  // The event type should match the __eventType of any event objects you want
  // this plugin to handle.
  __eventType: 'audio',
  // Install is called after a program has been started. It is always passed an
  // object with $context, $root, and $dispatch but a plugin may choose to ignore
  // any or all of these fields.
  __install ({ $context, $dispatch }) {
    this.$context = $context
    this.$dispatch = $dispatch
  },
  // Update is called every time the model is updated, and it receives a filtered
  // list of all the new event listeners. The list is filtered based on the
  // __eventType defined above.
  __update (newEvents) {
    const oldEvents = Object.keys(this.$events)

    for (let i = 0; i < Math.max(oldEvents.length, newEvents.length); i++) {
      const newEvent = newEvents[i]
      const oldEvent = oldEvents[i]

      if (newEvent) {
        if (this.$events[newEvent.id]) {
          this.$events[newEvent.id].update(newEvent)
        } else {
          this.$events[newEvent.id] = new Event(newEvent, this.$dispatch, this.$context)
        }
      } else {
        this.$events[oldEvent].stop()

        delete this.$events[oldEvent]
      }
    }
  },
  //
  $context: null,
  $dispatch: null,
  $events: {}
}

//
class Event {
  constructor ({ type, time, handler }, $dispatch, $context) {
    this.type = type
    this.time = time
    this.handler = handler

    this.interval = 25 // ms
    this.lookahead = 0.1 // seconds

    this.start($dispatch, $context)
  }

  start ($dispatch, $context) {
    this.targetTime = $context.currentTime + this.time

    if (this.type === 'repeat') $dispatch(this.handler($context.currentTime))

    this.timerID = setInterval(() => {
      const currentTime = $context.currentTime

      if (currentTime >= this.targetTime - this.lookahead) {
        const diff = this.targetTime - currentTime

        $dispatch(this.handler(currentTime + diff))

        switch (this.type) {
          case 'repeat':
            this.targetTime = currentTime + diff + this.time
            break
          case 'once':
            this.stop()
        }
      }
    }, 25)
  }

  update ({ time, handler }) {
    if (time) this.time = time
    if (handler) this.handler = handler
  }

  stop () {
    clearInterval(this.timerID)
  }
}
