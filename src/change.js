import { eq } from 'lodash'

// Give it an initial value. Returns function that will be true when value changed.
export function changeChecker(initValue) {
  let currentValue = initValue
  return (nextValue) => {
    const previousValue = currentValue
    currentValue = nextValue
    return !eq(previousValue, currentValue)
  }
}
// Give it a getter func and an onChange callback. It will return a function.
// Call returned func on every change and it will conditionally calling onChange.
export function handleChanges(getValue, onChange) {
  const valueChanged = changeChecker(getValue())
  return () => {
    const val = getValue()
    return valueChanged(val) && onChange(val)
  }
}
