import { concat, cond, identity, stubTrue } from 'lodash'

export function condId(...conditions) {
  const rules = concat(conditions, [ [ stubTrue, identity ] ])
  return cond(rules)
}
