import { cond, curry, isEmpty, isObject, negate, rearg, stubTrue } from 'lodash'
import { identical } from 'lodash/fp'

export function branch(bool, trueVal, falseVal) { return bool ? trueVal : falseVal }
export const fpBranch = curry(rearg(branch, [ 1, 2, 0 ]), 3)
// Returns true if sent a value that is exactly false.
export const isFalse = identical(false)
export const isTrue = identical(true)
export const hasSize = negate(isEmpty)
// Turn empty objs and arrays to false. Turn other vals into a boolean.
export const toBool = cond([ [ isObject, hasSize ], [ stubTrue, Boolean ] ])
