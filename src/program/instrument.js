import VirtualAudioGraph from '../runtime/virtual-audio'
import VirtualDOM from '../runtime/virtual-dom'

import * as Debugger from '../runtime/debugger'
import * as Time from '../music/time'
import * as Utils from '../utils'

export default function instrument(init, update, audio, view, listen) {
  // Debug mode prints a load of information to the console at every step of
  // the programs lifecycle. Generally not recommended as this is going to
  // really hurt performance. Useful to see which part of your program is a
  // bottleneck though.
  let DEBUG_MODE = false

  // Plugins can be registered to include new audio nodes, HTML components or
  // different event listeners, so let's keep track of all the plugins a dev
  // has added.
  let $plugins = {
    audio: [],
    html: [],
    event: []
  }

  let $context // An instance of an AudioContext
  let $root // The root DOM node to attach our view to

  let $model // To complete state of our program
  let $debugger

  let $audio // The VirtualAudioGraph
  let $view // The VirtualDOM

  // $dispatch is how side side effects,  events, and calls to send() can update
  // the model.
  const $dispatch = action => Utils.defer(() => {
    if (!action) return
    if ($context.state == 'suspended') $context.resume()
    action.now = Time.from($context.currentTime)

    if (DEBUG_MODE && action.action?.startsWith('__')) {
      const [debuggerModel, effect, shouldUpdate] = Debugger.update(action, $debugger)
      $debugger = debuggerModel

      if ($debugger.running) {
        const [appAction, model] = $debugger.history[$debugger.pointer]
        const calculateRelativeTiming = v => {
          if (typeof v === 'object' && v.type === 'Time') {
            return { ...v, __debug_value: $context.currentTime + (v.value - appAction.now.value) }
          }

          if (Array.isArray(v)) {
            return v
          }

          if (typeof v === 'object') {
            return Utils.mapObject(v, calculateRelativeTiming)
          }

          return v
        }
        const appModel = Utils.mapObject(model, calculateRelativeTiming)

        $update([appModel])

      } else if (shouldUpdate) {
        $update([$model])
      }

      effect && effect($dispatch, $debugger)
    } else if (!DEBUG_MODE || !$debugger.running) {
      const [model, effect = undefined] = update(action, $model) || []

      if (DEBUG_MODE) {
        const result = Debugger.update(
          Debugger.PushAction(action, model),
          $debugger
        )

        $debugger = result[0]
      }

      $update([model, effect])
    }
  })

  // The internal update function. This takes the result of the users __update
  // function and takes care of turning that new model into a new audio graph,
  // dom, and event listeners. This is also where Effects get called.
  const $update = ([model, effect = undefined]) => {
    /* DEBUG STATEMENT */ if (DEBUG_MODE) console.time('Total update time')
    /* DEBUG STATEMENT */ if (DEBUG_MODE) console.group('$update')

    // If the model supplied is invalid, show a warning in the console to let
    // the developer know. We don't do a simple falsey check (!model) because
    // its reasnoable for a simple model to be an empty string or 0.
    if (typeof model === 'undefined' || model === null) {
      console.warn('Your update function returned undefined or null, ' +
        'the model will remain unchainged. ' +
        'Did you forget to handle all of your Actions?'
      )

    } else {
      $model = model

      // Audio -----------------------------------------------------------------
      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.time('$audio')
      const graph = audio($model)

      $audio.update(graph)
      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.timeEnd('$audio')
      // DOM -------------------------------------------------------------------
      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.time('$view')
      const dom = view($model)

      $view.update(
        DEBUG_MODE
          ? (dom.children.push(Debugger.view($debugger)), dom)
          : dom
      )
      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.timeEnd('$view')
      // Events ----------------------------------------------------------------
      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.time('$events')
      const events = DEBUG_MODE
        ? [...listen($model), ...Debugger.listen($debugger)]
        : listen($model)

      // Each plugin creates events with its own __eventType property. So for each
      // plugin, filter the events list and only pass in the ones that plugin was
      // designed to handle.
      $plugins.event.forEach(plugin => {
        plugin.__update(
          events.filter(event =>
            event.__eventType === plugin.__eventType
          )
        )
      })
      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.timeEnd('$events')
    }

    // Effects are functions that can have side effects, or do stateful things.
    // to return an action back to the runtime they receive the $dispatch function.
    if (effect) {
      if (typeof effect === 'object') {
        effect.run($dispatch, $model)
      } else {
        effect($dispatch, $model)
      }
    }

    /* DEBUG STATEMENT */ if (DEBUG_MODE) console.groupEnd('$update')
    /* DEBUG STATEMENT */ if (DEBUG_MODE) console.timeEnd('Total update time')
  }

  const __registerPlugin = plugin => {
    switch (plugin.__pluginType) {
      case 'audio':
        break
      case 'html':
        break
      case 'event':
        $plugins.event.push(plugin)
        break
    }
  }

  return {
    // Before a Program has been started, plugins can be registered to expand
    // its functionality. They get installed when the start method is called
    // so new plugins can't be registered after that.
    use(plugin) {
      console.log(`Registering ${plugin.__pluginName} plugin.`)
      __registerPlugin(plugin)
    },

    // Creating a new Program isn't enough, it must be started before anything can
    // happen. Calling start will setup the virtual audio graph and virtual DOM with
    // their context and root node respectively. It'll also install any plugins that
    // were registered prior to calling start, before finally creating the first model
    // and performing the first render.
    start({ context, root, flags }) {
      DEBUG_MODE = flags && flags.debug || DEBUG_MODE

      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.log('Starting Program...')
      $context = context
      $root = root

      $audio = new VirtualAudioGraph($context)
      $view = new VirtualDOM($root)

      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.log('Installing plugins...')
      for (const pluginType in $plugins) {
        $plugins[pluginType].forEach(plugin => {
          /* DEBUG STATEMENT */ if (DEBUG_MODE) console.log(`Installing ${plugin.__pluginName} plugin.`)
          plugin.__install({ $context, $root, $dispatch })
        })
      }

      /* DEBUG STATEMENT */ if (DEBUG_MODE) console.log('Running initial update...')
      const initialModel = init(flags, Time.from($context.currentTime), $root)

      $debugger = Debugger.init($context.currentTime, initialModel)
      $update([initialModel])
    },

    // Use this to send an Action to the runtime from some external javascript.
    send(action) {
      $dispatch(action)
    },

    // This should go at least some of the way towards tearing down a currently
    // running Flow application. In normal circumstances you shouldn't ever need
    // to call this, but it is necessary for the interactive playground to work
    // correctly.
    destroy() {
      $audio.update([])
      $view.update('')
      $plugins.event.forEach(plugin => plugin.__destroy
        ? plugin.__destroy()
        : plugin.__update([])
      )
    }
  }
}
