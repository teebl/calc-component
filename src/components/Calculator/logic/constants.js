export const ASSOC = {
	"^": "right",
	"*": "left",
	"/": "left",
	"+": "left",
	"-": "left"
};

export const PREC = {
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
export const FUNC = [
	{ type: "sin", arity: 1, action: x => Math.sin(x) },
	{ type: "cos", arity: 1, action: x => Math.cos(x) },
	{ type: "tan", arity: 1, action: x => Math.tan(x) },
	{ type: "abs", arity: 1, action: x => Math.abs(x) },
	{ type: "round", arity: 1, action: x => Math.round(x) },
	{ type: "log", arity: 1, action: x => Math.log(x) },
	{ type: "sqrt", arity: 1, action: x => Math.sqrt(x) }
];
