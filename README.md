# cape-lodash v1.13.2

A few `lodash/fp` inspired utility functions.

## Bool

- `isFalse()` - Returns true if sent a value that is exactly false.
- `isTrue()` - Returns true if sent a value that is exactly true.
- `hasSize()` - Opposite of `isEmpty`.
- `toBool({})` - Turn empty objects and arrays to false. Coerce other values into a boolean.

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
- `renamePick(renameObj, source)` - Like rename but creates a new objected limited to values of renameObj.

## Merge

- `merge(object, ...sources)`

## Set

When you want to edit a property and return a new object instead of mutating.

- `setSimple(state, key, value)` - Spread object and set new property onto object. The only one that doesn't have `curry` applied to it.
- `set(state, path, value)` - Similar to `setSimple` but allows for string or array paths for nested objects.
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
- `getDefault('path.one', 'second.path')` - Given two paths, select the first one that is defined.
- `oneOf([ 'array', 'of', 'options' ])` - Returns func that will return true if array contains argument.
