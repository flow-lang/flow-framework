export const attribute = (name, value) => ({ name, value })

export const accept = value => attribute('accept', value)
export const acceptCharset = value => attribute('accept-charset', value)
export const accesskey = value => attribute('accesskey', value)
export const action = value => attribute('action', value)
export const align = value => attribute('align', value)
export const allow = value => attribute('allow', value)
export const alt = value => attribute('alt', value)
export const async = value => attribute('async', value)
export const autocapitalize = value => attribute('autocapitalize', value)
export const autocomplete = value => attribute('autocomplete', value)
export const autofocus = value => attribute('autofocus', value)
export const autoplay = value => attribute('autoplay', value)
export const buffered = value => attribute('buffered', value)
export const challenge = value => attribute('challenge', value)
export const charset = value => attribute('charset', value)
export const checked = value => attribute('checked', value)
export const cite = value => attribute('cite', value)
export const className = value => attribute('class', value)
export const code = value => attribute('code', value)
export const codebase = value => attribute('codebase', value)
export const color = value => attribute('color', value)
export const cols = value => attribute('cols', value)
export const colspan = value => attribute('colspan', value)
export const content = value => attribute('content', value)
export const contenteditable = value => attribute('contenteditable', value)
export const contextmenu = value => attribute('contextmenu', value)
export const controls = value => attribute('controls', value)
export const coords = value => attribute('coords', value)
export const crossorigin = value => attribute('crossorigin', value)
export const csp = value => attribute('csp', value)
export const data = value => attribute('data', value)
export const dataCustom = (name, value) => attribute(`data-${name}`, value)
export const datetime = value => attribute('datetime', value)
export const decoding = value => attribute('decoding', value)
export const default_ = value => attribute('default', value)
export const defer = value => attribute('defer', value)
export const dir = value => attribute('dir', value)
export const dirname = value => attribute('dirname', value)
export const disabled = value => attribute('disabled', value)
export const download = value => attribute('download', value)
export const draggable = value => attribute('draggable', value)
export const dropzone = value => attribute('dropzone', value)
export const enctype = value => attribute('enctype', value)
export const for_ = value => attribute('for', value)
export const form = value => attribute('form', value)
export const formaction = value => attribute('formaction', value)
export const headers = value => attribute('headers', value)
export const height = value => attribute('height', value)
export const hidden = value => attribute('hidden', value)
export const high = value => attribute('high', value)
export const href = value => attribute('href', value)
export const hreflang = value => attribute('hreflang', value)
export const httpEquiv = value => attribute('http-equiv', value)
export const icon = value => attribute('icon', value)
export const id = value => attribute('id', value)
export const importance = value => attribute('importance', value)
export const integrity = value => attribute('integrity', value)
export const ismap = value => attribute('ismap', value)
export const itemprop = value => attribute('itemprop', value)
export const keytype = value => attribute('keytype', value)
export const kind = value => attribute('kind', value)
export const label = value => attribute('label', value)
export const lang = value => attribute('lang', value)
export const language = value => attribute('language', value)
export const lazyload = value => attribute('lazyload', value)
export const list = value => attribute('list', value)
export const loop = value => attribute('loop', value)
export const low = value => attribute('low', value)
export const manifest = value => attribute('manifest', value)
export const max = value => attribute('max', value)
export const maxlength = value => attribute('maxlength', value)
export const minlength = value => attribute('minlength', value)
export const media = value => attribute('media', value)
export const method = value => attribute('method', value)
export const min = value => attribute('min', value)
export const multiple = value => attribute('multiple', value)
export const muted = value => attribute('muted', value)
export const name = value => attribute('name', value)
export const novalidate = value => attribute('novalidate', value)
export const open = value => attribute('open', value)
export const optimum = value => attribute('optimum', value)
export const pattern = value => attribute('pattern', value)
export const ping = value => attribute('ping', value)
export const placeholder = value => attribute('placeholder', value)
export const poster = value => attribute('poster', value)
export const preload = value => attribute('preload', value)
export const radiogroup = value => attribute('radiogroup', value)
export const readonly = value => attribute('readonly', value)
export const referrerpolicy = value => attribute('referrerpolicy', value)
export const rel = value => attribute('rel', value)
export const required = value => attribute('required', value)
export const reversed = value => attribute('reversed', value)
export const rows = value => attribute('rows', value)
export const rowspan = value => attribute('rowspan', value)
export const sandbox = value => attribute('sandbox', value)
export const scope = value => attribute('scope', value)
export const scoped = value => attribute('scoped', value)
export const selected = value => attribute('selected', value)
export const shape = value => attribute('shape', value)
export const size = value => attribute('size', value)
export const sizes = value => attribute('sizes', value)
export const slot = value => attribute('slot', value)
export const span = value => attribute('span', value)
export const spellcheck = value => attribute('spellcheck', value)
export const src = value => attribute('src', value)
export const srcdoc = value => attribute('srcdoc', value)
export const srclang = value => attribute('srclang', value)
export const srcset = value => attribute('srcset', value)
export const start = value => attribute('start', value)
export const step = value => attribute('step', value)
export const style = value => attribute('style', value)
export const summary = value => attribute('summary', value)
export const tabindex = value => attribute('tabindex', value)
export const target = value => attribute('target', value)
export const title = value => attribute('title', value)
export const translate = value => attribute('translate', value)
export const type = value => attribute('type', value)
export const usemap = value => attribute('usemap', value)
export const value = value => attribute('value', value)
export const width = value => attribute('width', value)
export const wrap = value => attribute('wrap', value)

export default {
  // Core
  attribute,
  // HTML attributes
  accept,
  acceptCharset,
  accesskey,
  action,
  align,
  allow,
  alt,
  async,
  autocapitalize,
  autocomplete,
  autofocus,
  autoplay,
  buffered,
  challenge,
  charset,
  checked,
  cite,
  className,
  code,
  codebase,
  color,
  cols,
  colspan,
  content,
  contenteditable,
  contextmenu,
  controls,
  coords,
  crossorigin,
  csp,
  data,
  dataCustom,
  datetime,
  decoding,
  default_,
  defer,
  dir,
  dirname,
  disabled,
  download,
  draggable,
  dropzone,
  enctype,
  for_,
  form,
  formaction,
  headers,
  height,
  hidden,
  high,
  href,
  hreflang,
  httpEquiv,
  icon,
  id,
  importance,
  integrity,
  ismap,
  itemprop,
  keytype,
  kind,
  label,
  lang,
  language,
  lazyload,
  list,
  loop,
  low,
  manifest,
  max,
  maxlength,
  minlength,
  media,
  method,
  min,
  multiple,
  muted,
  name,
  novalidate,
  open,
  optimum,
  pattern,
  ping,
  placeholder,
  poster,
  preload,
  radiogroup,
  readonly,
  referrerpolicy,
  rel,
  required,
  reversed,
  rows,
  rowspan,
  sandbox,
  scope,
  scoped,
  selected,
  shape,
  size,
  sizes,
  slot,
  span,
  spellcheck,
  src,
  srcdoc,
  srclang,
  srcset,
  start,
  step,
  style,
  summary,
  tabindex,
  target,
  title,
  translate,
  type,
  usemap,
  value,
  width,
  wrap
}
