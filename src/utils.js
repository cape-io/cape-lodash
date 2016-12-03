import {
  cond, curry, defaultTo, find, flow,
  identity, includes, isFunction,
  nthArg, partial, property, propertyOf, spread, stubTrue,
} from 'lodash'
import at from 'lodash/fp/at'

export const createObj = curry((key, val) => ({ [key]: val }))

export function callWith(...args) { return func => func(...args) }
export function invokeArg(func) { return func() }
export function invokeNthArg(index) { return flow(nthArg(index), invokeArg) }

export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return cond([[boolCheck, getTrue], [stubTrue, getFalse]])
}

// Find the first truthy argument value, .
export const firstValArg = flow(Array, find)

// Given two paths, select the first one that is defined.
export function getDefault(path1, path2) {
  return flow(at([path1, path2]), spread(defaultTo))
}
// Return result of calling checker with object property.
export const transformProp = curry((transformer, path) => flow(property(path), transformer))
export const doProp = transformProp
export const transformPropOf = curry((transformer, object) => flow(propertyOf(object), transformer))

// Check if property has a method at path. hasMethodAt(path)(object)
export const hasMethodAt = transformProp(isFunction)
export const hasMethodOf = transformPropOf(isFunction)

export function oneOf(list) { return partial(includes, list) }
