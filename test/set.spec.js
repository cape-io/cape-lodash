import test from 'tape'
import { has, isFunction, method } from 'lodash'
import { setField, setFieldHas, setKey, setIn, transformProp } from '../src'
import { collection } from './mock'

test('setKey', (t) => {
  const setFoo = setKey('foo')
  t.ok(isFunction(setFoo), 'isFunction')
  const obj = { foo: 'cat' }
  const obj2 = setFoo(obj, 'dog')
  t.false(obj === obj2, 'not the same obj')
  t.equal(obj2.foo, 'dog')
  const obj3 = setKey('bar', obj2, 'ice')
  t.false(obj3 === obj2)
  t.deepEqual(obj3, { foo: 'dog', bar: 'ice' })
  t.end()
})
test('setIn', (t) => {
  const updateTitle = setIn(['a1', 'title'])
  const res1 = updateTitle(collection, 'apples')
  t.false(collection === res1)
  t.false(collection.a1 === res1.a1, 'a1')
  t.equal(res1.a1.title, 'apples', 'title')
  t.equal(collection.a1.creator, res1.a1.creator, 'a1 creator')
  t.equal(collection.a2, res1.a2, 'a2')
  t.equal(collection.a3, res1.a3, 'a3')
  const res2 = setIn(['a3', 'creator', 'anon', 'name'], collection, 'drone')
  t.equal(collection.a1.creator.anon, res2.a1.creator.anon)
  t.equal(res2.a3.creator.anon.name, 'drone')
  const res3 = setIn(['foo', 'bar', 'song'], {}, 'valueThingy')
  t.equal(res3.foo.bar.song, 'valueThingy', 'set in empty obj')
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
