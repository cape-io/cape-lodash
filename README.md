# cape-lodash v1.7.0

A few `lodash/fp` inspired utility functions.

Please view source for explanation and tests for usage.
- `branch` - function version of `bool ? trueVal : falseVal`
- `fbBranch` - Curried (trueVal, falseVal, bool).
- `condId` - each arg should be an array pair. `[ stubTrue, identity ]` is added as last option.
- `overBranch(boolCheck, getTrue, getFalse)`
- `createObj(key, value)` - curried. creates a new object with one key/val.
- `invokeArg` invokes the first argument as a function.
- `invokeNthArg` invokes the function at index.
- `isFalse()` - Returns true if sent a value that is exactly false.
- `isTrue()` - Returns true if sent a value that is exactly true.
- `firstValArg(0, '', 'foo')` - Find the first truthy argument value.
- `toBool({})` - Turn empty objects and arrays to false. Turn other values into a boolean.
- `changeChecker(initValue)` - Returns function that accepts new val and return true if changed.
- `function handleChanges(getValue, onChange)` - Give it a getter and an onChange callback. It will return a function. Call returned function on every change and it will conditionally calling onChange when it finds a change.
- `getDefault('path.one', 'second.path')` - Given two paths, select the first one that is defined.
- `oneOf([ 'array', 'of', 'options' ])` - Returns func that will return true if array contains argument.
- `transformProp(transformer, path)` - curried. Creates a function that returns transformation of object property at path.
- `transformPropOf(transformer, object)` - curried. Same as `transformProp` but swap place of object/path.
- `hasMethodAt(path)(object)` Returns function that evaluates if passed object has a function at path.
- `hasMethodOf(object)(path)` Same as `hasMethodAt` with object/path flip.
- `copy(getKey, setKey, source, target)` - Value of getKey within source is added to target at setKey unless it is undefined.
- `move(getKey, setKey, object)` Place value of getKey path within object to setKey path.
- `rename(renameObj, source)` - renameObj = { getKey: 'setKey' }
- `renamePick(renameObj, source)` - Like rename but creates a new objected limited to values of renameObj.
