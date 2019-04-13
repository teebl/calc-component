import * as CONST from "./constants";

Array.prototype.peek = function() {
	return this.slice(-1)[0];
};

export function checkFunctionMatch(string) {
	const constants = CONST.FUNC;
	//returns function name if found, else null
	if (CONST.FUNC.find(func => func.type === string)) {
		return string;
	} else {
		return null;
	}
}
