import { concat, cond, curry, identity, rearg, stubTrue } from 'lodash/fp'

export function branch(bool, trueVal, falseVal) { return bool ? trueVal : falseVal }

// fpBranch(trueVal, falseVal, boolVal)
export const fpBranch = curry(rearg([2, 0, 1], branch), 3)
// ternary
export function condId(...conditions) {
  const rules = concat(conditions, [[stubTrue, identity]])
  return cond(rules)
}
export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return cond([[boolCheck, getTrue], [stubTrue, getFalse]])
}
