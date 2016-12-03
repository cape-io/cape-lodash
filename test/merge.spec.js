import test from 'tape'

import { merge, mergeWith } from '../src'

test('merge', (t) => {
  const obj1 = { kai: 'foo', rev: 'minor', same: 'same' }
  const obj2 = { rev: 'bar' }
  const obj3 = { same: 'diff', sally: 'hair' }
  const merged = merge(obj1, obj2, obj3)
  t.false(obj1 === merged)
  t.false(obj2 === merged)
  t.false(obj3 === merged)
  t.deepEqual(merged, { kai: 'foo', rev: 'bar', same: 'diff', sally: 'hair' })
  t.end()
})
test('mergeWith', (t) => {
  const obj1 = { kai: 'foo', rev: 'minor', same: 'same' }
  const obj2 = { rev: 'bar' }
  t.equal(mergeWith(obj2)(obj1).rev, 'bar')
  t.end()
})
