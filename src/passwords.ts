const LOWER_SET = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBER_SET = '1234567890';
const SYMBOL_SET = '!@#$%*';

export interface PasswordOptions {
  minLowercase: number;
  minUppercase: number;
  minNumber: number;
  minSymbols: number;
  chunkSize: number;
  length: number;
}

export const DefaultPasswordOptions: PasswordOptions = {
  minLowercase: 1,
  minUppercase: 1,
  minNumber: 1,
  minSymbols: 1,
  chunkSize: 3,
  length: 15
}

export class PasswordGenerator {
  private static warningIssued = false;

  public static generate(options: PasswordOptions) {
    const chars = PasswordGenerator.generateChars(options);
    const randomized = PasswordGenerator.randomizeChars(chars, options);
    return PasswordGenerator.encodePassword(randomized, options);
  }

  private static generateChars(options: PasswordOptions) {
    const chars = new Array(options.length);
    let workingIndex = 0;
    
    const sets: [number, string][] = [
      [options.minLowercase, LOWER_SET],
      [options.minUppercase, UPPER_SET],
      [options.minNumber, NUMBER_SET],
      [options.minSymbols, SYMBOL_SET],
    ];

    for (let s of sets) {
      let num: number = s[0];
      let str: string = s[1];
      for (let i = 0; i < num; i++) {
        chars[workingIndex] = PasswordGenerator.randomInSet(str);
        workingIndex += 1;
      }
    }

    for (let i = workingIndex; i < options.length; i++) {
      chars[i] = PasswordGenerator.randomInSet(PasswordGenerator.getDefaultCharacterSet(options));
    }

    return chars;
  }

  private static getDefaultCharacterSet(options: PasswordOptions) {
    let set = '';
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
  }

  // https://stackoverflow.com/a/2450976
  private static randomizeChars(array: string[], options: PasswordOptions) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
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
  }

  private static encodePassword(chars: string[], options: PasswordOptions) {
    if (options.chunkSize <= 1) {
      return chars.join('');
    }

    let workingString = '';
    for (let i = 0; i < chars.length; i += options.chunkSize) {
      if (workingString !== '') {
        workingString += '-';
      }
      workingString += chars.slice(i, i + options.chunkSize).join('');
    }

    return workingString;
  }

  private static randomInSet(set: string) {
    return set.charAt(Math.floor(PasswordGenerator.secureRandom() * set.length));
  }

  private static secureRandom() {
    if (typeof window != "undefined") {
      return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
    }

    // Warning about random numbers
    if (!PasswordGenerator.warningIssued) {
      console.warn('A sufficiently secure source of random numbers could not be found');
      PasswordGenerator.warningIssued = true;
    }
    return Math.random();
  }
}
