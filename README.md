# cape-lodash v2.2.0

A few [lodash](https://lodash.com/docs) inspired utility functions. For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

Install [ESLint rules for lodash/fp](https://github.com/jfmengels/eslint-plugin-lodash-fp) by extending eslint with `plugin:lodash-fp/recommended` and including the `lodash-fp` plugin.

## Bool

- `isFalse()` - Returns true if sent a value that is exactly `false`.
- `isTrue()` - Returns true if sent a value that is exactly `true`.
- `hasSize()` - Opposite of `isEmpty`.
- `parseBoolean()` - Takes a string and returns false unless word is in word list webmasterkai/affirmative
- `toBool({})` - Turn empty objects and arrays to false. Sends strings to `parseBoolean`. Coerce other values into a boolean.

## Changes

- `changeChecker(initValue)` - Returns function that accepts new val and return true if changed.
- `handleChanges(getValue, onChange)` - Give it a getter and an onChange callback. It will return a function. Call returned function on every possible change and it will conditionally call onChange when it finds a change.

## Cond

- `branch(bool, trueVal, falseVal)` Ternary (`bool ? trueVal : falseVal`) in function form.
- `fpBranch(trueVal, falseVal, boolVal)` Same as above with arguments order changed and `curry` applied.
- `condId` - Each arg should be an array pair. Applied to `_.cond` with `[ stubTrue, identity ]` added as last option.
- `overBranch(boolCheck, getTrue, getFalse)`

## Dots

- `copy(getKey, setKey, source, target)` - Value of getKey within source is added to target at setKey unless it is undefined.
- `move(getKey, setKey, object)` Place value of getKey path within object to setKey path.
- `rename(renameObj, source)` - renameObj = { getKey: 'setKey' }
- `renamePick(renameObj, source)` - Like `rename` but creates a new objected limited to values of renameObj.
- `renameValues(renameObj)(strArray)` - renameObj = { find: 'replace' } Similar to `rename` but find/replace strings in array.
- `createIndex('id', 'value')(dataArray)` - Creates a key/value index from an array of items. It's like `_.indexBy` but uses the field value of `value` property instead of the entire item.

## Merge

- `merge(object, ...sources)`

## Set

When you want to edit a property and return a new object instead of mutating.

- `setSimple(state, key, value)` - `_fp.set` with normal argument order.
- `setKey(path, state, value)` - `set` but with different arg order.
- `setKeyVal(key, value, state)` - `set` but with different arg order.
- `setVal(value, state, key)`
- `setField(path, transformer)(item)` - The `transformer` function accepts item and should return the new value of `path`.
- `setFieldHas(path, transformer)(item)` - Only updates if item has path.
- `replaceField(path, transformer)(item)` - The `transformer` gets the value of path. Must return new value that will set to path.
- `setWith(fieldId, withId, transformer)` - The `transformer` gets the value of `withId`. Must return new value that will set to `fieldId`.

## Transform

- `transformProp(transformer, path)` - curried. Creates a function that returns transformation of object property at path.
- `transformPropOf(transformer, object)` - curried. Same as `transformProp` but swap place of object/path.
- `hasMethodAt(path)(object)` Returns function that evaluates if passed object has a function at path.
- `hasMethodOf(object)(path)` Same as `hasMethodAt` with object/path flip.


## Utils

Please view source for explanation and tests for usage.
- `createObj(key, value)` - curried. Creates a new object with one key/val.
- `invokeArg` invokes the first argument as a function.
- `invokeNthArg` invokes the function at index.
- `firstValArg(0, '', 'foo')` - Find the first truthy argument value.
- `getDefault('default.path', 'check.path.first')` - Select two paths, send to `_fp.defaultTo`. Default path first.
- `oneOf([ 'array', 'of', 'options' ])` - Returns func that will return true if array contains argument.
