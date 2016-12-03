import { ary, curry, flip, get, rearg, reduce, set, unset } from 'lodash'

export function copy(getKey, setKey, source, target) {
  const value = get(source, getKey)
  return (value === undefined) ? target : set(target, setKey, value)
}
export const fpCopy = curry(rearg(copy, [ 3, 2, 0, 1 ]), 4)
export function move(getKey, setKey, object) {
  set(object, setKey, get(object, getKey))
  unset(object, getKey)
  return object
}
export const fpMove = curry(ary(flip(move), 3))
export const rename = curry((renameObj, source) => reduce(renameObj, fpMove, source))
// key is get, value is set.
export const renamePick = curry((renameObj, source) => reduce(renameObj, fpCopy(source), {}))