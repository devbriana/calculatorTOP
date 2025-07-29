# calculatorTOP
Foundations Course Project: Calculator

## About
A fully functional web-based calculator built with HTML, CSS, and JavaScript. Supports chained operations, decimals, percentages, and positive/negative toggling, along with responsive button feedback.

## Features
- Basic arithmetic operations: `+`, `-`, `×`, `÷`
- Chained calculations (e.g., `2 + 5 - 3 * 2 / 4`)
- Equals chaining (e.g., `1 + 5 = 6 + 2 = 8`)
- Decimal operations
- Percentage calculations (e.g., `55 → 0.55`)
- Positive/Negative toggle for any number
- Prevents display overflow (limits digits and rounds long decimals)
- Button press feedback:
  - All buttons use `:active` styling on click
  - Operator buttons (except equals) use a persistent `selected` class
- Clear and reset functionality

## Known Behavior
- Calculator handles chaining only when proper input is given (i.e., no incomplete expressions).
- Cannot begin a new operation with an operator (must start with a number).
- After equals, calculator can resume with continued math using the previous answer.

## How to Use
1. Open `index.html` in your browser.
2. Use the on-screen buttons to perform calculations.
3. Click `AC` to clear everything.
4. Click `±` to toggle sign after digit selected, `%` for percent, and `.` to insert a decimal.

## Tech Used
- HTML5  
- CSS3 
- Vanilla JavaScript

## License
This project is for educational purposes only.