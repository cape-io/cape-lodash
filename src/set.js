import { curry, curryN, has, isEmpty, rearg, set, update } from 'lodash/fp'
import { condId } from './cond'
import { doProp } from './transform'

// set(path, value, state)

// setKey(path, state, value)
export const setKey = curryN(3, rearg([0, 2, 1], set))
export const setIn = setKey

// setVal(value, state, path)
export const setVal = curryN(3, rearg([2, 0, 1], set))

// setSimple(state, path, value)
export const setSimple = set.convert({ rearg: false })

// Set field. Transformer given entire item.
export const setField = curry((path, transformer, item) =>
  set(path, transformer(item), item))

// Set field if it's not already there. Transformer given item.
export const addField = curry((path, transformer) => condId([
  doProp(isEmpty, path), setField(path, transformer),
]))

// Replace Field. Transformer given item.
export const setFieldHas = curry((path, transformer) => condId([
  has(path), setField(path, transformer),
]))

// Replace Field. Transformer gets field value.
export const replaceField = curry((path, transformer) => condId([
  has(path), update(path, transformer),
]))

// Set field. Transformer given value of withId property.
export const setWith = curry((path, withId, transformer) =>
  setField(path, doProp(transformer, withId))
)

export const mergeFields = curry((transformer, item) =>
  ({ ...item, ...transformer(item) }))
export const mergeFieldsWith = curry((withId, transformer, item) =>
  ({ ...item, ...doProp(transformer, withId) }))
