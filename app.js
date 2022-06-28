"use strict";
const numberArray = [];
const MUL = '*';
const SUB = '-';
const ADD = '+';
const DIV = '/'
const EQUALTO = '=';
const questionDisplayEl = document.querySelector('.question');
const answerEl = document.querySelector('.answer');
const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '.']
const validKeys = ['+', '-', '*', '/', '(', ')', ...validNumbers]



//FUNCTION TO EMPTY ARRAY 
const emptyArrayHandler = () => {
  numberArray.splice(0)
  questionDisplayEl.textContent = '';
}
//Function that accepts input and push input to array
const displayInputHandler = (input) => {
  numberArray.push(input);
  questionDisplayEl.insertAdjacentText("beforeend", input);
}


//Funtion that checks and concatenates array
const validateInput = (input) => {
  console.log(input)
  for (let i = 0; i < input.length; i++) {
    if (validNumbers.includes(input[i]) && validNumbers.includes(input[i + 1]) || typeof + input[i] === 'number' && typeof + input[i + 1] === 'number' && !isNaN(input[i]) && !isNaN(input[i + 1])) {
      let newWhole = [input[i].toString() + input[i + 1].toString()];
      input.splice(i, 2, newWhole[0]);
      validateInput(input);
    }
  }
  return input;
}

//function that show answer
const showAnswer = () => {
  //this is the concatenated returned Value
  validateInput(numberArray);
  let answer = bidmas(handleBracket(validateInput(numberArray)));
  handleBracket(validateInput(numberArray));
  answerEl.textContent = answer.join('').toString();
}

const startCalculation = (event) => {
  let numberPressed;
  let targetData = event.target.getAttribute("data");


  if (validKeys.includes(targetData)) {
    numberPressed = targetData;
    displayInputHandler(numberPressed)
  }

  if (targetData === "=") {

    showAnswer();
  }
  if (event.target.className === 'del') {
    emptyArrayHandler();
  }


}





// bidmas(handleBracket(initialNumbers))

//VERY IMPORTANT

function handleTrig(enteredValues) {
  if (enteredValues.includes('sin(')) {
    let bracketStart = enteredValues.indexOf('sin(');
    let bracketEnd = enteredValues.indexOf(')');
    for (let index = 0; index < enteredValues.length; index++) {
      if (returnValues[i] === 'sin(') {
        let answer = bracketStart[i + 1]
      }
    }
  } else if (enteredValues.includes('cos(')) {

  } else if (enteredValues.includes('tan(')) {

  } else {
    return enteredValues
  }
}

function handleBracket(enteredValues) {
  let bracketArray = [];
  if (enteredValues.includes('(')) {
    let bracketStart = enteredValues.indexOf('(');
    let bracketEnd = enteredValues.indexOf(')');
    for (let index = 0; index < enteredValues.length; index++) {
      if (index > bracketStart && index < bracketEnd) {
        bracketArray.push(enteredValues[index])
      }

    }
    if (typeof (enteredValues[bracketStart - 1]) === 'number') {
      enteredValues.splice(bracketStart, bracketArray.length + 2, MUL, bidmas(bracketArray)[0])
    } else {
      enteredValues.splice(bracketStart, bracketArray.length + 2, bidmas(bracketArray)[0])
    }

    handleBracket(enteredValues)
    return enteredValues;
  } else {
    return enteredValues
  }

}

//VERY IMPORTANT



function handleDivision(returnValues) {
  console.log(returnValues)
  let operation;
  if (returnValues.includes(DIV)) {
    for (let i = 1; i < returnValues.length; i++) {
      if (returnValues[i] === DIV) {
        if (returnValues[i - 2] === MUL) {
          let leftToRightLogic;
          //LOGIC FOR LEFT TO RIGHT
          leftToRightLogic = +returnValues[i - 3] * returnValues[i - 1];
          operation = leftToRightLogic / returnValues[i + 1]
          returnValues.splice(+(i - 3), 5, operation)
        } else {
          operation = +returnValues[i - 1] / +returnValues[i + 1];
          returnValues.splice(+(i - 1), 3, operation);

        }
        handleDivision(returnValues)
      }

    }
    return returnValues;
  } else {
    return returnValues;
  }
}

function handleMultiplication(returnValues) {
  let operation;
  if (returnValues.includes(MUL)) {
    for (let i = 1; i < returnValues.length; i++) {
      if (returnValues[i] === MUL) {
        operation = +returnValues[i - 1] * +returnValues[i + 1];
        returnValues.splice(+(i - 1), 3, operation);
        handleMultiplication(returnValues)
      }
    }
    return returnValues;
  } else {
    return returnValues;
  }
}



function handleAddition(returnValues) {
  let operation;
  if (returnValues.includes(ADD)) {
    for (let i = 1; i < returnValues.length; i++) {
      if (returnValues[i] === ADD) {

        if (returnValues[i - 2] === SUB) {
          operation = returnValues[i + 1] - returnValues[i - 1]
          returnValues.splice(+(i - 2), 4, ADD, operation)
        } else {
          operation = +returnValues[i - 1] + +returnValues[i + 1];
          returnValues.splice(+(i - 1), 3, operation);
        }

        handleAddition(returnValues)
      }

    }
    return returnValues;
  } else {
    return returnValues;
  }
}

function handleSubtraction(returnValues) {
  let operation;

  if (returnValues.includes(SUB)) {
    for (let i = 1; i < returnValues.length; i++) {
      if (returnValues[i] === SUB) {
        if (returnValues[i - 2] === SUB) {
          operation = returnValues[i + 1] + returnValues[i - 1]
          returnValues.splice(+(i - 2), 4, SUB, operation)
        } else {
          operation = +returnValues[i - 1] - +returnValues[i + 1];
          returnValues.splice(+(i - 1), 3, operation);
        }

        handleSubtraction(returnValues)

      }
    }
    return returnValues;
  } else {
    return returnValues;
  }


}


function bidmas(params) {
  return handleSubtraction(handleAddition(handleMultiplication(handleDivision(params))))
}


const calculatorBodyEl = document.querySelector(".basic-calc-region");

calculatorBodyEl.addEventListener("click", startCalculation);


window.addEventListener('keypress', (event) => {
  console.log(event.key)

  if (validKeys.includes(event.key)) {

    displayInputHandler(event.key)
  }


  if (event.key === 'Enter') {
    showAnswer()
  }
  if (event.key === 'delete') {
    emptyArrayHandler();
  }

})