import test from 'tape'
import { createIndex, propertyOfOr, renameValues } from '../src/dots'

test('createIndex', (t) => {
  const data = [
    { id: 'foo', value: 'sample' },
    { id: 'bar', value: 'testing' },
  ]
  const getIndex = createIndex('id', 'value')
  t.deepEqual(getIndex(data), { foo: 'sample', bar: 'testing' })
  t.end()
})

test('propertyOfOr', (t) => {
  const rename = propertyOfOr({ gallerynameid: 'name' })
  t.equal(rename('foo'), 'foo')
  t.equal(rename('gallerynameid'), 'name')
  t.end()
})

test('renameValues', (t) => {
  const values = ['gallerynameid', 'offCampus']
  const rename = { gallerynameid: 'name' }
  t.deepEqual(renameValues(rename)(values), ['name', 'offCampus'])
  t.end()
})
