import { curry, flow, isFunction, property, propertyOf } from 'lodash'

// Return result of calling checker with object property.
export const transformProp = curry((transformer, path) => flow(property(path), transformer))
export const doProp = transformProp
export const transformPropOf = curry((transformer, object) => flow(propertyOf(object), transformer))

// Check if property has a method at path. hasMethodAt(path)(object)
export const hasMethodAt = transformProp(isFunction)
export const hasMethodOf = transformPropOf(isFunction)
