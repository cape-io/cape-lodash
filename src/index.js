import {
  cond, curry, defaultTo, eq, find, flow, identical, identity, isEmpty, isFunction, isObject,
  negate, over, partialRight, property, propertyOf, spread, stubTrue,
} from 'lodash'
import at from 'lodash/fp/at'
export const condId = partialRight(cond, [ stubTrue, identity ])
export const createObj = curry((key, val) => ({ [key]: val }))

// Returns true if sent a value that is exactly false.
export const isFalse = identical(false)
export const isTrue = identical(true)
// Find the first truthy argument value.
export const firstValArg = flow(Array, find)

// Turn empty objs and arrays to false. Turn other vals into a boolean.
export const toBool = cond([ [ isObject, negate(isEmpty) ], [ stubTrue, Boolean ] ])

// Give it an initial value. Returns function that will be true when value changed.
export function changeChecker(initValue) {
  let currentValue = initValue
  return (nextValue) => {
    const previousValue = currentValue
    currentValue = nextValue
    return !eq(previousValue, currentValue)
  }
}
// Give it a getter and an onChange callback. It will return a function.
// Call returned func on every change and it will conditionally calling onChange.
export function handleChanges(getValue, onChange) {
  const valueChanged = changeChecker(getValue())
  return () => {
    const val = getValue()
    return valueChanged(val) && onChange(val)
  }
}

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
