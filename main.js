var screenDisplay = document.getElementById('screen-display');
var buttons = document.querySelectorAll('.buttons');
var equals = document.getElementById('equals');
var clear = document.getElementById('clear');
var operators = document.querySelectorAll('.operators');



// variables for updating display
var firstNum;
var sign;
var secondNum;
var answer;
var array = [];

// ADD SUBTRACT MULTIPLY DIVIDE FUNCTIONS
// add
function add() {
    let answer = array
        .map(Number)
        .reduce((accum, current) => accum + current);
    screenDisplay.textContent = answer;
    console.log('answer: ' + answer);
    array = [];
    array.push(answer);
    firstNum = answer;
    secondNum = undefined;
    sign = undefined;
    console.log(array);

    console.log('answer: ' + answer);
    console.log('sign: ' + sign);


    return answer;
}

// subtract 
function subtract() {
    let answer = array
        .map(Number)
        .reduce((accum, current) => accum - current);
    screenDisplay.textContent = answer;
    console.log('answer: ' + answer);
    array = [];
    array.push(answer);
    firstNum = answer;
    secondNum = undefined;
    sign = undefined;
    console.log(array);

    console.log('answer: ' + answer);
    console.log('sign: ' + sign);

    return answer;
}

// multiply 
function multiply() {
    let answer = array
        .map(Number)
        .reduce((accum, current) => accum * current);
    screenDisplay.textContent = answer;
    console.log('answer: ' + answer);
    array = [];
    array.push(answer);
    firstNum = answer;
    secondNum = undefined;
    sign = undefined;
    console.log(array);

    console.log('answer: ' + answer);
    console.log('sign: ' + sign);

    return answer;
}


// divide 
function divide() {
    if (array[1] === '0') {
        console.log("nope");
        screenDisplay.textContent = "NOT TODAY"
        firstNum = undefined;
        secondNum = undefined;
        sign = undefined;
        array = [];
        console.log(array);
        return;
    } else {
        let answer = array
            .map(Number)
            .reduce((accum, current) => accum / current);
        screenDisplay.textContent = answer;
        console.log('answer: ' + answer);
        array = [];
        array.push(answer);
        firstNum = answer;
        secondNum = undefined;
        sign = undefined;
        console.log(array);

        console.log('answer: ' + answer);
        console.log('sign: ' + sign);

        return answer;
    }
}

// OPERATE FUNCTION
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


//EVENT LISTENERS AND THEIR FUNCTIONS
// event listener -- for each button pressed update display
buttons.forEach(button => {
    button.addEventListener('click', updateDisplay)
    
})
// updates display, assigns values to firstNum, secondNum, sign, and pushes values 
// to array.
function updateDisplay(e) {
    screenDisplay.textContent = '';
    var buttonText = e.target.textContent;
    let display = screenDisplay.textContent += buttonText; 
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbols = ['+', '-', 'x', '/'];
    

    if (numbers.includes(buttonText)) {
        // so that array resets if user presses number button to start new calculation
        // after already doing calculation .. so 5+5 = 10, then they press 2 + 2, it 
        // will equal 4.. not 10 + 2 + 2. 
        if (answer = true && !sign) {
            array = [];
            firstNum = display;
            array.push(firstNum);
            console.log('first Num: ' + firstNum);
        }
        // if there is no sign and never was an answer (no calculations done)
        else if (!sign) {
            firstNum = display;
            array.push(firstNum);
            console.log('first Num: ' + firstNum);
        // if there is a sign we move to the second number    
        } else {
            if (secondNum) {
                screenDisplay.textContent = '';
                secondNum = secondNum + buttonText;
                screenDisplay.textContent = secondNum;
            } else {
                screenDisplay.textContent = '';
                secondNum = buttonText;
                screenDisplay.textContent = secondNum;
            }
            console.log('second num: ' + secondNum)
        }
    }
    // if user does not press a number before an operator nothing will happen
    // operator is assigned (sign) once user selects firstNum
    if (symbols.includes(buttonText)) {
        if (!firstNum) {
            sign = undefined
            screenDisplay.textContent = ''
        } if (firstNum) {
            screenDisplay.textContent = buttonText;
            sign = buttonText;
        }
        console.log('sign: ' + sign);
    }

}



console.log("first number: " + firstNum);
console.log("sign: " + sign);
console.log("second number: " + secondNum);
console.log('answer: ' + answer);
console.log("sign: " + sign);



// equals button event listener to call operate function
equals.addEventListener('click', () => {
    array.push(secondNum);
    console.log(array);
    if (array.length < 2) {
        screenDisplay.textContent = '';
    }
    operate(firstNum, sign, secondNum);
});


// clear button event listener 
clear.addEventListener('click', clearDisplay)

function clearDisplay() {
    screenDisplay.textContent = '';
    array = [];
    firstNum = undefined; 
    sign = undefined;
    secondNum = undefined;
}