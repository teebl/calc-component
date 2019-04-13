import tokenizer from "./tokenizer.js";
import parse from "./parse.js";
import evaluate from "./evaluate.js";

//The calculator receives input as a string, and before evaluating, creates an array of tokens
//the tokens are then distributed into an Abstract Syntax Tree for effective evaluation.

function logic(input) {
	//partitioned process into several variables for easier debugging
	const tokenArray = tokenizer(input);
	const tokenTree = parse(tokenArray);
	const result = evaluate(tokenTree);

	return result;
}

export default logic;
