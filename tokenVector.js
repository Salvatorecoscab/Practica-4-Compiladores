import * as fs from "fs";

let option;
let filename = "AFD.json";
let newADF;

//function that reads a file
function readFile(filename) {
  // const readline = require("readline");

  const ADF = filename;
  const newADF = JSON.parse(fs.readFileSync(ADF, "utf8"));
  return newADF;
}

export function GenerateTokenVector(word) {
  newADF = readFile(filename);
  let alphabet = newADF.alphabet;
  let states = newADF.states;
  let initialState = newADF.initialState;
  let transitionsTable = newADF.transitionsTable;
  //delete spaces in word
  word = word.replace(/\s/g, "");
  let token = [];
  let simbol = [];
  let number = "";
  let identificador = "";
  let currentState = initialState;

  while (word.length > 0) {
    let currentSymbol = word.charAt(0);
    let nextSymbol = word.charAt(1);
    word = word.substring(1);

    if (!alphabet.includes(currentSymbol)) {
      console.log("🛑You have introduced an invalid character🛑");
      currentState = undefined;
      return 0;
    }

    let nextState = transitionsTable[currentState][currentSymbol];
    let nextNextState = transitionsTable[nextState][nextSymbol];
    switch (nextState) {
      case "q1":
        if (nextNextState != "q5") {
          simbol.push(currentSymbol);
          token.push("id");
          break;
        }
        identificador += currentSymbol;
        break;
      case "q2":
        if (nextNextState != "q2") {
          number += currentSymbol;
          simbol.push(number);
          token.push("num");
          number = "";
          break;
        }
        number += currentSymbol;

        break;
      case "q3":
        simbol.push(currentSymbol);
        token.push("+");

        break;
      case "q4":
        simbol.push(currentSymbol);
        token.push("-");
        break;
      case "q5":
        identificador += currentSymbol;
        if (nextNextState != "q6") {
          simbol.push(identificador);
          token.push("id");
          identificador = "";
          break;
        }
        break;
      case "q6":
        identificador += currentSymbol;
        if (nextNextState != "q6") {
          simbol.push(identificador);
          token.push("Invalido");
          identificador = "";
        }
        break;

      case "q7":
        simbol.push(currentSymbol);
        token.push("/");

        break;
      case "q8":
        simbol.push(currentSymbol);
        token.push("*");

        break;
      case "q9":
        simbol.push(currentSymbol);
        token.push("(");

        break;
      case "q10":
        simbol.push(currentSymbol);
        token.push(")");

        break;

      default:
        break;
    }
    currentState = nextState;
  }
  return token;
}
