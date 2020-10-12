"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LOWER_SET = 'abcdefghijklmnopqrstuvwxyz';
var UPPER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var NUMBER_SET = '1234567890';
var SYMBOL_SET = '!@#$%*';
exports.DefaultPasswordOptions = {
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 1,
    chunkSize: 3,
    length: 15
};
var PasswordGenerator = /** @class */ (function () {
    function PasswordGenerator() {
    }
    PasswordGenerator.generate = function (options) {
        var chars = PasswordGenerator.generateChars(options);
        var randomized = PasswordGenerator.randomizeChars(chars, options);
        return PasswordGenerator.encodePassword(randomized, options);
    };
    PasswordGenerator.generateChars = function (options) {
        var chars = new Array(options.length);
        var workingIndex = 0;
        var sets = [
            [options.minLowercase, LOWER_SET],
            [options.minUppercase, UPPER_SET],
            [options.minNumber, NUMBER_SET],
            [options.minSymbols, SYMBOL_SET],
        ];
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var s = sets_1[_i];
            var num = s[0];
            var str = s[1];
            for (var i = 0; i < num; i++) {
                chars[workingIndex] = PasswordGenerator.randomInSet(str);
                workingIndex += 1;
            }
        }
        for (var i = workingIndex; i < options.length; i++) {
            chars[i] = PasswordGenerator.randomInSet(PasswordGenerator.getDefaultCharacterSet(options));
        }
        return chars;
    };
    PasswordGenerator.getDefaultCharacterSet = function (options) {
        var set = '';
        if (options.minLowercase) {
            set += LOWER_SET;
        }
        if (options.minUppercase) {
            set += UPPER_SET;
        }
        if (options.minNumber) {
            set += NUMBER_SET;
        }
        if (options.minSymbols) {
            set += SYMBOL_SET;
        }
        if (!set) {
            set = LOWER_SET;
        }
        return set;
    };
    // https://stackoverflow.com/a/2450976
    PasswordGenerator.randomizeChars = function (array, options) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(PasswordGenerator.secureRandom() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    PasswordGenerator.encodePassword = function (chars, options) {
        if (options.chunkSize <= 1) {
            return chars.join('');
        }
        var workingString = '';
        for (var i = 0; i < chars.length; i += options.chunkSize) {
            if (workingString !== '') {
                workingString += '-';
            }
            workingString += chars.slice(i, i + options.chunkSize).join('');
        }
        return workingString;
    };
    PasswordGenerator.randomInSet = function (set) {
        return set.charAt(Math.floor(PasswordGenerator.secureRandom() * set.length));
    };
    PasswordGenerator.secureRandom = function () {
        if (typeof window != "undefined") {
            return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
        }
        // Warning about random numbers
        if (!PasswordGenerator.warningIssued) {
            console.warn('A sufficiently secure source of random numbers could not be found');
            PasswordGenerator.warningIssued = true;
        }
        return Math.random();
    };
    PasswordGenerator.warningIssued = false;
    return PasswordGenerator;
}());
exports.PasswordGenerator = PasswordGenerator;
