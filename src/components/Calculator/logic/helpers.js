import * as CONSTANTS from "./constants";

// eslint-disable
Array.prototype.peek = function() {
  return this.slice(-1)[0];
};
// eslint-enable

export function checkFunctionMatch(string) {
  if (CONSTANTS.FUNCTIONS.find(func => func.type === string)) {
    return string;
  } else {
    return null;
  }
}
