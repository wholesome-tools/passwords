# Wholesome Password Generator

This package is an experimental javascript password generator.

Example usage:

```js
import { PasswordGenerator } from "@wholesome/passwords";

const options = {
  minLowercase: 1,
  minUppercase: 1,
  minNumber: 1,
  minSymbols: 1,
  chunkSize: 3,
  length: 12
};

const password = PasswordGenerator.generate(options);
// Example output: r*C-3SO-IDE-PkT
```

## Options

* `minLowercase`: The minimum amount of lowercase characters, such as `a`, to include in the password. Use `0` for none.
* `minUppercase`: The minimum amount of uppercase characters, such as `A`, to include in the password. Use `0` for none.
* `minNumber`: The minimum amount of number characters, such as `1`, to include in the password. Use `0` for none.
* `minSymbols`: The minimum amount of special characters, such as `@`, to include in the password. Use `0` for none.
* `chunkSize`: The size of each hyphen-separated chunk in the password. For example, a chunk size of 3 and a password length of 12 will produce a password like: `r*C-3SO-IDE-PkT`
* `length`: The length of the password, excluding hyphens that are included in chunks.
