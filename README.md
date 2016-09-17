# cape-lodash v1.1.1

A few `lodash/fp` inspired utility functions.

Please view source for explanation and tests for usage.

- `condId` - array. [ stubTrue, identity ]
- `createObj(key, value)` - curried. creates a new object with one key/val.
- `isFalse()` - Returns true if sent a value that is exactly false.
- `isTrue()` - Returns true if sent a value that is exactly true.
- `firstValArg(0, '', 'foo')` - Find the first truthy argument value.
- `toBool({})` - Turn empty objects and arrays to false. Turn other values into a boolean.
- `changeChecker(initValue)` - Returns func that accepts new val and return true if changed.
- `function handleChanges(getValue, onChange)` - Give it a getter and an onChange callback. It will return a function. Call returned function on every change and it will conditionally calling onChange when it finds a change.
- `getDefault('path.one', 'second.path')` - Given two paths, select the first one that is defined.
