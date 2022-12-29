"use strict";
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");
const clearOne = document.querySelector(".clear-one");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current display value 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}
// calculate first and second value
const calculate = {
  "/": (firstNumber, seconcdNumber) => firstNumber / seconcdNumber,
  "*": (firstNumber, seconcdNumber) => firstNumber * seconcdNumber,
  "+": (firstNumber, seconcdNumber) => firstNumber + seconcdNumber,
  "-": (firstNumber, seconcdNumber) => firstNumber - seconcdNumber,
  "=": (firstNumber, seconcdNumber) => (firstNumber = seconcdNumber),
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // prevent multiple operators
  if (operatorValue && awaitingNextValue) operatorValue = operator;
  else {
    // Assign firstValue if no value
    if (!firstValue) {
      firstValue = currentValue;
    } else {
      const calculation = calculate[operatorValue](firstValue, currentValue);
      calculatorDisplay.textContent = calculation;
      firstValue = calculation;
    }
    // Ready if next value, store operator
    awaitingNextValue = true;

    operatorValue = operator;
  }
}
// Add Even listeners for number,operators,decimal
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// reset display
function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}
function reset1() {
  let value;
  let firstV;
  firstV = firstValue;
  value = calculatorDisplay.textContent;
  if (value !== "0") {
    value.length === 1
      ? (calculatorDisplay.textContent = "0")
      : (calculatorDisplay.textContent = value.slice(0, value.length - 1));
  }
}
// event listener
clearOne.addEventListener("click", reset1);
clearBtn.addEventListener("click", resetAll);
