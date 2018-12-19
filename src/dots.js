import {
  ary, curry, flip, fromPairs, get,
  pick, reduce, set, unset } from 'lodash'
import { at, curryN, find, flow, identity, map, over, propertyOf, rearg, result } from 'lodash/fp'

export function copy(getKey, setKey, source, target) {
  const value = get(source, getKey)
  return (value === undefined) ? target : set(target, setKey, value)
}
export const fpCopy = curry(rearg([3, 2, 0, 1], copy), 4)
export const move = curry((getKey, setKey, object) => {
  set(object, setKey, get(object, getKey))
  unset(object, getKey)
  return object
})
export const fpMove = ary(flip(move), 3)
export const rename = curry((renameObj, source) => reduce(renameObj, fpMove, source))
// key is get, value is set.
export const renamePick = curry((renameObj, source) => reduce(renameObj, fpCopy(source), {}))
export const pickRename = curry((pickIds, renameObj, source) =>
  reduce(renameObj, fpCopy(source), pick(source)))

export const createIndex = (keyPath, valuePath) =>
  flow(map(at([keyPath, valuePath])), fromPairs)
export const keyWithField = createIndex

export const propertyOfOr = renameObj =>
  flow(over([propertyOf(renameObj), identity]), find(identity))

export const renameValues = flow(propertyOfOr, map)

// Set field with result of path on source to the same path on destination.
export const setResult = curry((path, source, destination) =>
  set(path, result(path, source), destination))

// setValResult(source, destination, path)
// Used as reducer iteratee for pickResult().
export const setValResult = curryN(3, rearg([2, 0, 1], setResult))

// Add results to a new object. How different from _.pick?
export const pickResult = curry((ids, source) => reduce(ids, setValResult(source), {}))

// Add results to destination object.
export const pickResultDestination = curry((ids, destination, source) =>
  reduce(ids, setValResult(source), destination))
