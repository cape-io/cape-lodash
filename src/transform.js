import { flow, isFunction, propertyOf } from 'lodash'
import { curry, get, has } from 'lodash/fp'
import { condId } from './cond'

// Return result of calling checker with object property.
export const transformProp = curry((transformer, path) => flow(get(path), transformer))
export const doProp = transformProp
export const transformPropOf = curry((transformer, object) => flow(propertyOf(object), transformer))
export const doPropOf = transformPropOf
// Check if property has a method at path. hasMethodAt(path)(object)
export const hasMethodAt = transformProp(isFunction)
export const hasMethodOf = transformPropOf(isFunction)

// Replace entire item if field is missing. Transformer given path.
export const transformHas = curry((path, transformer) => condId([
  has(path), doProp(transformer, path),
]))
