import { PasswordGenerator } from "./src/passwords";

console.log(PasswordGenerator.generate({
  minLowercase: 0,
  minUppercase: 0,
  minNumber: 0,
  minSymbols: 0,
  chunkSize: 2,
  length: 6
}));
