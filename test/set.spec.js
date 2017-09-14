import test from 'tape'
import { has, isFunction, method } from 'lodash'
import { multiply } from 'lodash/fp'
import {
  replaceField, set, setField, setFieldHas, setKey, setKeyVal, setSimple, setVal, transformProp,
} from '../src'
import { collection } from './mock'

test('setSimple', (t) => {
  const obj = { foo: 'cat' }
  const obj2 = setSimple(obj, 'bar', 'dog')
  t.false(obj2 === obj)
  t.equal(obj2.foo, 'cat')
  t.equal(obj2.bar, 'dog')
  t.end()
})
test('set', (t) => {
  const updateTitle = set(collection)
  const res1 = updateTitle(['a1', 'title'], 'apples')
  t.false(collection === res1)
  t.false(collection.a1 === res1.a1, 'a1')
  // console.log(res1)
  t.equal(res1.a1.title, 'apples', 'title')
  t.equal(collection.a1.creator, res1.a1.creator, 'a1 creator')
  t.equal(collection.a2, res1.a2, 'a2')
  t.equal(collection.a3, res1.a3, 'a3')
  const res2 = set(collection, ['a3', 'creator', 'anon', 'name'], 'drone')
  t.equal(collection.a1.creator.anon, res2.a1.creator.anon)
  t.equal(res2.a3.creator.anon.name, 'drone')
  const res3 = set({}, 'foo.bar.song', 'valueThingy')
  t.equal(res3.foo.bar.song, 'valueThingy', 'set in empty obj')
  t.end()
})
test('setKey', (t) => {
  const setFoo = setKey('foo')
  t.ok(isFunction(setFoo), 'isFunction')
  const obj = { foo: 'cat' }
  const obj2 = setFoo(obj, 'dog')
  t.false(obj === obj2, 'not the same obj')
  // console.log(obj2)
  t.equal(obj2.foo, 'dog')
  const obj3 = setKey('bar', obj2, 'ice')
  t.false(obj3 === obj2)
  t.deepEqual(obj3, { foo: 'dog', bar: 'ice' })
  t.end()
})
test('setKeyVal', (t) => {
  const func = setKeyVal('kai', 'isNerd')
  t.ok(isFunction(func))
  t.equal(func({}).kai, 'isNerd')
  t.end()
})
test('setField', (t) => {
  const func = setField('galleryHours', transformProp(method('join', ', '), 'galleryHours'))
  const item = { galleryHours: ['foo', 'bar'] }
  const res = func(item)
  t.false(item === res)
  t.equal(res.galleryHours, 'foo, bar')
  t.end()
})
test('setFieldHas', (t) => {
  const func = setFieldHas('galleryHours', transformProp(method('join', ', '), 'galleryHours'))
  const item = { galleryHours: ['foo', 'bar'] }
  const res = func(item)
  t.false(item === res, 'should not be same')
  t.equal(res.galleryHours, 'foo, bar', 'galleryHours set correctly')
  const item2 = { id: 'foo' }
  const res2 = func(item2)
  t.ok(item2 === res2)
  t.false(has(item2.galleryHours))
  t.end()
})
test('replaceField', (t) => {
  const func = replaceField('profit', multiply(2))
  const cat = { name: 'spike' }
  const item = { cat, profit: 2 }
  const res = func(item)
  t.equal(res.cat, cat)
  t.equal(res.profit, 4)
  const func2 = replaceField('profits', multiply(20))
  t.equal(func2(item), item)
  t.end()
})
test('setVal', (t) => {
  const res1 = setVal('value', {}, 'key')
  t.deepEqual(res1, { key: 'value' })
  const func = setVal('is the best')
  t.ok(isFunction(func))
  const res = func({}, 'kai')
  t.equal(res.kai, 'is the best')
  t.end()
})
