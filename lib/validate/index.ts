import _ from 'ramda';
import Checker from './check';
import { Expect } from './check';

class InputError extends Error {
  error: string;
  field: string;
  status: number;

  constructor(field: string, type: string, message: string) {
    super(message);
    this.error = type;
    this.field = field;
    this.status = 422;
  }
}

class RequiredError extends InputError {
  constructor(field: string) {
    super(field, 'RequiredError', `${field} is required`);
  }
}

class TypeError extends InputError {
  constructor(field: string) {
    super(field, 'TypeError', `type not matched: ${field}`);
  }
}

class PatternError extends InputError {
  constructor(field: string) {
    super(field, 'PatternError', `pattern not matched: ${field}`);
  }
}

export interface ExpectObject {
  [key: string]: Expect;
}
export interface Input {
  [key: string]: any;
}
export default function (rawInput: Input, expect: ExpectObject) {
  // make it pure
  const input = _.clone(rawInput);

  Object.keys(expect).forEach((key) => {
    if (expect[key] === undefined) {
      delete input[key]; // remove unexpected key/vals.
      return;
    }

    // if this key is required but not in input.
    if (!Checker.required(input[key], expect[key]).is) {
      throw new RequiredError(key);
    }

    // if this key has default value
    const defaultVal = Checker.default(input[key], expect[key]).val;

    // only set default value when it is not undefined
    // avoid side effect of undefined default value
    if (defaultVal !== undefined) {
      input[key] = defaultVal;
    }

    if (input[key] === undefined) return;

    if (!Checker.pattern(input[key], expect[key]).is) {
      throw new PatternError(key);
    }

    const { is, val } = Checker.checkType(input[key], expect[key]);

    if (!is) throw new TypeError(key);

    input[key] = val;
  });
  return input;
}
