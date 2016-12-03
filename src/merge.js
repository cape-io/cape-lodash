import { curry, rearg } from 'lodash'

export function merge(object, ...sources) { return Object.assign({}, object, ...sources) }
export const mergeWith = curry(rearg(merge, [ 1, 0 ]), 2)
