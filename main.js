var screenDisplay = document.getElementById('screen-display');
var buttons = document.querySelectorAll('.buttons');
var calculates = document.querySelectorAll('.calculates');
var special = document.querySelectorAll('.special');
var equals = document.getElementById('equals');

var clear = document.getElementById('clear');
var operators = document.querySelectorAll('.operators');
var posNeg = document.getElementById('pos-neg')
var percent = document.getElementById('percent')
var decimal = document.getElementById('decimal')



// variables for updating display
var numberOne;
var numberTwo
var sign;
var answer;
var array = [];
var answerAvailable;
var justOperated;
var equalsPressed = false;

// ADD SUBTRACT MULTIPLY DIVIDE FUNCTIONS
// add
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
    answer = Math.round(answer * 1e8) / 1e8;

    // Convert to string
    let displayAnswer = answer.toString();

    // Trim if longer than 9 visible characters
    if (displayAnswer.length > 8) {
        displayAnswer = displayAnswer.slice(0, 8);
    }
    
    screenDisplay.textContent = displayAnswer;
    const parsedAnswer = Number(displayAnswer);
    console.log('array 1: ' + array)
    //array = [];
    if (array.length == 2) {
        array = [];
        array.push(parsedAnswer);
    }
    console.log('array 2: ' + array)
    numberOne = undefined;
    numberTwo = undefined;
    if (array.length > 2) {
        array.splice(0, 2);
    }
    answerAvailable = true;
}


//EVENT LISTENERS AND THEIR FUNCTIONS
// event listener -- for each button pressed update display
buttons.forEach(button => {
    button.addEventListener('click', updateDisplay)
})
// updates display, assigns values to firstNum, secondNum, sign, and pushes values 
// to array.
function updateDisplay(e) {
    var buttonText = e.target.textContent;
    console.log('this is the buttonText: ' + buttonText);

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

    var percentage = value / 100;
    var roundedPerc = Math.round(percentage * 1e8) / 1e8;
    screenDisplay.textContent = roundedPerc;

    // Handle what to assign percent value to
    if (equalsPressed) {
        // After equals, treat percent as new starting value
        numberOne = roundedPerc;
        array = [numberOne];
        return;
    }

    if (array.length === 0) {
        numberOne = roundedPerc;
    } else if (array.length === 1 && !sign) {
        // updating numberOne if no operator yet
        numberOne = roundedPerc;
        array[0] = roundedPerc;
    } else if (array.length === 1 && sign) {
        // operator selected, now changing numberTwo
        numberTwo = roundedPerc;
    } else if (array.length === 2) {
        numberTwo = roundedPerc;
        array[1] = roundedPerc;
    }
}



// decimal event listener 
decimal.addEventListener('click', decimalFunc);

function decimalFunc() {
    let value = screenDisplay.textContent;

    if (value.length === 0 || value === '0' || value.includes('.')) {
        return; // nothing to toggle
    }
    else {
        screenDisplay.textContent += '.';
    } 
}




// equals button event listener to call operate function
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
clear.addEventListener('click', clearDisplay)

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


// operator button click display interactivity 
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


// TUES JUL 22 ENDING DAY PROBLEMS:
// can do 2 + 5 = 7 + 2 = 9 ... but cant do 2 + 5 + 2 
// *** NOW I CAN!!! math works. just issue with display.. still has other weird math bugs
// math works like 2+5+3+9+1 etc. but doesnt work 2+5-3+1*4/5.. only can switch signs 
// when pressing equals number between each it allows sign to switch 

// ^^ the problem above with not being able to sequence and switch signs the code was
// using the sign to the right instead of the sign before. the reason is this: 

// The problem is in this: You’re setting sign = buttonText 
// as soon as the user clicks the operator, even before operate() has run on the 
// current sign. You should store the operator (sign) only AFTER operate() has used 
// the current one. So inside your updateDisplay() → operator block, move 
// sign = buttonText to the very end, after operate(sign).

// update code from this: 
// if (symbols.includes(buttonText)) {
    // if (answerAvailable) {
        // screenDisplay.textContent = ''
        // screenDisplay.textContent = buttonText;
        // array = [];
        // array.push(answer);
    // } else if (numberOne || numberTwo) {
        // screenDisplay.textContent = ''
        // screenDisplay.textContent = buttonText;
        // array.push(numberOne);
    // }
// }

// to this:
// if (symbols.includes(buttonText)) {
    // if (array.length === 2) {
        // operate(sign); 
    // } else if (answerAvailable) {
        // array = [answer];
        // answerAvailable = false;
    // } else if (numberOne) {
        // array.push(numberOne);
    // }

    // sign = buttonText;
    // screenDisplay.textContent = '';
// }
// code before change is in badfuzzy2.js










// WED JUL 23 ENDING DAY PROBLEMS: 

// fixed:

// chaining math works: 2 + 5 + 7, and switching signs too, 2 + 5 + 7 - 3 * 2 etc.



// remaining problems: 

// what doesnt work now is chaining after pressing = . so 1 + 5 = (6) + 1.. when press
// '+' calc displays NaN.

// second number doesnt populate

// cant do 2 + 5..... (then start over without pressing clear 3+1)



// THURSDAY JUL 24
// fixed: 
// second number populates and works (fixed in symbol section)
// remaining problems: 
// what doesn't work now is chaining after pressing = . so 1 + 5 = (6) + 1.. when press
// '+' calc displays NaN.
// cant do 2 + 5..... (then start over without pressing clear 3+1)



// FRIDAY JUL 25

// fixed: 
// chaining after pressing = . so 1 + 5 = (6) + 1..  now works
// can do 2 + 5..... (then start over without pressing clear 3+1)

// remaining problems: 
// add functionality to decimal and percent and pos/neg
// only allow 1 decimal to be on the screen display. so no 55.3.2
// add number limit & round long decimals (flows off screen)
// clean up code





// SATURDAY JUL 26

// fixed: 
// chaining after pressing = . so 1 + 5 = (6) + 1..  now works
// can do 2 + 5..... (then start over without pressing clear 3+1)
// add functionality to percent and pos/neg
// add number limit & round long decimals (flows off screen)
// add functionality to decimal & only allow 1 decimal to be on the screen display. so no 55.3.2



// remaining problems: 
// clean up code






// MONDAY JUL 28

// fixed: 
// chaining after pressing = . so 1 + 5 = (6) + 1..  now works
// can do 2 + 5..... (then start over without pressing clear 3+1)
// add functionality to percent and pos/neg
// add number limit & round long decimals (flows off screen)
// add functionality to decimal & only allow 1 decimal to be on the screen display. so no 55.3.2
// add button pressing color change

// remaining problems: 
// neg pos is not working correctly (only works when added neg to an answer and then continuing math)
// unpress = button color change
// clean up code





// TUESDAY JUL 29

// fixed: 
// chaining after pressing = . so 1 + 5 = (6) + 1..  now works
// can do 2 + 5..... (then start over without pressing clear 3+1)
// add functionality to percent and pos/neg
// add number limit & round long decimals (flows off screen)
// add functionality to decimal & only allow 1 decimal to be on the screen display. so no 55.3.2
// add button pressing color change
// fixed unpress = button color change
// fixed - neg pos was not working correctly (only worked when added neg to an answer and then continuing 
// math)


// remaining problems: 
// clean up code