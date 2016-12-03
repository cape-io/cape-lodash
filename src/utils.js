import {
  concat, cond, curry, defaultTo, find, flow,
  identical, identity, includes, isEmpty, isFunction, isObject,
  negate, nthArg, partial, property, propertyOf, rearg, spread, stubTrue,
} from 'lodash'
import at from 'lodash/fp/at'

export function branch(bool, trueVal, falseVal) { return bool ? trueVal : falseVal }
export const fpBranch = curry(rearg(branch, [ 1, 2, 0 ]), 3)
export const createObj = curry((key, val) => ({ [key]: val }))

export function callWith(...args) { return func => func(...args) }
export function invokeArg(func) { return func() }
export function invokeNthArg(index) { return flow(nthArg(index), invokeArg) }
export function condId(...conditions) {
  const rules = concat(conditions, [ [ stubTrue, identity ] ])
  return cond(rules)
}
export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return cond([ [ boolCheck, getTrue ], [ stubTrue, getFalse ] ])
}

// Returns true if sent a value that is exactly false.
export const isFalse = identical(false)
export const isTrue = identical(true)
// Find the first truthy argument value, .
export const firstValArg = flow(Array, find)

// Turn empty objs and arrays to false. Turn other vals into a boolean.
export const toBool = cond([ [ isObject, negate(isEmpty) ], [ stubTrue, Boolean ] ])

// Given two paths, select the first one that is defined.
export function getDefault(path1, path2) {
  return flow(at([ path1, path2 ]), spread(defaultTo))
}
// Return result of calling checker with object property.
export const transformProp = curry((transformer, path) => flow(property(path), transformer))
export const transformPropOf = curry((transformer, object) => flow(propertyOf(object), transformer))

// Check if property has a method at path. hasMethodAt(path)(object)
export const hasMethodAt = transformProp(isFunction)
export const hasMethodOf = transformPropOf(isFunction)

export function oneOf(list) { return partial(includes, list) }
