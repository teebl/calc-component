//Tokenizer parses the mathematical string from the calculator and returns an array of tokens
//Tokens will have a type and value
import * as CONST from "./constants.js";
import { checkFunctionMatch } from "./helpers.js";
function Token(type, value, arity) {
	this.type = type;
	this.value = value;
	this.arity = arity;
}

Token.prototype.precedence = function() {
	return CONST.PREC[this.value];
};

Token.prototype.associativity = function() {
	return CONST.ASSOC[this.value];
};

function tokenizer(string) {
	var result = [];
	var charBuffer = "";

	const newString = string.replace(/\s+/g, "").split("");

	newString.forEach((char, idx) => {
		const type = charType(char);

		switch (type) {
			case "Literal":
				addLiteralToBuffer(char);
				break;
			case "Letter":
				addLetterToBuffer(char);
				break;
			case "Operator":
				checkoutBuffer();
				result.push(new Token("Operator", char, 2));
				break;
			case "LeftParenthesis":
				checkoutBuffer();
				result.push(new Token("LeftParenthesis", char));
				break;
			case "RightParenthesis":
				checkoutBuffer();
				result.push(new Token("RightParenthesis", char));
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
		} else if (stringType(charBuffer) === "Literal") {
			charBuffer += char;
			return;
		} else {
			checkoutBuffer();
			charBuffer += char;
			return;
		}
	}

	function addLetterToBuffer(char) {
		if (!charBuffer || stringType(charBuffer) === "Letters") {
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
			case "Literal":
				result.push(new Token("Literal", charBuffer, 0));
				break;
			case "Letters":
				const tempBufferArray = charBuffer.split("");
				for (let c of tempBufferArray) {
					result.push(new Token("Letter", c, 0));
				}
				break;
			case "Function":
				const arity = CONST.FUNC.filter(f => f.type === charBuffer)[0].arity;
				result.push(new Token("Function", charBuffer, arity));
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
		return "Function";
	} else if (/[-+]?[0-9]+\.*[0-9]*/.test(string)) {
		return "Literal";
	} else if (/[a-z]|[A-Z]/.test(string)) {
		return "Letters";
	} else return null;
}

function charType(char) {
	if (/[0-9]/.test(char)) {
		return "Literal";
	} else if (char === ".") {
		return "Literal";
	} else if (/[a-z]/.test(char)) {
		return "Letter";
	} else if (/\+|\-|\/|\*|\^/.test(char)) {
		return "Operator";
	} else if (char === "(") {
		return "LeftParenthesis";
	} else if (char === ")") {
		return "RightParenthesis";
	}
}

export default tokenizer;
