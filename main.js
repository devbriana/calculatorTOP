var screenDisplay = document.getElementById('screen-display');
var buttons = document.querySelectorAll('.buttons');
var calculates = document.querySelectorAll('.calculates');
var special = document.querySelectorAll('.special');
var equals = document.getElementById('equals');
var clear = document.getElementById('clear');
var operators = document.querySelectorAll('.operators');
var posNeg = document.getElementById('pos-neg');
var percent = document.getElementById('percent');
var decimal = document.getElementById('decimal');



// variables for updating display
var numberOne;
var numberTwo;
var sign;
var answer;
var array = [];
var answerAvailable;
var justOperated;
var equalsPressed = false;

// ADD SUBTRACT MULTIPLY DIVIDE FUNCTIONS 
// all in one function (operate)
function operate(sign) {
    let answer = array
        .map(Number)
        .reduce((accum, current) => {
            if (sign === '+') {
                return accum + current;
             } else if (sign === '-') {
                return accum - current;
             } else if (sign === 'x') {
                return accum * current;
             } else if (sign === '/') {
                return accum / current;
             } 
        });
    answer = Math.round(answer * 1e9) / 1e9;

    let displayAnswer;
    // use scientific notation for large or very small numbers
    if (Math.abs(answer) >= 1e9 || Math.abs(answer) < 1e-8 && answer !== 0) {
        displayAnswer = answer.toExponential(2); // example: 1.00e+16
    // if not very large number just make sure doesn't overflow screen
    } else {
        displayAnswer = answer.toString();
        if (displayAnswer.length > 9) {
            displayAnswer = displayAnswer.slice(0, 9);
        }
    }
    
    screenDisplay.textContent = displayAnswer;
    const parsedAnswer = Number(displayAnswer);
    if (array.length == 2) {
        array = [];
        array.push(parsedAnswer);
    }
    numberOne = undefined;
    numberTwo = undefined;
    if (array.length > 2) {
        array.splice(0, 2);
    }
    answerAvailable = true;
}


//EVENT LISTENERS AND THEIR FUNCTIONS
// event listener -- for each button pressed (number or symbol (operator) or equals) update display
buttons.forEach(button => {
    button.addEventListener('click', updateDisplay);
})
// updates display, assigns values to numberOne, numberTwo, sign, and pushes values 
// to array.
function updateDisplay(e) {
    var buttonText = e.target.textContent;

    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbols = ['+', '-', 'x', '/'];

    if (numbers.includes(buttonText)) {
        if (equalsPressed) {
            clearDisplay();
        }

        // cap digit amount
        let currentValue = array.length === 0 ? (numberOne || '') : (numberTwo || '');

        if (currentValue.replace('.', '').length >= 9) {
        // Ignore this input, don't add more digits, but continue the function
        return;
        }

        if (array.length === 0) {
            screenDisplay.textContent += buttonText;
            numberOne = screenDisplay.textContent;
            return numberOne;  
        } 
      
        if (array.length >= 1) {
            if (justOperated === true) {
                screenDisplay.textContent = '';
                justOperated = false;
            }
            screenDisplay.textContent += buttonText;
            numberTwo = screenDisplay.textContent;
           
            return numberTwo;
        }
        
    }
  
    if (symbols.includes(buttonText)) {
        justOperated = true;
        equalsPressed = false;

        if (numberTwo && array.length === 1) {
            array.push(numberTwo);
            numberTwo = undefined;
        }

    
        if (array.length === 2) {
            operate(sign);
        } else if (answerAvailable) {
            array = [screenDisplay.textContent];
            answerAvailable = false;
        } else if (numberOne && array.length === 0) {
            array.push(numberOne);
        }
    
        sign = buttonText;
        screenDisplay.textContent = '';
        return sign;
    }

    if (buttonText === '=') {
        if (numberTwo && array.length === 1) {
            array.push(numberTwo);
            numberTwo = undefined;
        }
    
        if (array.length < 2) {
            screenDisplay.textContent = 'error';
            return;
        }
    
        operate(sign);
        equalsPressed = true;
        return;
    }

}


