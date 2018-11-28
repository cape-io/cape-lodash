import {
  compact, flow, isArray, isPlainObject, isString, map, omitBy, trim } from 'lodash/fp'
import { condId } from './cond'
import { isGlib } from './bool'

export const cleanObject = omitBy(isGlib)
export const clean = condId(
  [isArray, flow(compact, map(clean))],
  [isPlainObject, cleanObject],
  [isString, trim],
)
