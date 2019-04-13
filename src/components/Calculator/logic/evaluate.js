import * as CONST from "./constants.js";

export default function evaluate(parentNode) {
	return walkTree(parentNode);
}

function walkTree(node) {
	if (!node) {
		return;
	}
	switch (node.type) {
		case "Operator":
			if (node.children) {
				return operatorAction(node.token, node.children);
			} else {
				return null;
			}
		case "Function":
			return functionAction(node.token, node.children);
		case "Literal":
			return node.token;
	}
}

function operatorAction(operator, operands) {
	const op1 = parseInt(walkTree(operands[0]));
	const op2 = parseInt(walkTree(operands[1]));
	switch (operator) {
		case "+":
			return op1 + op2;
		case "-":
			return op2 - op1;
		case "*":
			return op1 * op2;
		case "/":
			return op1 / op2;
		case "^":
			return op1 ** op2;
	}
}

function functionAction(func, children) {
	//child nodes passed in array 'children'
	const mathFunction = CONST.FUNC.filter(f => f.type === func)[0];
	return mathFunction.action(...children.map(c => walkTree(c)));
}