// pos/neg event listener 
posNeg.addEventListener('click', negateFunc);

function negateFunc() {
    let value = screenDisplay.textContent;

    if (value.length === 0 || value === '0') {
        return; // nothing to toggle
    }

    let newValue;
    if (value.startsWith('-')) {
        newValue = value.slice(1);
    } else {
        newValue = '-' + value;
    }
    screenDisplay.textContent = newValue;
   
    // update the correct variable
    if (equalsPressed) {
        numberOne = newValue;
        array = [numberOne];
    } else if (array.length === 0) {
        numberOne = newValue;
    } else if (array.length === 1 && !sign) {
        numberOne = newValue;
        array[0] = newValue;
    } else if (array.length === 1 && sign) {
        numberTwo = newValue;
    } else if (array.length === 2) {
        numberTwo = newValue;
        array[1] = newValue;
    }
}



// percent event listener 
percent.addEventListener('click', percentFunc);

function percentFunc() {
    let value = screenDisplay.textContent;

    if (value.length === 0 || value === '0') return;

    var percentage = Number(value) / 100;
    var roundedPerc = Math.round(percentage * 1e9) / 1e9;

    let displayPercent;
    if (Math.abs(roundedPerc) >= 1e9 || (Math.abs(roundedPerc) < 1e-8 && roundedPerc !== 0)) {
        displayPercent = roundedPerc.toExponential(2);
    } else {
        displayPercent = roundedPerc.toString();
        if (displayPercent.length > 9) {
            displayPercent = displayPercent.slice(0, 9);
        }
    }

    screenDisplay.textContent = displayPercent;

    // update the correct variable
    if (equalsPressed) {
        numberOne = displayPercent;
        array = [numberOne];
        return;
    }
    if (array.length === 0) {
        numberOne = displayPercent;
    } else if (array.length === 1 && !sign) {
        numberOne = displayPercent;
        array[0] = displayPercent;
    } else if (array.length === 1 && sign) {
        numberTwo = displayPercent;
    } else if (array.length === 2) {
        numberTwo = displayPercent;
        array[1] = displayPercent;
    }
}


// decimal event listener 
decimal.addEventListener('click', decimalFunc);

function decimalFunc() {
    let value = screenDisplay.textContent;

    if (justOperated) {
        screenDisplay.textContent = '.';
        justOperated = false;
        return;
    }
    if (value.includes('.')) {
        return; // nothing to toggle
    } else {
        screenDisplay.textContent += '.';
    } 
}




// event listener to call operate function if equals button or operator is clicked when array has 2 numbers
calculates.forEach(calculate => {
    calculate.addEventListener('click', getAnswer);
});

function getAnswer(e) {
    answerAvailable = true;
    if (array.length < 2) {
        screenDisplay.textContent = 'error';
    }  
    operate(sign);
}


// clear button event listener 
clear.addEventListener('click', clearDisplay);

function clearDisplay() {
    screenDisplay.textContent = '';
    array = [];
    numberOne = undefined;
    sign = undefined;
    numberTwo = undefined;
    answerAvailable = false;
    equalsPressed = false;     // <--- reset equalsPressed
    justOperated = false; 
}


// INTERACTIVITY
// operator highlight button toggle for display interactivity
function clearOperatorHighlight() {
    operators.forEach(btn => btn.classList.remove('selected'));
    }
  
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        clearOperatorHighlight();
    });
});
  
special.forEach(btn => {
    btn.addEventListener('click', () => {
        clearOperatorHighlight();
    });
});
  
operators.forEach(btn => {
    btn.addEventListener('click', () => {
        clearOperatorHighlight(); // remove any other highlights
        btn.classList.add('selected'); // highlight this one
    });
});

equals.addEventListener('click', clearOperatorHighlight);