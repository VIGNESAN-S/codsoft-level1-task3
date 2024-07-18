document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;
            handleInput(value);
        });
    });

    function handleInput(value) {
        if (isDigit(value)) {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (isOperator(value)) {
            if (currentInput !== '') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    firstOperand = performCalculation(firstOperand, operator, parseFloat(currentInput));
                    updateDisplay(firstOperand);
                }
                operator = value;
                currentInput += ` ${value} `;
                updateDisplay(currentInput);
            }
        } else if (value === '=') {
            if (operator && currentInput !== '') {
                const parts = currentInput.split(' ');
                const secondOperand = parseFloat(parts[2]);
                const result = performCalculation(firstOperand, operator, secondOperand);
                updateDisplay(result);
                currentInput = result.toString();
                firstOperand = null;
                operator = null;
            }
        } else if (value === 'C') {
            currentInput = '';
            firstOperand = null;
            operator = null;
            updateDisplay('0');
        }
    }

    function updateDisplay(value) {
        display.innerText = value;
    }

    function isDigit(value) {
        return /\d/.test(value);
    }

    function isOperator(value) {
        return ['+', '-', '×', '÷'].includes(value);
    }

    function performCalculation(firstOperand, operator, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '×':
                return firstOperand * secondOperand;
            case '÷':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
});