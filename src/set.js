import { curry, get, omit, rearg, toPath } from 'lodash'
import { has } from 'lodash/fp'
import { condId } from './cond'
import { doProp } from './transform'

export function setSimple(state, key, value) { return { ...state, [key]: value } }
export const set = curry((state, path, value) => {
  const [key, ...rest] = toPath(path)
  if (!rest.length) return setSimple(state, key, value)
  return setSimple(state, key, set(get(state, key, {}), rest, value))
})
// setKey(path, state, value)
export const setKey = curry(rearg(set, [1, 0, 2]), 3)
export const setIn = setKey
// setKeyVal(key, value, state)
export const setKeyVal = curry(rearg(set, [2, 0, 1]), 3)
// setVal(value, state, key)
export const setVal = curry(rearg(set, [1, 2, 0]), 3)

export const setField = curry((path, transformer) => item => set(item, path, transformer(item)))
export const setFieldHas = curry((path, transformer) => condId([
  has(path), setField(path, transformer),
]))
export const replaceField = curry((path, transformer) => condId([
  has(path), setField(path, doProp(transformer, path)),
]))
export const setWith = curry((fieldId, withId, transformer) =>
  setField(fieldId, doProp(transformer, withId))
)
export function delAt(path, state) {
  const omitKey = toPath(path).pop()
  return setKey(path, state, omit(get(state, path), omitKey))
}
