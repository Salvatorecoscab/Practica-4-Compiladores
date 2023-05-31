//Create a table for a syntax analyzer for the following grammar:
//E -> TEp
//E' -> +TEp | ε
//T -> FTp
//T' -> *FTp | ε
//F -> (E) | id
// and then write a program to parse the following input
//[ '(', 'id', '+', 'id', ')', '*', 'id']
export {GenerateTokenVector} from tokenVector;

var table = {
    "E": {
        "(": ["T", "Ep"],
        "id": ["T", "Ep"]
    },
    "Ep": {
        "+": ["+", "T", "Ep"],
        ")": ["ε"],
        "$": ["ε"]
    },
    "T": {
        "(": ["F", "Tp"],
        "id": ["F", "Tp"]
    },
    "Tp": {
        "+": ["ε"],
        "*": ["*", "F", "Tp"],
        ")": ["ε"],
        "$": ["ε"]
    },
    "F": {
        "(": ["(", "E", ")"],
        "id": ["id"]
    }
};
var terminals = ["(", ")", "+", "*", "id"];
function verify(input){
let i=0;
let stack = ['$','E'];

do{
    let a=input[i];
    let x=stack[stack.length-1];

    if (x == '$' || terminals.includes(x)) {
        if(a==x){
            stack.pop();
            i++;
        }
        else{
            console.log("error 1");
        }
    } 
    else {
        if (table[x][a]!=undefined) {
        let temp = table[x][a];
        stack.pop();
        for (let j = temp.length - 1; j >= 0; j--) {
            if(temp[j]!='ε'){
            stack.push(temp[j]);
        }
    }

        }
        else {
            console.log("error 2");
        }
    }
    console.log(stack);
}while (stack.length > 0);

if (stack.length == 0) {
    console.log('Accepted');
}
else {
    console.log('Rejected');
}
}

var input =[[ 'id', '+', 'id', '*', 'id','$'],['(', 'id', ')','$'],,['id', '+', '(',,,'$']]

verify(input[1]);

