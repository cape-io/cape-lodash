import { curry, rearg } from 'lodash'
import { has, set } from 'lodash/fp'
import { condId } from './cond'
import { doProp } from './transform'

// set(path, value, state)

// setKey(path, state, value)
export const setKey = curry(rearg(set, [0, 2, 1]), 3)
export const setIn = setKey

// setVal(value, state, path)
export const setVal = curry(rearg(set, [2, 0, 1]), 3)

// setSimple(state, path, value)
export const setSimple = set.convert({ rearg: false })

export const setField = curry((path, transformer, item) => set(path, transformer(item), item))
export const ensureField = (fieldId, transformer) =>
  item => (has(fieldId, item) ? item : transformer(item))

export const setFieldHas = curry((path, transformer) => condId([
  has(path), setField(path, transformer),
]))
export const replaceField = curry((path, transformer) => condId([
  has(path), setField(path, doProp(transformer, path)),
]))
export const setWith = curry((fieldId, withId, transformer) =>
  setField(fieldId, doProp(transformer, withId))
)
export const mergeFields = curry((transformer, item) =>
  ({ ...item, ...transformer(item) }))
export const mergeFieldsWith = curry((withId, transformer, item) =>
  ({ ...item, ...doProp(transformer, withId) }))

// Allow accepting single path depth.
// curry((path, state) => {
//   const fullPath = toPath(path)
//   const omitKey = fullPath.pop()
//   const nestedValue = isEmpty(fullPath) ?
//   console.log(fullPath)
//   console.log(omitKey)
//   return setKey(fullPath, state, omit(get(state, fullPath), omitKey))
// })
