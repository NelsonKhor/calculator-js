/* Known unfinished tasks/issues/bugs
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
const dotButton = document.getElementById('dot')                    

// Initialize Values
currentDisplay.textContent = "";
pastDisplay.textContent = "";
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;

// Toggles for conditional operation
let operatorToggle = false;                      
let equalToggle = false;
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
    if(currentDisplay.textContent == "0") {return;}         // enter only 1 zero
    if(equalToggle) {
        currentDisplay.textContent = ""                     // override the previous operation...
        equalToggle = false;                                // and start a new number
    };
    currentDisplay.textContent += e.target.value;
}

// Function: Get operator buttons' value
function getOperator(e){
    if(currentDisplay.textContent == "") {                  // no operator first or repetitive operator
        numberFirst();
        return;
    }
    if(equalToggle == true) {                               // previous operation was calculate()/pressed '='...
        pastDisplay.textContent = result + e.target.value;  // this is for chaining multiple operation...
        operator = e.target.value;                          // e.g) 12 + 7 - 5 * 3 =
        firstNumber = result;
        currentDisplay.textContent = "";
        equalToggle = false;
        operatorToggle = true;
        return;
    }                                                       // this is also for chaining operation...
    if(operatorToggle) {                                    // pressed 'operator' instead of '='
        calculate();                                        // evaluate the existing pair...
    }                                                       // before evaluate the next pair
    operator = e.target.value;
    firstNumber = currentDisplay.textContent;
    pastDisplay.textContent = currentDisplay.textContent + operator;
    currentDisplay.textContent = "";
    operatorToggle = true;
    equalToggle = false;
    if(divideByZero) {                      // if previous operation was divided by 0
        divideByZero = false;               // switch toggle off
        if(firstNumber == "") {             // if firstNumber is empty and operator is selected
            allClear();                     // reset it to prevent bug
        }
    }
}

function calculate(){
    if(equalToggle){                        // prevent pressing '=' twice after calculation
        pastDisplay.textContent = "";
        secondNumber = null;
        allClear();
        return;
    }
    if((operator == "/") && (currentDisplay.textContent == "0")){       // no divide by zero
        noDivideZero();
        divideByZero = true;
        return;
    }
    if(firstNumber == null && operator == null && currentDisplay.textContent != "") {
        return;                      // SPECIAL CASE: if current display not empty and no 1st operand or operator selected: just ignore
    }
    if(currentDisplay.textContent != "") {              // if current display (2nd operand) is not empty
        secondNumber = currentDisplay.textContent;
        result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        pastDisplay.textContent += currentDisplay.textContent;
        currentDisplay.textContent = result;
        operatorToggle = false;
        equalToggle = true;
        debugThis()
    } else {                                            // else: current display (2nd operand) is empty
        alert('Please enter a number');                // prevent pressing '=' without any operation
        // pastDisplay.textContent = firstNumber;
        // currentDisplay.textContent = "";
        // operatorToggle = false;
        // equalToggle = true;
        // debugThis();
    }
}

function backspace(){
    currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);    // slice from behind
}

function getDot(e){
    if (currentDisplay.textContent.includes(".")) {return}              // check for dot on display
    if (currentDisplay.textContent == "") {return currentDisplay.textContent = "0" + e.target.value}
    currentDisplay.textContent += e.target.value;
}

// Function: All clear
function allClear(){
    currentDisplay.textContent = "";
    pastDisplay.textContent = "";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    result = null;
    divideByZero = false;
    operatorToggle = false;
    equalToggle = false;
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
    alert("Enter the number first!");
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

// debugging function
function debugThis(e){
    console.log(`
    ${firstNumber} ${operator} ${secondNumber} = ${result}
    operator toggle:${operatorToggle}; 
    equal toggle:${equalToggle}; 
    divideByZero toggle:${divideByZero}
    currentDisplay:${currentDisplay.textContent}
    pastDisplay:${pastDisplay.textContent}`);
}