// DOM Selections
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const currentDisplay = document.querySelector('.currentDisplay');
const pastDisplay = document.querySelector('.pastDisplay');
const allClearButton = document.querySelector('.clearButton');
const equalButton = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot')

// Initialize Values
currentDisplay.textContent = "";
pastDisplay.textContent = "";
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;

// Add 'click' event listener to buttons 
numberButtons.forEach(numButton => numButton.addEventListener('click', getNumber));
operatorButtons.forEach(opButton => opButton.addEventListener('click', getOperator));
// equalButton.addEventListener('click', inputEqual);
allClearButton.addEventListener('click', allClear);

// Function: Get number buttons' value
function getNumber(e){
    const displayValue = e.target.value;
    currentDisplay.textContent += displayValue;
}

// Function: Get operator buttons' value
function getOperator(e){
    // check if the first entered value existed
    if (currentDisplay.textContent == "" && firstNumber == nul){
        alert("Enter the first number first!");
        return; // stop the function
    }
    if (firstNumber != null) {
        inputSecondNum(e);
        return;
    }
    // get operator value
    operator = e.target.value;
    // get first number value from current display
    firstNumber = parseInt(currentDisplay.textContent);
    // add first number value and operator to past display
    pastDisplay.textContent = currentDisplay.textContent + operator;
    // clear current display
    currentDisplay.textContent = "";
}

// Function: Input second number
function inputSecondNum(e){
    secondNumber = parseInt(currentDisplay.textContent);
    result = operate(operator,firstNumber,secondNumber);
    pastDisplay.textContent = result + e.target.value;
    operator = e.target.value;
    firstNumber = result;
    currentDisplay.textContent = "";
    console.log(`${firstNumber}${operator}${secondNumber}${e.target.value}`);
}

// Function: Equal sign operation
// function inputEqual(e){
//     console.log(`${firstNumber}${operator}${secondNumber}${e.target.value}`);
//     secondNumber = parseInt(currentDisplay.textContent);
//     result = operate(operator,firstNumber,secondNumber);
//     pastDisplay.textContent = result;
//     firstNumber = result;
//     currentDisplay.textContent = "";
//     operator = null;
// }

// Function: All clear
function allClear(){
    currentDisplay.textContent = "";
    pastDisplay.textContent = "";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    result = null;
}

// Add function
function add(num1, num2) {
    return num1 + num2;
}

// Subtract function
function subtract(num1, num2) {
    return num1 - num2;
}

// Multiply function
function multiply(num1, num2) {
    return num1 * num2;
}

// Divide function
function divide(num1, num2) {
    return num1/num2;
}

// Operate function
function operate(operator, num1, num2) {
    switch(true) {
        case operator == "+":
            return add(num1, num2);
        case operator == "-":
            return subtract(num1, num2);
        case operator == "*":
            return multiply(num1, num2);
        case operator == "/":
            return divide(num1, num2);
        default:
            console.log("ERROR: check your code")
    }
}

