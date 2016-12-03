import { curry, get, rearg } from 'lodash'

export function set(state, key, value) { return { ...state, [key]: value } }
export const setKey = curry(rearg(set, [ 1, 0, 2 ]), 3)
export const setVal = curry(rearg(set, [ 2, 0, 1 ]), 3)
export const setIn = curry(([ key, ...rest ], state, value) => {
  if (!rest.length) return set(state, key, value)
  return set(state, key, setIn(rest, get(state, key, {}), value))
})
