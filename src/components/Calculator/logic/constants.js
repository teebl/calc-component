export const ASSOCIATION_DIRECTION = {
  LEFT: "left",
  RIGHT: "right"
};

export const ASSOCIATION = {
  "^": ASSOCIATION_DIRECTION.RIGHT,
  "*": ASSOCIATION_DIRECTION.LEFT,
  "/": ASSOCIATION_DIRECTION.LEFT,
  "+": ASSOCIATION_DIRECTION.LEFT,
  "-": ASSOCIATION_DIRECTION.LEFT
};

export const PRECEDENCE = {
  "^": 4,
  "*": 3,
  "/": 3,
  "+": 2,
  "-": 2
};

export const KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  "(",
  ")"
];
export const FUNCTIONS = [
  { type: "sin", arity: 1, action: x => Math.sin(x) },
  { type: "cos", arity: 1, action: x => Math.cos(x) },
  { type: "tan", arity: 1, action: x => Math.tan(x) },
  { type: "abs", arity: 1, action: x => Math.abs(x) },
  { type: "round", arity: 1, action: x => Math.round(x) },
  { type: "log", arity: 1, action: x => Math.log(x) },
  { type: "sqrt", arity: 1, action: x => Math.sqrt(x) }
];

export const OPERATORS = {
  ADDITION: "+",
  SUBTRACTION: "-",
  DIVISION: "/",
  MULTIPLICATION: "*",
  EXPONENTIATION: "^"
};

export const TOKEN_TYPES = {
  LITERAL: "literal",
  LETTER: "letter",
  OPERATOR: "operator",
  FUNCTION: "function",
  LEFT_PARENTH: "leftParenthesis",
  RIGHT_PARENTH: "rightParenthesis"
};
