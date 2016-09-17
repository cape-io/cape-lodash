import test from 'tape'
import { constant, isFunction, property } from 'lodash'

import {
  boolSelector, createObj, changeChecker, isFalse, toBool, getDefault, getProps, getSelect,
  select, simpleSelector, firstValArg,
} from '../src'
import { change, collection, state, props, state2 } from './mock'

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
  t.ok(isFunction(isFalse), 'isFunc')
  t.equal(firstValArg(1, 0, 2), 1, 'arg0')
  t.equal(firstValArg(0, 0, 2), 2, 'arg2')
  t.equal(firstValArg(undefined, null, '', 'hot'), 'hot', 'arg3')
  t.end()
})

test('toBool', (t) => {
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

const getSocket = property('socket')
const getSessionId = select(getSocket, 'sessionId')
const getPresenter = select(getSocket, 'presenter')

test('boolSelector', (t) => {
  const bSel = boolSelector(getSessionId)
  t.equal(bSel(state), false, 'null')
  t.equal(bSel(state2), true, 'string')
  t.end()
})

test('changeChecker', (t) => {
  const hasChange = changeChecker()
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

test('getDefault', (t) => {
  t.equal(getDefault('item.id', 'title')(props), 'bar', 'item.id')
  t.equal(getDefault('item.nothing', 'title')(props), 'strawberry', 'title')
  t.end()
})

test('getProps', (t) => {
  t.equal(getProps(state, props, 1), props, 'props')
  t.end()
})
test('getSelect', (t) => {
  t.equal(getSelect(constant(collection), constant('a2'))(), collection.a2)
  t.end()
})

test('select()', (t) => {
  const getUser = property('user')
  t.equal(getUser(state), state.user, 'getUser')
  const getName = select(getUser, 'name')
  t.equal(getName(state), 'foo', 'getName')
  const getGender = select(getUser, 'gender', 'uni')
  t.equal(getGender(state), 'bar', 'gender')
  const stateNoGen = state.without([ 'user', 'gender' ])
  t.equal(getGender(stateNoGen), 'uni', 'getGender missing, use default.')
  t.end()
})

test('simpleSelector', (t) => {
  function checkAnswer(arg1, arg2, arg3) {
    t.equal(arg1, change.sessionId, 'arg1')
    t.equal(arg2, change.presenter, 'arg2')
    t.end(arg3)
  }
  simpleSelector(getSessionId, getPresenter, checkAnswer)(state2)
})
