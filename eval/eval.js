
function calculator(op, n1, n2) {
	ret = 0;
	switch(op){
		case TOKEN.OP_Add:
			ret = parseFloat(n1) + parseFloat(n2);
			break;
		case TOKEN.OP_Minus:
			ret = parseFloat(n1) - parseFloat(n2);
			break;
		case TOKEN.OP_Multi:
			ret = parseFloat(n1) * parseFloat(n2);
			break;
		case TOKEN.OP_Div:
			ret =  parseFloat(n1) / parseFloat(n2);
			break;
	}
	return ret;
}

expr = GetSelectedString(0)
InsText(expr + "\r\n")
TOKEN = {
  Bracket_Left : "(",
  Bracket_Right : ")",
  OP_Add : "+",
  OP_Minus : "-",
  OP_Multi : "*",
  OP_Div : "/"
};

expr = expr.replace(/\(/g," ( ")
expr = expr.replace(/\)/g," ) ")
tokenList = expr.split(/\s+/);
len = tokenList.length
for(i = 0; i < len; i++ )
    tokenList[i] && tokenList.push(tokenList[i]);
tokenList.splice(0 , len);

stack_op = Array()
stack_num = [0]

for (i=0; i<tokenList.length; ++i) {
	switch(tokenList[i]) {
		case TOKEN.Bracket_Left:
			++i;
			stack_op.push(tokenList[i]);
			break;
		case TOKEN.Bracket_Right:
			stack_op.pop(tokenList[i]);
			break;
		case TOKEN.OP_Add:
		case TOKEN.OP_Minus:
		case TOKEN.OP_Multi:
		case TOKEN.OP_Div:
			++i;
			stack_num(tokenList[i]);
			break;
		default:
			currentOp = stack_op[stack_op.length-1];
			topNumber = stack_num.pop();
			stack_num.push( calculator(currentOp,topNumber,tokenList[i]) );
			break;
	}
	InsText(stack_num.toString() + "\r\n")
}

