// DOM Selections
const buttons = document.querySelectorAll('button');
const currentDisplay = document.querySelector('.currentDisplay');
const pastDisplay = document.querySelector('.pastDisplay');
const allClearButton = document.querySelector('.clearButton');
const equalButton = document.querySelector('.equal');
const deleteButton = document.getElementById('delete');

// Get Buttons' value
buttons.forEach(button => button.addEventListener('click', () => {
    const displayValue = button.getAttribute('value');
    currentDisplay.textContent = displayValue;
    console.log(button.getAttribute('value'));
    return button.getAttribute('value');
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

