import {
  cond, flow, identical, isEmpty, isObject, isString, lowerCase, negate, stubTrue, trim
} from 'lodash/fp'
import trueWords from 'affirmative'
import { oneOf } from './utils'

// Returns true if sent a value that is exactly false.
export const isFalse = identical(false)
export const isTrue = identical(true)
export const hasSize = negate(isEmpty)

const parseBoolean = flow(trim, lowerCase, oneOf(trueWords))
// Turn empty objs and arrays to false. Turn other vals into a boolean.
export const toBool = cond([
  [isObject, hasSize],
  [isString, parseBoolean],
  [stubTrue, Boolean]],
)
