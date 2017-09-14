import {
  curry, defaultTo, fill, find, flow,
  includes, nthArg, partial, spread, zipObject,
} from 'lodash'
import at from 'lodash/fp/at'

export const createObj = curry((key, val) => ({ [key]: val }))

export function callWith(...args) { return func => func(...args) }
export function invokeArg(func) { return func() }
export function invokeNthArg(index) { return flow(nthArg(index), invokeArg) }

// Find the first truthy argument value, .
export const firstValArg = flow(Array, find)

// Given two paths, select the first one that is defined.
export function getDefault(path1, path2) {
  return flow(at([path1, path2]), spread(defaultTo))
}

export function oneOf(list) { return partial(includes, list) }

export function arrayTrueObj(arr) {
  if (!arr || !arr.length) return {}
  return zipObject(arr, fill(Array(arr.length), true))
}
