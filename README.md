# cape-lodash v1.0.0

A few `lodash/fp` inspired utility functions.

Please view source for explanation and tests for usage.

- `createObj(key, value)` - curried. creates a new object with one key/val.
- `isFalse()` - Returns true if sent a value that is exactly false.
- `isTrue()` - Returns true if sent a value that is exactly true.
- `firstValArg(0, '', 'foo')` - Find the first truthy argument value.
- `toBool({})` - Turn empty objects and arrays to false. Turn other values into a boolean.
- `changeChecker(initValue)` - Returns func that accepts new val and return true if changed.
- `getDefault('path.one', 'second.path')` - Given two paths, select the first one that is defined.
