import test from 'tape'
import { constant, isFunction, isString, min, noop, toUpper } from 'lodash'
import { eq, multiply } from 'lodash/fp'
import {
  createObj, changeChecker, condId, copy, handleChanges,
  isFalse, move, toBool, getDefault, firstValArg,
  invokeArg, invokeNthArg, overBranch, transformProp, transformPropOf, hasMethodAt, hasMethodOf,
  oneOf, rename, renamePick,
} from '../src'

test('condId', (t) => {
  const func = condId([eq(2), multiply(2)], [eq(3), multiply(3)])
  t.equal(func(2), 4)
  t.equal(func(3), 9)
  t.equal(func(1), 1)
  t.end()
})
test('overBranch', (t) => {
  const ob1 = overBranch(isString, toUpper)
  t.equal(ob1('abc'), 'ABC')
  t.equal(ob1(1), 1)
  const ob2 = overBranch(isString, toUpper, constant('No'))
  t.equal(ob2(1), 'No')
  t.equal(ob2('fp'), 'FP')
  t.end()
})
test('createObj', (t) => {
  t.deepEqual(createObj('foo', 'bar'), { foo: 'bar' })
  t.end()
})
test('invokeArg', (t) => {
  invokeArg(t.end)
})
test('invokeNthArg', (t) => {
  invokeNthArg(1)(null, t.end)
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
test('handleChanges', (t) => {
  t.plan(7)
  t.ok(isFunction(handleChanges), 'isFunc')
  let val = null
  let expecting = false
  function getValue() { return val }
  function onChange(newVal) {
    if (expecting) { t.equal(newVal, expecting) } else { t.fail('unexpected change') }
    return true
  }
  const checker = handleChanges(getValue, onChange)
  t.false(checker())
  val = expecting = 'kai'
  t.true(checker())
  t.false(checker())
  val = expecting = 'iak'
  t.true(checker())
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
test('transformProp', (t) => {
  t.equal(transformProp(isFunction, 'foo')({ foo: noop }), true, 'isFunc')
  t.equal(transformProp(min)('foo')({ foo: [ 4, 2, 8, 6 ] }), 2, 'min')
  t.end()
})
test('transformPropOf', (t) => {
  t.equal(transformPropOf(isFunction, { foo: noop })('foo'), true, 'isFunc')
  t.equal(transformPropOf(min)({ foo: [ 4, 2, 8, 6 ] })('foo'), 2, 'min')
  t.end()
})
test('hasMethodAt', (t) => {
  t.equal(hasMethodAt('foo')({ foo: noop }), true, 'basic t')
  t.equal(hasMethodAt('bar')({ foo: noop }), false, 'basic f')
  t.end()
})
test('hasMethodOf', (t) => {
  t.equal(hasMethodOf({ foo: noop })('foo'), true, 'basic t')
  t.equal(hasMethodOf({ foo: noop })('bar'), false, 'basic f')
  t.end()
})
test('copy', (t) => {
  const target = { foo: 'bar' }
  const source = { cats: 'dogs', fish: null }
  const res = copy('cats', 'usb.dongle', source, target)
  t.equal(res, target)
  const expected = { foo: 'bar', usb: { dongle: 'dogs' } }
  t.deepEqual(res, expected)
  t.deepEqual(target, expected)
  copy('bat', 'ball', source, target)
  t.false(Object.hasOwnProperty.call(target, 'ball'))
  copy('fish', 'fishs', source, target)
  t.equal(target.fishs, null)
  t.end()
})
test('move', (t) => {
  const obj = { one: 'a' }
  const res = move('one', 'two', obj)
  t.equal(res, obj)
  t.deepEqual(res, { two: 'a' })
  t.end()
})
test('oneOf', (t) => {
  const validOptions = oneOf([ 'a', 'b' ])
  t.true(validOptions('a'))
  t.true(validOptions('b'))
  t.false(validOptions('c'))
  t.end()
})
test('rename', (t) => {
  const obj = { one: 'a', two: 'b' }
  const res = rename({ one: 'three', two: 'four' }, obj)
  t.equal(res, obj)
  t.deepEqual(res, { three: 'a', four: 'b' })
  t.end()
})
test('renamePick', (t) => {
  t.deepEqual(renamePick({ foo: 'bar' }, { foo: 'cats' }), { bar: 'cats' })
  const renameObj = {
    'apple.fest': 'is.great',
    'foo.bar': 'apple',
    zest: 'drops',
  }
  const source = {
    apple: { fest: 'fall' },
    foo: { bar: 'boats' },
    zest: 'sailing',
  }
  const res = {
    is: { great: 'fall' },
    apple: 'boats',
    drops: 'sailing',
  }
  t.deepEqual(renamePick(renameObj, source), res)
  t.end()
})
