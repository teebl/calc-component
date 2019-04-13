import * as CONSTANTS from "./constants.js";

export default function evaluate(parentNode) {
  return walkTree(parentNode);
}

function walkTree(node) {
  if (!node) {
    return;
  }
  switch (node.type) {
    case CONSTANTS.TOKEN_TYPES.OPERATOR:
      if (node.children) {
        return operatorAction(node.token, node.children);
      } else {
        return null;
      }
    case CONSTANTS.TOKEN_TYPES.FUNCTION:
      return functionAction(node.token, node.children);
    case CONSTANTS.TOKEN_TYPES.LITERAL:
      return node.token;
    default:
      return null;
  }
}

function operatorAction(operator, operands) {
  const op1 = parseInt(walkTree(operands[0]));
  const op2 = parseInt(walkTree(operands[1]));
  switch (operator) {
    case CONSTANTS.OPERATORS.ADDITION:
      return op1 + op2;
    case CONSTANTS.OPERATORS.SUBTRACTION:
      return op2 - op1;
    case CONSTANTS.OPERATORS.MULTIPLICATION:
      return op1 * op2;
    case CONSTANTS.OPERATORS.DIVISION:
      return op1 / op2;
    case CONSTANTS.OPERATORS.EXPONENTIATION:
      return op1 ** op2;
    default:
      return null;
  }
}

function functionAction(func, children) {
  const mathFunction = CONSTANTS.FUNCTIONS.filter(f => f.type === func)[0];
  return mathFunction.action(...children.map(c => walkTree(c)));
}
