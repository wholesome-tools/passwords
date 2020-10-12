"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passwords_1 = require("./src/passwords");
console.log(passwords_1.PasswordGenerator.generate({
    minLowercase: 0,
    minUppercase: 0,
    minNumber: 0,
    minSymbols: 0,
    chunkSize: 2,
    length: 6
}));
