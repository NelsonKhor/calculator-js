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
let holdValue;                 
let equalToggle = false;

// Add 'click' event listener to buttons 
numberButtons.forEach(numButton => numButton.addEventListener('click', grabValue));
numberButtons.forEach(numButton => numButton.addEventListener('click', getNumber));
operatorButtons.forEach(opButton => opButton.addEventListener('click', grabValue));
operatorButtons.forEach(opButton => opButton.addEventListener('click', getOperator));
allClearButton.addEventListener('click', allClear);
equalButton.addEventListener('click', calculate);
deleteButton.addEventListener('click', backspace);
dotButton.addEventListener('click',getDot);

// Keyboard support
window.addEventListener('keydown',grabKeyBoardValue);
window.addEventListener('keydown',keyboardEventHandler);

// Function: Grab the button value
function grabValue(e){
    holdValue = e.target.value;
    return holdValue
}

// Function: Grab the keyboard value
function grabKeyBoardValue(e){
    holdValue = e.key;
    return holdValue
}

// Function: Append to current display
function appendDisplay(userInput){
    currentDisplay.textContent += userInput;
}
// Function: Move to past display
function moveToPastDisplay(){
    pastDisplay.textContent = currentDisplay.textContent;
    if(operator != null) {
        pastDisplay.textContent += operator;
    }
    currentDisplay.textContent = "";
}

// Function: Get First Operand from value and append to screen
function getNumber(){
    if(currentDisplay.textContent == "0") {return;}                         // if "0" already pressed > do nothing
    if(result != null) {allClear();}                                        // if previous was an operation, and entering new number > reset all
    appendDisplay(holdValue);
}

// Function: Get operator value
function getOperator(){
    if(currentDisplay.textContent == "") {                                  // current display is empty (aka no 1st operand)         
        return numberFirst();
    }
    if(operator != null) {                                                  // continue operation with operator
        calculate();
        pastDisplay.textContent = result + holdValue;
        firstNumber = result;
        operator = holdValue;
        // reset
        secondNumber = null;
        result = null;
        equalToggle = false;
        currentDisplay.textContent = "";
        return
    }                                                 
    firstNumber = currentDisplay.textContent;                               // default: save 1st operand, save operator
    operator = holdValue;
    moveToPastDisplay();
}

// Function: Press '=' and evaluate the operation
function calculate(){
    if(equalToggle == true && result != null){                              // chaining result after operation (for pressing new operator)
        return
    }
    if(equalToggle == true){                                                // already pressed equal - twice
        return alert("You already pressed equal!");
    }
    if((operator == "/") && (currentDisplay.textContent == "0")){           // cannot divide by zero
        return noDivideZero()
    }
    if(currentDisplay.textContent == "" && pastDisplay.textContent == ""){  // press equal without any input
        return numberFirst()
    }
    if(currentDisplay.textContent == "" && pastDisplay.textContent != ""){
        return numberFirst()
    }
    if(currentDisplay.textContent != "" && operator == null) {return}       // press equal with only current display
    secondNumber = currentDisplay.textContent;                              // default: save 2nd operand, do calculation
    result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    pastDisplay.textContent += currentDisplay.textContent + "=";
    currentDisplay.textContent = result;
    equalToggle = true;
}

function backspace(){
    currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);    // slice from behind
}

function getDot(){
    if (currentDisplay.textContent.includes(".")) {return}                  // check for dot on display
    if (currentDisplay.textContent == "") {return currentDisplay.textContent = "0."}
    currentDisplay.textContent += ".";
}

function allClear(){
    currentDisplay.textContent = "";
    pastDisplay.textContent = "";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    result = null;
    equalToggle = false;
}

function roundDecimal(decimal){
    return Math.round(decimal*1000) / 1000;
}

// Function: Display "No Divide by Zero" message
function noDivideZero() {
    alert("Can't divide by 0!");
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
    return roundDecimal(num1 * num2);
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

// Function: Handling keyboard events
function keyboardEventHandler(e){
    if(e.key >= 0 && e.key <=9) return getNumber();
    if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') getOperator();
    if(e.key === "Escape") allClear();
    if(e.key === "Backspace") backspace();
    if(e.key == '.') getDot();
    if(e.key == '=') calculate();                                   /* Enter doesn't work as expected sometime... */
}