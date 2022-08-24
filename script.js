/* Known unfinished tasks/issues/bugs
* 1. double pressing operator causes errors
* 2. dot button yet to implement
* 3. delete/backspace button yet to implement
* 4. handling negative numbers
* 5. Additional features like brackets and %
*/


// DOM Selections
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const currentDisplay = document.querySelector('.currentDisplay');
const pastDisplay = document.querySelector('.pastDisplay');
const allClearButton = document.querySelector('.clearButton');
const equalButton = document.getElementById('equal');               // yet to implement
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot')                    // yet to implement

// Initialize Values
currentDisplay.textContent = "";
pastDisplay.textContent = "";
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;
const operatorToggle = false;                                          // yet to implement

// Add 'click' event listener to buttons 
numberButtons.forEach(numButton => numButton.addEventListener('click', getNumber));
operatorButtons.forEach(opButton => opButton.addEventListener('click', getOperator));
allClearButton.addEventListener('click', allClear);

// Function: Get number buttons' value to display
function getNumber(e){
    if(currentDisplay.textContent == "0"){
        return;
    }
    const displayValue = e.target.value;
    currentDisplay.textContent += displayValue;
}

// Function: Get operator buttons' value
function getOperator(e){
    // case 0: double press operator
    
    // case 1: can't divide by 0
    if ((operator == "/") && (currentDisplay.textContent == "0")){
        noDivideZero();
        return;
    }
    // case 2: press operator before any number
    if (currentDisplay.textContent == "" && firstNumber == null){
        numberFirst();
        return;
    }
    // case 3: first number exist, operator selected, proceed to calculate result
    if ((firstNumber != null) && (operator != null)) {
        calculateResult(e);
        return;
    }
    // case 4: pressed equal
    if ((firstNumber != null) && (operator == null)) {
        operator = e.target.value;
        pastDisplay.textContent = pastDisplay.textContent + operator;
        return;
    }
    // default case:
    operator = e.target.value;
    firstNumber = parseInt(currentDisplay.textContent);
    pastDisplay.textContent = currentDisplay.textContent + operator;
    currentDisplay.textContent = "";
}

// Function: Calculate the existing operation
function calculateResult(e){
    secondNumber = parseInt(currentDisplay.textContent);
    result = operate(operator,firstNumber,secondNumber);
    if(e.target.value == "="){  // if operator is '='
        pastDisplay.textContent = result;
        operator = null;
        secondNumber = 0;
    } else {                    // if operator is '+ - * /'
        pastDisplay.textContent = result + e.target.value;
        operator = e.target.value;
    }
    firstNumber = result;
    currentDisplay.textContent = "";
}

// Function: All clear
function allClear(){
    currentDisplay.textContent = "";
    pastDisplay.textContent = "";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    result = null;
}

// Function: Rounding to 3 d.p.
function roundDecimal(decimal){
    return Math.round(decimal*1000) / 1000;
}

// Function: Display "No Divide by Zero" message
function noDivideZero() {
    alert("Can't divide by 0");
    allClear();
}

// Function: Display "Number first before operator" message
function numberFirst() {
    alert("Enter the first number first!");
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
    return roundDecimal(num1/num2);
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

