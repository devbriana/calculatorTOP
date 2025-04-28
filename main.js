var screenDisplay = document.getElementById('screen-display');
var buttons = document.querySelectorAll('.buttons');
var equals = document.getElementById('equals');
var clear = document.getElementById('clear');
var operators = document.querySelectorAll('.operators');



// variables for updating display
var firstNum;
var sign;
var secondNum;
var result;


// add
function add(firstNum, secondNum) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    result = firstNum + secondNum;
    screenDisplay.textContent = result;
    return result;
}

// subtract 
function subtract(firstNum, secondNum) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    result = firstNum - secondNum;
    screenDisplay.textContent = result;
    return result;
}

// multiply 
function multiply(firstNum, secondNum) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    result = firstNum * secondNum;
    screenDisplay.textContent = result;
    return result;
}


// divide 
function divide(firstNum, secondNum) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    if (secondNum === 0) {
        screenDisplay.textContent = "NOT TODAY"
    }
    // above not today doesn't work
    result = firstNum/secondNum;
    screenDisplay.textContent = result;
    return result
    
}

// calls one of the above functions with the two numbers based on the sign pressed 
function operate(firstNum, sign, secondNum) {
    if (sign === '+') {
       console.log(add(firstNum, secondNum));
    } else if (sign === '-') {
        subtract(firstNum, secondNum); 
    } else if (sign === 'x') {
        multiply(firstNum, secondNum);
    } else if (sign === '/') {
        divide(firstNum, secondNum);
    }
}


// event listener to assign operator button clicked to operator


// event listener clear button 
clear.addEventListener('click', clearDisplay)

function clearDisplay() {
    screenDisplay.textContent = '';
    firstNum = undefined; 
    sign = undefined;
    secondNum = undefined;
}

// event listener -- for each button pressed update display
buttons.forEach(button => {
    button.addEventListener('click', updateDisplay)
    
})

var click = 0;
function updateDisplay(e) {
    var buttonText = e.target.textContent;
    let display = screenDisplay.textContent += buttonText; 
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbols = ['+', '-', 'x', '/'];
    click ++; 
    if (numbers.includes(buttonText)) {
        if (!sign) {
            firstNum = display;
            console.log('first Num: ' + firstNum);
        } else {
            if (secondNum) {
                secondNum = secondNum + buttonText;
            } else {
                secondNum = buttonText;
            }
            console.log('second num: ' + secondNum)
        }
    }

    if (symbols.includes(buttonText)) {
        if (!firstNum) {
            sign = undefined
            screenDisplay.textContent = ''
        } if (firstNum) {
            sign = buttonText;
        }
        console.log('sign: ' + sign);
    }


}

console.log("first number: " + firstNum);
console.log("sign: " + sign);
console.log("second number: " + secondNum);
console.log(click);

// equal button event listener to call operate function

equals.addEventListener('click', () => {
    operate(firstNum, sign, secondNum);
});