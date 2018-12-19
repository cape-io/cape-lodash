import { concat, cond, curry, identity, rearg, stubTrue } from 'lodash/fp'

export const branch = (bool, trueVal, falseVal) => (bool ? trueVal : falseVal)

// fpBranch(trueVal, falseVal, boolVal)
export const fpBranch = curry(rearg([2, 0, 1], branch), 3)
// ternary
export const condId = (...conditions) => cond(concat(conditions, [[stubTrue, identity]]))

export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return cond([[boolCheck, getTrue], [stubTrue, getFalse]])
}
