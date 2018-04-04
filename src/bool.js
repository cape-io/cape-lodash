import { cond, identical, isEmpty, isObject, negate, stubTrue } from 'lodash/fp'

// Returns true if sent a value that is exactly false.
export const isFalse = identical(false)
export const isTrue = identical(true)
export const hasSize = negate(isEmpty)
// Turn empty objs and arrays to false. Turn other vals into a boolean.
export const toBool = cond([[isObject, hasSize], [stubTrue, Boolean]])
