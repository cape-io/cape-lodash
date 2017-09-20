import { constant, eq, isString, multiply, toUpper } from 'lodash/fp'
import test from 'tape'
import { branch, fpBranch, condId, overBranch } from '../src/cond'

test('branch', (t) => {
  t.equal(branch(true, 'a', 'b'), 'a')
  t.equal(branch(false, 'a', 'b'), 'b')
  t.end()
})
test('fpBranch', (t) => {
  const checker = fpBranch('a', 'b')
  t.equal(checker(true), 'a')
  t.equal(checker(false), 'b')
  t.end()
})

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
