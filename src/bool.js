import {
  compact, cond, flow, identity, identical,
  isArray, isEmpty, isNull, isObject, isString, lowerCase,
  negate, overEvery, overSome, pickBy, stubTrue, trim,
} from 'lodash/fp'
import trueWords from 'affirmative'
import { oneOf } from './utils'

// LANG

// Returns true if sent a value that is exactly false.
export const isFalse = identical(false)
export const isTrue = identical(true)
export const isEmptyString = overEvery([isString, trim, isEmpty])
export const isEmptyArray = overEvery([isArray, flow(compact, isEmpty)])
export const isEmptyObject = overEvery([isObject, flow(pickBy(identity), isEmpty)])
export const isGlib = overSome([
  isNull, isEmptyString, isEmptyArray, isEmptyObject,
])

export const hasSize = negate(isEmpty)

const parseBoolean = flow(trim, lowerCase, oneOf(trueWords))
// Turn empty objs and arrays to false. Turn other vals into a boolean.
export const toBool = cond([
  [isObject, hasSize],
  [isString, parseBoolean],
  [stubTrue, Boolean]],
)
