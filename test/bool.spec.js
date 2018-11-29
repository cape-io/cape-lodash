import test from 'tape'
import { isFalse, toBool } from '../src/bool'

test('isFalse', (t) => {
  t.equal(isFalse(true), false)
  t.equal(isFalse(0), false)
  t.equal(isFalse(false), true)
  t.end()
})
test('toBool', (t) => {
  t.equal(toBool(true), true)
  t.equal(toBool('TRUE'), true)
  t.equal(toBool('YES'), true)
  t.equal(toBool('NO'), false)
  t.equal(toBool('something anystring'), false)
  t.equal(toBool(1), true)
  t.equal(toBool(0), false)
  t.equal(toBool([]), false)
  t.equal(toBool(['']), true)
  t.equal(toBool({}), false)
  t.equal(toBool({ foo: undefined }), true)
  t.end()
})
