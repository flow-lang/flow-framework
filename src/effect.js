export const none = () => {}
export const batch = (...effects) => ($dispatch, $model) =>
  (effects || []).forEach(effect => effect($dispatch, $model))

export default {
  none,
  batch
}