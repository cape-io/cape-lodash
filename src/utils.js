import {
  at, curry, defaultTo, divide, fill, find, flow, gt, has,
  identity, includes, isFunction, isPlainObject, lt, nthArg, spread, zipObject,
} from 'lodash/fp'

export const createObj = curry((key, val) => ({ [key]: val }))
export const ensureObj = item => (isPlainObject(item) ? item : {})

export function callWith(...args) { return func => func(...args) }
export function invokeArg(func) { return isFunction(func) ? func() : func }
export function invokeNthArg(index) { return flow(nthArg(index), invokeArg) }

// Find the first truthy argument value, .
export const firstValArg = flow(Array, find(identity))

// Given two paths, select the first one that is defined.
export function getDefault(defaultPath, getPath) {
  return flow(at([defaultPath, getPath]), spread(defaultTo))
}

export const oneOf = includes.convert({ rearg: false })
export const isGt = lt
export const isLt = gt
export const hasOf = has.convert({ rearg: false })
export const divideBy = divide.convert({ rearg: true })

export function arrayTrueObj(arr) {
  if (!arr || !arr.length) return {}
  return zipObject(arr, fill(Array(arr.length), true))
}

export function romanize(str) {
  const lookFor = /\b([MDCLXVI]+)\b/ig
  return str.replace(lookFor, value => value.toUpperCase())
}

// same as flow but always returns a promise
export const flowP = (...fns) => start =>
  fns.reduce(async (state, func) => await func(state), start) // eslint-disable-line no-return-await
