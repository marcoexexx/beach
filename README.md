# Beach 🏖️🦀
## Beach - Result Library for TypeScript

This TypeScript library provides a `Result` type, inspired by Rust's Result type, for handling operations that may succeed or fail.

### Features

- **Result Type:** The library introduces a `Result` type with two variants: `Ok` for successful results and `Err` for errors.

- **Mapping Operations:** Easily transform the value inside a `Result` using `map`, `map_or`, and `map_or_else` functions.

- **Chaining Results:** Chain operations using `and`, `and_then`, `or`, and `or_else` to handle different outcomes in a concise manner.

- **Error Handling:** Utilize functions like `expect`, `expect_err`, `unwrap`, `unwrap_or`, and `unwrap_err` for controlled error handling.

### Usage Example

```typescript
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err('Division by zero');
  } else {
    return ok(a / b);
  }
}

const result = divide(10, 2);

const finalValue = result
  .map(value => value * 2)
  .unwrap_or_else(errMsg => console.error(`Error: ${errMsg}`));

console.log(finalValue);
```

### Contribution

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

### License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
