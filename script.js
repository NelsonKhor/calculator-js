// DOM Selections
const numberButtons = document.querySelectorAll('.number');
const currentDisplay = document.querySelector('.currentDisplay');
const pastDisplay = document.querySelector('.pastDisplay');
const allClearButton = document.querySelector('.clearButton');
const equalButton = document.querySelector('.equal');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot')

// Initialize Values
currentDisplay.textContent = "";
pastDisplay.textContent = "";
let firstNumber = 0;
let operator;
let secondNumber = 0;

// Get Buttons' value
numberButtons.forEach(numButton => numButton.addEventListener('click', () => {
    const displayValue = numButton.getAttribute('value');
    currentDisplay.textContent += displayValue;
    console.log(numButton.getAttribute('value'));
    return numButton.getAttribute('value');
}));

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
            console.log("operate() ERROR")
    }
}

