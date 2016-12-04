import { curry, get, rearg } from 'lodash'
import { has } from 'lodash/fp'
import { condId } from './cond'
import { doProp } from './transform'

export function set(state, key, value) { return { ...state, [key]: value } }
export const setKey = curry(rearg(set, [1, 0, 2]), 3)
export const setKeyVal = curry(rearg(set, [2, 0, 1]), 3)
export const setVal = curry(rearg(set, [1, 2, 0]), 3)
export const setIn = curry(([key, ...rest], state, value) => {
  if (!rest.length) return set(state, key, value)
  return set(state, key, setIn(rest, get(state, key, {}), value))
})
export const setField = curry((path, transformer) => item => set(item, path, transformer(item)))
export const setFieldHas = curry((path, transformer) => condId([
  has(path), setField(path, transformer),
]))
export const replaceField = curry((path, transformer) => condId([
  has(path), setField(path, doProp(transformer, path)),
]))
