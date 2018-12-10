import test from 'tape'
import { divideBy, hasOf, isLt } from '../src/utils'

test('divideBy', (t) => {
  const halfIt = divideBy(2)
  const third = divideBy(3)
  t.equal(halfIt(4), 2)
  t.equal(halfIt(6), 3)
  t.equal(third(9), 3)
  t.end()
})

test('isLt', (t) => {
  const underTwo = isLt(2)
  const underThree = isLt(3)
  t.equal(underTwo(4), false)
  t.equal(underTwo(1), true)
  t.equal(underThree(2), true)
  t.end()
})
test('hasOf', (t) => {
  const hasKey = hasOf({ foo: true, bar: false })
  t.equal(hasKey('baz'), false)
  t.equal(hasKey('foo'), true)
  t.equal(hasKey('bar'), true)
  t.end()
})
