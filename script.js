/* Known unfinished tasks/issues/bugs
* 1. double pressing operator causes errors
* 2. dot button yet to implement
* 3. delete/backspace button yet to implement
* 4. handling negative numbers
* 5. Additional features like brackets and %
*/


// DOM Selections
const pastDisplay = document.querySelector('.pastDisplay');
const currentDisplay = document.querySelector('.currentDisplay');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const allClearButton = document.querySelector('.clearButton');
const equalButton = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot')                    // yet to implement

// Initialize Values
currentDisplay.textContent = "";
pastDisplay.textContent = "";
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;
let operatorToggle = false;                                        // yet to implement
let equalToggle = false;
let dotToggle = false;
let divideByZero = false;

// Add 'click' event listener to buttons 
numberButtons.forEach(numButton => numButton.addEventListener('click', getNumber));
operatorButtons.forEach(opButton => opButton.addEventListener('click', getOperator));
allClearButton.addEventListener('click', allClear);
equalButton.addEventListener('click', calculate);
deleteButton.addEventListener('click', backspace);
dotButton.addEventListener('click',getDot);

// Function: Get number buttons' value to display
function getNumber(e){
    console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    console.log(`operator:${operatorToggle}; equal:${equalToggle}`);
    if(currentDisplay.textContent == "0") {return;}
    if(equalToggle) {
        currentDisplay.textContent = ""
        equalToggle = false;
    };
    currentDisplay.textContent += e.target.value;
}

// Function: Get operator buttons' value
function getOperator(e){
    console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    console.log(`operator:${operatorToggle}; equal:${equalToggle}`);
    if(currentDisplay.textContent == "") {                  // no operator first or repetitive operator
        numberFirst();
        return;
    }
    if(equalToggle == true) {
        pastDisplay.textContent = result + e.target.value;
        operator = e.target.value;
        firstNumber = result;
        currentDisplay.textContent = "";
        equalToggle = false;
        operatorToggle = true;
        return;
    }
    if(operatorToggle) {
        calculate();
    }
    operator = e.target.value;
    firstNumber = currentDisplay.textContent;
    pastDisplay.textContent = currentDisplay.textContent + operator;
    currentDisplay.textContent = "";
    operatorToggle = true;
    equalToggle = false;
    if(divideByZero) {                                      // make sure to reset all again
        divideByZero = false;
        allClear();
    }
    console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    console.log(`operator:${operatorToggle}; equal:${equalToggle}`);
}

function calculate(){
    if(equalToggle){
        pastDisplay.textContent = "";
        secondNumber = null;
        allClear();
        return;
    }

    if((operator == "/") && (currentDisplay.textContent == "0")){
        noDivideZero();
        divideByZero = true;
        return;
    }
    if(currentDisplay.textContent != "") {
        secondNumber = currentDisplay.textContent;
        result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        pastDisplay.textContent += currentDisplay.textContent;
        currentDisplay.textContent = result;
        operatorToggle = false;
        equalToggle = true;
    } else {
        pastDisplay.textContent = firstNumber;
        currentDisplay.textContent = "";
        operatorToggle = false;
        equalToggle = true;
    }
    // Debugging print:
    // console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    // console.log(`operator:${operatorToggle}; equal:${equalToggle}`);
}

function backspace(){

}

function getDot(){

}

// Function: All clear
function allClear(){
    currentDisplay.textContent = "";
    pastDisplay.textContent = "";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    result = null;
    operatorToggle = false;
    equalToggle = false;
    dotToggle = false;
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

