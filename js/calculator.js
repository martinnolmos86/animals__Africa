// Initialize variables
let currentResult = 0;
let currentInput = '0';
let operator = null;
let waitingForSecondOperand = false;

// Get DOM elements
const resultOutput = document.querySelector('.calculator__output--result');
const inputOutput = document.querySelector('.calculator__output--input');
const calculatorButtons = document.querySelectorAll('.calculator__button');

// Function to update the result output
function updateResultOutput() {
  resultOutput.textContent = currentResult;
}

// Function to update the input output
function updateInputOutput() {
  inputOutput.textContent = currentInput;
}

// Function to handle number button clicks
function handleNumberButtonClick(number) {
  if (currentInput === '0' && number !== '.') {
    currentInput = '';
  }

  if (waitingForSecondOperand) {
    currentInput = '';
    waitingForSecondOperand = false;
  }

  currentInput += number;
  updateInputOutput();
}

// Function to handle operator button clicks
function handleOperatorButtonClick(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (operator === '+') {
    currentResult += inputValue;
  } else if (operator === '-') {
    currentResult -= inputValue;
  } else if (operator === '*') {
    currentResult *= inputValue;
  } else if (operator === '/') {
    currentResult /= inputValue;
  } else {
    currentResult = inputValue;
  }

  currentInput = '';
  waitingForSecondOperand = true;
  operator = nextOperator;
  updateResultOutput();
  updateInputOutput();
}

// Function to handle decimal button clicks
function handleDecimalButtonClick() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }

  updateInputOutput();
}

// Function to handle clear button click
function handleClearButtonClick() {
  currentResult = 0;
  currentInput = '0';
  operator = null;
  waitingForSecondOperand = false;
  updateResultOutput();
  updateInputOutput();
}

// Loop through calculator buttons and add click event listeners
calculatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('calculator__button--number')) {
      handleNumberButtonClick(button.textContent);
    } else if (button.classList.contains('calculator__button--operator')) {
      handleOperatorButtonClick(button.textContent);
    } else if (button.classList.contains('calculator__button--decimal')) {
      handleDecimalButtonClick();
    } else if (button.classList.contains('calculator__button--clear')) {
      handleClearButtonClick();
    }
  });
});

// Update result and input output on page load
updateResultOutput();
updateInputOutput();
