import test from 'tape'
import { isFunction } from 'lodash'

import {
  createObj, changeChecker, isFalse, toBool, getDefault, firstValArg,
} from '../src'

test('createObj', (t) => {
  t.deepEqual(createObj('foo', 'bar'), { foo: 'bar' })
  t.end()
})

test('isFalse', (t) => {
  t.ok(isFunction(isFalse), 'isFunc')
  t.false(isFalse(true), 'true is not false')
  t.false(isFalse(null), 'null is not false')
  t.true(isFalse(false), 'false is false')
  t.end()
})

test('firstValArg', (t) => {
  t.ok(isFunction(firstValArg), 'isFunc')
  t.equal(firstValArg(1, 0, 2), 1, 'arg0')
  t.equal(firstValArg(0, 0, 2), 2, 'arg2')
  t.equal(firstValArg(undefined, null, '', 'hot'), 'hot', 'arg3')
  t.end()
})

test('toBool', (t) => {
  t.ok(isFunction(toBool), 'isFunc')
  t.false(toBool({}), 'empty obj')
  t.true(toBool({ foo: 'far' }), 'obj')
  t.false(toBool([]), 'empty arr')
  t.true(toBool([ 1 ]), 'arr')
  t.false(toBool(null), 'null')
  t.false(toBool(undefined), 'und')
  t.false(toBool(''), 'empty str')
  t.true(toBool('kai'), 'string')
  t.true(toBool(1), 'num')
  t.end()
})

test('changeChecker', (t) => {
  t.ok(isFunction(changeChecker), 'isFunc')
  const hasChange = changeChecker()
  t.ok(isFunction(hasChange), 'isFunc')
  t.false(hasChange())
  t.true(hasChange(null))
  t.false(hasChange(null))
  t.true(hasChange({}))
  t.true(hasChange({}))
  const foo = { obj: 'here' }
  t.true(hasChange(foo))
  t.false(hasChange(foo))
  t.true(hasChange('a'))
  t.false(hasChange('a'))
  t.end()
})

const props = {
  item: { id: 'bar' },
  title: 'strawberry',
}
test('getDefault', (t) => {
  t.equal(getDefault('item.id', 'title')(props), 'bar', 'item.id')
  t.equal(getDefault('item.nothing', 'title')(props), 'strawberry', 'title')
  t.end()
})
