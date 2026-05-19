let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    // Prevent multiple decimal points
    if (num === '.' && expression.includes('.')) {
        return;
    }
    
    // Reset display if it shows 0
    if (display.value === '0' && num !== '.') {
        expression = num;
        display.value = num;
    } else {
        expression += num;
        display.value = expression;
    }
}

function appendOperator(op) {
    // Prevent operator at the beginning
    if (expression === '') {
        return;
    }
    
    // Prevent multiple consecutive operators
    if (['+', '-', '*', '/'].includes(expression[expression.length - 1])) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    display.value = expression;
}

function calculate() {
    try {
        // Prevent calculation if expression ends with an operator
        if (['+', '-', '*', '/'].includes(expression[expression.length - 1])) {
            return;
        }
        
        const result = eval(expression);
        
        // Handle floating point precision
        display.value = Math.round(result * 100000000) / 100000000;
        expression = display.value.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

function clearDisplay() {
    expression = '';
    display.value = '0';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression || '0';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});