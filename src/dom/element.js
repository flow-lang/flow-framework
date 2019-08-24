export const element = (tag, attrs = [], children = []) => ({ tag, attrs, children })

export const a = (attrs, children) => element('a', attrs, children)
export const abbr = (attrs, children) => element('abbr', attrs, children)
export const address = (attrs, children) => element('address', attrs, children)
export const area = (attrs, children) => element('area', attrs, children)
export const article = (attrs, children) => element('article', attrs, children)
export const aside = (attrs, children) => element('aside', attrs, children)
export const audio = (attrs, children) => element('audio', attrs, children)
export const b = (attrs, children) => element('b', attrs, children)
export const base = (attrs, children) => element('base', attrs, children)
export const bdi = (attrs, children) => element('bdi', attrs, children)
export const bdo = (attrs, children) => element('bdo', attrs, children)
export const blockquote = (attrs, children) => element('blockquote', attrs, children)
export const body = (attrs, children) => element('body', attrs, children)
export const br = (attrs, children) => element('br', attrs, children)
export const button = (attrs, children) => element('button', attrs, children)
export const canvas = (attrs, children) => element('canvas', attrs, children)
export const caption = (attrs, children) => element('caption', attrs, children)
export const cite = (attrs, children) => element('cite', attrs, children)
export const code = (attrs, children) => element('code', attrs, children)
export const col = (attrs, children) => element('col', attrs, children)
export const colgroup = (attrs, children) => element('colgroup', attrs, children)
export const data = (attrs, children) => element('data', attrs, children)
export const datalist = (attrs, children) => element('datalist', attrs, children)
export const dd = (attrs, children) => element('dd', attrs, children)
export const del = (attrs, children) => element('del', attrs, children)
export const details = (attrs, children) => element('details', attrs, children)
export const dfn = (attrs, children) => element('dfn', attrs, children)
export const dialog = (attrs, children) => element('dialog', attrs, children)
export const div = (attrs, children) => element('div', attrs, children)
export const dl = (attrs, children) => element('dl', attrs, children)
export const dt = (attrs, children) => element('dt', attrs, children)
export const em = (attrs, children) => element('em', attrs, children)
export const embed = (attrs, children) => element('embed', attrs, children)
export const fieldset = (attrs, children) => element('fieldset', attrs, children)
export const figure = (attrs, children) => element('figure', attrs, children)
export const footer = (attrs, children) => element('footer', attrs, children)
export const form = (attrs, children) => element('form', attrs, children)
export const h1 = (attrs, children) => element('h1', attrs, children)
export const h2 = (attrs, children) => element('h2', attrs, children)
export const h3 = (attrs, children) => element('h3', attrs, children)
export const h4 = (attrs, children) => element('h4', attrs, children)
export const h5 = (attrs, children) => element('h5', attrs, children)
export const h6 = (attrs, children) => element('h6', attrs, children)
export const head = (attrs, children) => element('head', attrs, children)
export const header = (attrs, children) => element('header', attrs, children)
export const hgroup = (attrs, children) => element('hgroup', attrs, children)
export const hr = (attrs, children) => element('hr', attrs, children)
export const html = (attrs, children) => element('html', attrs, children)
export const i = (attrs, children) => element('i', attrs, children)
export const iframe = (attrs, children) => element('iframe', attrs, children)
export const img = (attrs, children) => element('img', attrs, children)
export const input = (attrs, children) => element('input', attrs, children)
export const ins = (attrs, children) => element('ins', attrs, children)
export const kbd = (attrs, children) => element('kbd', attrs, children)
export const keygen = (attrs, children) => element('keygen', attrs, children)
export const label = (attrs, children) => element('label', attrs, children)
export const legend = (attrs, children) => element('legend', attrs, children)
export const li = (attrs, children) => element('li', attrs, children)
export const link = (attrs, children) => element('link', attrs, children)
export const main = (attrs, children) => element('main', attrs, children)
export const map = (attrs, children) => element('map', attrs, children)
export const mark = (attrs, children) => element('mark', attrs, children)
export const menu = (attrs, children) => element('menu', attrs, children)
export const menuitem = (attrs, children) => element('menuitem', attrs, children)
export const meta = (attrs, children) => element('meta', attrs, children)
export const meter = (attrs, children) => element('meter', attrs, children)
export const nav = (attrs, children) => element('nav', attrs, children)
export const noscript = (attrs, children) => element('noscript', attrs, children)
export const object = (attrs, children) => element('object', attrs, children)
export const ol = (attrs, children) => element('ol', attrs, children)
export const optgroup = (attrs, children) => element('optgroup', attrs, children)
export const option = (attrs, children) => element('option', attrs, children)
export const output = (attrs, children) => element('output', attrs, children)
export const p = (attrs, children) => element('p', attrs, children)
export const param = (attrs, children) => element('param', attrs, children)
export const pre = (attrs, children) => element('pre', attrs, children)
export const progress = (attrs, children) => element('progress', attrs, children)
export const q = (attrs, children) => element('q', attrs, children)
export const rb = (attrs, children) => element('rb', attrs, children)
export const rp = (attrs, children) => element('rp', attrs, children)
export const rt = (attrs, children) => element('rt', attrs, children)
export const rtc = (attrs, children) => element('rtc', attrs, children)
export const ruby = (attrs, children) => element('ruby', attrs, children)
export const s = (attrs, children) => element('s', attrs, children)
export const samp = (attrs, children) => element('samp', attrs, children)
export const script = (attrs, children) => element('script', attrs, children)
export const section = (attrs, children) => element('section', attrs, children)
export const select = (attrs, children) => element('select', attrs, children)
export const small = (attrs, children) => element('small', attrs, children)
export const source = (attrs, children) => element('source', attrs, children)
export const span = (attrs, children) => element('span', attrs, children)
export const strong = (attrs, children) => element('strong', attrs, children)
export const style = (attrs, children) => element('style', attrs, children)
export const sub = (attrs, children) => element('sub', attrs, children)
export const summary = (attrs, children) => element('summary', attrs, children)
export const sup = (attrs, children) => element('sup', attrs, children)
export const table = (attrs, children) => element('table', attrs, children)
export const tbody = (attrs, children) => element('tbody', attrs, children)
export const td = (attrs, children) => element('td', attrs, children)
export const template = (attrs, children) => element('template', attrs, children)
export const text = s => `${s}`
export const textarea = (attrs, children) => element('textarea', attrs, children)
export const tfoot = (attrs, children) => element('tfoot', attrs, children)
export const th = (attrs, children) => element('th', attrs, children)
export const thead = (attrs, children) => element('thead', attrs, children)
export const time = (attrs, children) => element('time', attrs, children)
export const title = (attrs, children) => element('title', attrs, children)
export const tr = (attrs, children) => element('tr', attrs, children)
export const track = (attrs, children) => element('track', attrs, children)
export const u = (attrs, children) => element('u', attrs, children)
export const ul = (attrs, children) => element('ul', attrs, children)
export const var_ = (attrs, children) => element('var', attrs, children)
export const video = (attrs, children) => element('video', attrs, children)
export const wbr = (attrs, children) => element('wbr', attrs, children)

export default {
  // Core
  element,
  // HTML elements
  a,
  abbr,
  address,
  area,
  article,
  aside,
  audio,
  b,
  base,
  bdi,
  bdo,
  blockquote,
  body,
  br,
  button,
  canvas,
  caption,
  cite,
  code,
  col,
  colgroup,
  data,
  datalist,
  dd,
  del,
  details,
  dfn,
  dialog,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hgroup,
  hr,
  html,
  i,
  iframe,
  img,
  input,
  ins,
  kbd,
  keygen,
  label,
  legend,
  li,
  link,
  main,
  map,
  mark,
  menu,
  menuitem,
  meta,
  meter,
  nav,
  noscript,
  object,
  ol,
  optgroup,
  option,
  output,
  p,
  param,
  pre,
  progress,
  q,
  rb,
  rp,
  rt,
  rtc,
  ruby,
  s,
  samp,
  script,
  section,
  select,
  small,
  source,
  span,
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
  text,
  textarea,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  track,
  u,
  ul,
  var_,
  video,
  wbr
}
