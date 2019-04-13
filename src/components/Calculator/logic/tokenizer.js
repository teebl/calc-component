//Tokenizer parses the mathematical string from the calculator and returns an array of tokens
//Tokens will have a type and value
import * as CONSTANTS from "./constants.js";
import { checkFunctionMatch } from "./helpers.js";

function Token(type, value, arity) {
  this.type = type;
  this.value = value;
  this.arity = arity;
}

Token.prototype.precedence = function() {
  return CONSTANTS.PRECEDENCE[this.value];
};

Token.prototype.associativity = function() {
  return CONSTANTS.ASSOCIATION[this.value];
};

function tokenizer(string) {
  var result = [];
  var charBuffer = "";

  const newString = string.replace(/\s+/g, "").split("");

  newString.forEach((char, idx) => {
    const type = charType(char);

    switch (type) {
      case CONSTANTS.TOKEN_TYPES.LITERAL:
        addLiteralToBuffer(char);
        break;
      case CONSTANTS.TOKEN_TYPES.LETTER:
        addLetterToBuffer(char);
        break;
      case CONSTANTS.TOKEN_TYPES.OPERATOR:
        checkoutBuffer();
        result.push(new Token(CONSTANTS.TOKEN_TYPES.OPERATOR, char, 2));
        break;
      case CONSTANTS.TOKEN_TYPES.LEFT_PARENTH:
        checkoutBuffer();
        result.push(new Token(CONSTANTS.TOKEN_TYPES.LEFT_PARENTH, char));
        break;
      case CONSTANTS.TOKEN_TYPES.RIGHT_PARENTH:
        checkoutBuffer();
        result.push(new Token(CONSTANTS.TOKEN_TYPES.RIGHT_PARENTH, char));
        break;
      default:
        alert(`Unrecognized input: "${char}"`);
        break;
    }
  });

  checkoutBuffer();
  return result;
  function addLiteralToBuffer(char) {
    if (!charBuffer) {
      charBuffer += char;
      return;
    } else if (stringType(charBuffer) === CONSTANTS.TOKEN_TYPES.LITERAL) {
      charBuffer += char;
      return;
    } else {
      checkoutBuffer();
      charBuffer += char;
      return;
    }
  }

  function addLetterToBuffer(char) {
    if (
      !charBuffer ||
      stringType(charBuffer) === CONSTANTS.TOKEN_TYPES.LETTER
    ) {
      charBuffer += char;
    } else {
      checkoutBuffer();
      charBuffer += char;
    }
  }

  function checkoutBuffer() {
    if (!charBuffer) {
      return;
    }
    switch (stringType(charBuffer)) {
      case CONSTANTS.TOKEN_TYPES.LITERAL:
        result.push(new Token(CONSTANTS.TOKEN_TYPES.LITERAL, charBuffer, 0));
        break;
      case CONSTANTS.TOKEN_TYPES.LETTER:
        const tempBufferArray = charBuffer.split("");
        for (let c of tempBufferArray) {
          result.push(new Token(CONSTANTS.TOKEN_TYPES.LETTER, c, 0));
        }
        break;
      case CONSTANTS.TOKEN_TYPES.FUNCTION:
        const arity = CONSTANTS.FUNCTIONS.filter(f => f.type === charBuffer)[0]
          .arity;
        result.push(
          new Token(CONSTANTS.TOKEN_TYPES.FUNCTION, charBuffer, arity)
        );
        break;
      default:
        alert(
          `the buffer '${charBuffer}' is causing general panic in checkoutBuffer()`
        );
        break;
    }
    //checkoutBuffer() is expected to always leave an empty buffer
    charBuffer = "";
    return;
  }
}

function stringType(string) {
  if (checkFunctionMatch(string)) {
    return CONSTANTS.TOKEN_TYPES.FUNCTION;
  } else if (/[-+]?[0-9]+\.*[0-9]*/.test(string)) {
    return CONSTANTS.TOKEN_TYPES.LITERAL;
  } else if (/[a-z]|[A-Z]/.test(string)) {
    return CONSTANTS.TOKEN_TYPES.LETTER;
  } else return null;
}

function charType(char) {
  if (/[0-9]/.test(char)) {
    return CONSTANTS.TOKEN_TYPES.LITERAL;
  } else if (char === ".") {
    return CONSTANTS.TOKEN_TYPES.LITERAL;
  } else if (/[a-z]/.test(char)) {
    return CONSTANTS.TOKEN_TYPES.LETTER;
  } else if (/\+|\-|\/|\*|\^/.test(char)) {
    return CONSTANTS.TOKEN_TYPES.OPERATOR;
  } else if (char === "(") {
    return CONSTANTS.TOKEN_TYPES.LEFT_PARENTH;
  } else if (char === ")") {
    return CONSTANTS.TOKEN_TYPES.RIGHT_PARENTH;
  }
}

export default tokenizer;
