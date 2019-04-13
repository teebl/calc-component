
			  //while there is an operator token o2, at the top of the operator stack and either
			  while (opStack.peek() && (opStack.peek().type === "Operator") 
				//o1 is left-associative and its precedence is less than or equal to that of o2, or
				&& ((v.associativity() === "left" && v.precedence() <= opStack.peek().precedence())
					//o1 is right associative, and has precedence less than that of o2,
					|| (v.associativity() === "right" && v.precedence() < opStack.peek().precedence()))) {
			  	outQueue.push(opStack.pop());
	