// DOM Elements
const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
const themeToggle = document.getElementById('themeToggle');

// Ensure Buttons Work Properly
document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => {
    let value = btn.textContent;

    // Map "x" to "*" for multiplication
    if (value === 'x') value = '*';

    // Only process valid input or handle special functions
    if (value.match(/[\d+\-*/.^()]/)) {
      updateDisplay(value);
    } else {
      handleSpecialFunction(value);
    }
  });
});

// Utility Functions
const updateDisplay = (value) => (display.value += value);
const clearDisplay = () => (display.value = '');
const deleteLast = () => (display.value = display.value.slice(0, -1));
const clearHistory = () => (historyList.innerHTML = '');

// Perform Calculation
const calculate = () => {
  try {
    const result = eval(display.value); // Use eval carefully
    display.value =
      [Infinity, -Infinity].includes(result) || isNaN(result)
        ? 'Math Error'
        : result;
    addToHistory(`${display.value}`);
  } catch {
    display.value = 'Syntax Error';
  }
};

// Add Calculation to History
const addToHistory = (entry) => {
  if (historyList.children.length > 0 && historyList.children[0].textContent === entry) {
    return; // Prevent duplicate entries
  }
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
};

// Advanced Math Operations
const squareRoot = () => (display.value = Math.sqrt(+display.value) || 'Math Error');
const percentage = () => (display.value = (+display.value / 100).toString());
const reciprocal = () => (display.value = 1 / +display.value || 'Math Error');
const square = () => (display.value = Math.pow(+display.value, 2).toString());

// Memory Functions
let memory = 0;
const memoryAdd = () => (memory += +display.value || 0);
const memorySubtract = () => (memory -= +display.value || 0);
const memoryRecall = () => (display.value = memory.toString());
const memoryClear = () => (memory = 0);

// Handle Special Functions
const handleSpecialFunction = (value) => {
  switch (value) {
    case 'C':
      clearDisplay();
      break;
    case '←':
      deleteLast();
      break;
    case '=':
      calculate();
      break;
    case '√':
      squareRoot();
      break;
    case '%':
      percentage();
      break;
    case '1/x':
      reciprocal();
      break;
    case 'x²':
      square();
      break;
    case 'M+':
      memoryAdd();
      break;
    case 'M-':
      memorySubtract();
      break;
    case 'MR':
      memoryRecall();
      break;
    case 'MC':
      memoryClear();
      break;
    case 'Clear History':
      clearHistory();
      break;
    default:
      break;
  }
};

// Power Function (x^y)
const power = () => {
  const [base, exponent] = display.value.split('^').map(Number);
  display.value = base && exponent ? Math.pow(base, exponent).toString() : 'Syntax Error';
};

// Keyboard Support
document.addEventListener('keydown', ({ key }) => {
  if (/[\d+\-*/.^()]/.test(key)) updateDisplay(key);
  else if (key === 'Enter') calculate();
  else if (key === 'Backspace') deleteLast();
  else if (key === 'Escape') clearDisplay();
});

// Theme Toggle
themeToggle.addEventListener('change', () => document.body.classList.toggle('dark-mode'));