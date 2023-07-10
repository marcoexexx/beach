# DebugLikePro-and-Rust

DebugLikePro-and-Rust is a TypeScript project that provides debugging functionalities inspired by the Rust programming language. It includes implementations of Result and Option types, as well as error handling with error enums. The project aims to enhance debugging capabilities by enabling more structured and expressive error handling.

## Installation

To use DebugLikePro-and-Rust in your TypeScript project, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/DebugLikePro-and-Rust.git
   ```

2. Install the dependencies:

   ```shell
   cd DebugLikePro-and-Rust
   npm install
   ```

## Usage

The project provides several features that you can utilize in your TypeScript code. Here's a brief overview of the main functionalities:

### Result Type

The Result type represents the outcome of an operation that can either succeed (`Ok`) or fail (`Err`). It allows for more structured error handling. To use the Result type:

1. Import the Result module:

   ```typescript
   import Result, { Ok, Err } from './result';
   ```

2. Use the Result type in your code:

   ```typescript
   function calculate(div: number): Result<number, string> {
     if (div === 0) return Err("not allowed");
     return Ok(12 / div);
   }
   ```

### Option Type

The Option type represents an optional value that can either contain a value (`Some`) or be empty (`None`). It provides a more expressive way to handle optional values. To use the Option type:

1. Import the Option module:

   ```typescript
   import { Option, Some, None } from './option';
   ```

2. Use the Option type in your code:

   ```typescript
   const name: Option<number> = Some(20);
   if (name.is_some()) {
     const unwrappedValue = name.unwrap();
     // Handle the unwrapped value
   }
   ```

### Error Enums

The project defines a custom error enum, `MyErrorEnum`, which includes predefined error variants such as "NotFound404" and "ServerError500". These enums can be used to handle specific types of errors in a more organized manner.

### Debugging Examples

The `main()` function in the provided code demonstrates the usage of the implemented functionality. It showcases the handling of Results and Options, printing the values, and handling different scenarios with error and success cases. Feel free to modify this function to suit your specific debugging needs.

```typescript
(async function main() {
  const data = calculate(0).is_ok();
  const name = Some(20).unwrap();

  console.log({ data, name });

  const ok_hello = (await promise(false)).unwrap();
  console.log({ ok_hello });

  const err_hello = (await promise(true)).unwrap();
  console.log({ err_hello });
})();
```

## Contributing

Contributions to DebugLikePro-and-Rust are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify it for your own purposes.
