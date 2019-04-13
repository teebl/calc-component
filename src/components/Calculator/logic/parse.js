//Parse converts the tokens from infix notation to an Abstract Syntax Tree
import tokenizer from "./tokenizer.js";
import "./helpers.js";

function parse(tkArray) {
	var output = [];
	var opStack = [];
	for (let t of tkArray) {
		switch (t.type) {
			case "Literal" || "Letter":
				output.push(new ASTNode(t));
				break;
			case "Operator":
				while (
					opStack.peek() &&
					opStack.peek().type === "Operator" &&
					//current token is left-associative and its precedence is less than or equal to that of top of opstack, or
					((t.associativity() === "left" &&
						t.precedence() <= opStack.peek().precedence()) ||
						//current token is right associative, and has precedence less than that of top of opStack,
						(t.associativity() === "right" &&
							t.precedence() < opStack.peek().precedence()))
				) {
					output.addNode(opStack.pop());
				}
				opStack.push(t);
				break;
			case "Function":
				opStack.push(t);
				break;
			case "LeftParenthesis":
				opStack.push(t);
				break;
			case "RightParenthesis":
				//pop operators from stack to output until left parenthesis is found
				while (opStack.peek() && opStack.peek().type !== "LeftParenthesis") {
					output.addNode(opStack.pop());
				}
				//pop the left parenthesis, but do not add to output
				opStack.pop();
				//if there is a function, add to the output
				if (opStack.peek() && opStack.peek().type === "Function") {
					output.addNode(opStack.pop());
				}
				break;
			default:
				alert(`Error, unrecognized token: ${t.value}`);
				break;
		}
	}

	while (opStack.peek()) {
		output.addNode(opStack.pop());
	}
	return output.pop();
}

function ASTNode(token, children) {
	this.token = token.value;
	this.type = token.type;
	this.children = children;
	// this.leftChildNode = leftChildNode;
	// this.rightChildNode = rightChildNode;
}

Array.prototype.addNode = function(token) {
	var children = [];
	for (var i = 0; i < token.arity; i++) {
		children[i] = this.pop();
	}
	// var rightChildNode = this.pop();
	// var leftChildNode = this.pop();
	this.push(new ASTNode(token, children));
};

export default parse;
