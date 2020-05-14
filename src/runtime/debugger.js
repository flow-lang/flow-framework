import Action from '../action'

import * as Html from '../dom/element'
import * as Attr from '../dom/attribute'
import * as Event from '../dom/event'

export const init = appModel => ({
  running: false,
  history: [ [ { action: '__init' }, appModel ] ],
  pointer: 0
})

export const ToggleRunning = () => Action('__Toggle-Running')
export const MovePointer = i => Action('__Move-Pointer', i)
export const PushAction = (action, appModel) => Action('__Push-Action', { action, appModel })
export const ExportHistory = () => Action('__Export-History')
export const ImportHistory = () => Action('__Import-History')
export const LoadJsonHistory = history => Action('__Load-Json', { history })

const exportHistory = (_, model) => {
  const history = JSON.stringify(model.history, null, 2)
  const el = document.createElement('a')
  el.setAttribute('href', `data:application/json;charset=utf-8,${ encodeURIComponent(history) }`)
  el.setAttribute('download', 'history.json')

  el.style.display = 'none'
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}

const importHistory = ($dispatch, _) => {
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const history = JSON.parse(reader.result)
      $dispatch(LoadJsonHistory(history))
    } catch (e) {
      console.error(e)
    }
  }

  const el = document.createElement('input')
  el.setAttribute('type', 'file')
  el.setAttribute('accept', 'application/json')

  document.body.appendChild(el) 
  el.addEventListener('change', ({ target }) => {
    if (target.files) reader.readAsText(target.files[0])
    document.body.removeChild(el)
  })

  el.click()
}

export const update = ({ action, payload }, model) => {
  switch (action) {
    case '__Toggle-Running':
      return [{ ...model, running: !model.running }]

    case '__Move-Pointer': {
      return [{ ...model, pointer: payload }]
    }

    case '__Push-Action': {
      const { action, appModel } = payload
      const history = model.pointer < model.history.length - 1
        ? [ ...model.history.slice(0, model.pointer + 1), [ action, appModel ] ]
        : [ ...model.history, [ action, appModel ] ]

      return [{ ...model, history, pointer: history.length - 1 }]
    }

    case '__Export-History':
      return [ model, exportHistory ]

    case '__Import-History':
      return [ model, importHistory ]

    case '__Load-Json': {
      const { history } = payload

      return [{ ...model, history, pointer: 0 }]
    }
  }
}

export const view = model => {
  const css = `
    background: #EEEEEE;
    font-family: monospace;
    position: fixed;
    bottom: 25px;
    right: 25px;
    padding: 10px;
    -webkit-box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.1);
    -moz-box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.1);
    box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.1);
 `

  return Html.div([ Attr.style(css), Attr.id('__Debugger') ], [
    Html.div([
      Attr.style(`
        margin-bottom: 5px
      `)
    ], [
      Html.span([], [
        Html.text('Toggle debugger: ')
      ]),
      Html.button([ Attr.id('__Toggle') ], [
        Html.text(`[${ model.running ? 'x' : ' ' }]`)
      ])
    ]),

    Html.div([
      Attr.style(`
        margin: 5px 0;
      `)
    ], [
      Html.span([], [
        Html.text(`${ model.pointer + 1 }/${ model.history.length }`)
      ]),
      Html.input([
        Attr.id('__Move'),
        Attr.type('range'),
        Attr.min(1),
        Attr.max(model.history.length),
        Attr.value(model.pointer + 1),
        Attr.style(`
          vertical-align: middle;
          margin: 0 10px;
        `)
      ]),
      Html.button([ Attr.id('__Move-Back') ], [
        Html.text('-')
      ]),
      Html.span([], [
        Html.text(' | ')
      ]),
      Html.button([ Attr.id('__Move-Forward') ], [
        Html.text('+')
      ])
    ]),

    Html.details([
      Attr.style(`
        margin: 5px 0;
      `)
    ], [
      Html.summary([], [ 
        Html.text(`Action: ${ model.history[model.pointer][0].action }`)
      ]),
      Html.p([
        Attr.style(`
          max-height: 200px;
          width: 300px;
          overflow-y: scroll;
          overflow-x: auto;
          white-space: pre-wrap;
          padding-top: 5px;
        `)
      ], [
        Html.text(
         JSON.stringify(model.history[model.pointer][1], null, 2)
        )
      ])
    ]),

    Html.div([
      Attr.style(`
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      `)
    ], [
      Html.button([ Attr.id('__Export') ], [
        Html.text('Export')
      ]),
      Html.button([ Attr.id('__Import') ], [
        Html.text('Import')
      ])
    ])
  ])
}


export const listen = model => {
  return [
    Event.click('#__Toggle', () => ToggleRunning()),
    Event.input('#__Move', e => MovePointer(Number(e.target.value) - 1)),
    Event.click('#__Move-Back', () => MovePointer(
      model.pointer - 1 < 0
        ? 0
        : model.pointer - 1
    )),
    Event.click('#__Move-Forward', () => MovePointer(
      model.pointer + 1 >= model.history.length
        ? model.history.length - 1
        : model.pointer + 1
    )),
    Event.click('#__Export', () => ExportHistory()),
    Event.click('#__Import', () => ImportHistory())
  ]
}

