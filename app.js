"use strict";
let numberArray = [];

document
  .querySelector(".basic-calc-region")
  .addEventListener("click", startCalculation);

function startCalculation(event) {
  let numberPressed;
  let targetData = event.target.getAttribute("data");
  let targetValue = event.target.value;

  if (targetValue) {
    //push into array
    numberPressed = targetValue;

    numberArray.push(numberPressed);
    document
      .querySelector(".question")
      .insertAdjacentText("beforeend", numberPressed);
  }

  if (targetData && targetData !== "=") {
    let operandPressed = targetData;

    //push into array
    numberArray.push(operandPressed);

    document
      .querySelector(".question")
      .insertAdjacentText("beforeend", operandPressed);
  }

  if (targetData === "=") {
    validateInput(numberArray);
    //this is the concatenated returned Value
    console.log(validateInput(numberArray));
  }
}


//Funtion that checks and concatenates array
function validateInput(input) {
  for (let i = 0; i < input.length; i++) {
    if (typeof input[i] === "number" && typeof input[i + 1] === "number") {
      let newWhole = [input[i].toString() + input[i + 1].toString()];
      input.splice(i, 2, +newWhole[0]);
      validateInput(input);
    }
    }
  return input;
}
