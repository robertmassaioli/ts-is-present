# ts-is-present

The `ts-is-present` package provides common functions to let you filter out the null or undefined
values from arrays in your code AND end up with the types that you expect at the end.

## Explanation

When writing typescript there is often a situation where the result of a function is
`T | undefined` or `T | null`. If you have multiple of these, you may end up with a variable 
with a type that looks something like this:

``` typescript
const results: Array<T | undefined>;
```