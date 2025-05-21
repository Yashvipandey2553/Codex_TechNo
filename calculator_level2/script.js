
const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('.btn');


let currentCalculation = '';
let lastResult = '';
let calculationDone = false;


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (value === 'clear') {
            clearAll();
        } else if (value === 'del') {
            deleteLastChar();
        } else if (value === 'ans') {
            insertLastResult();
        } else if (value === 'ENTER') {
            evaluateCalculation();
        } else if (value === '±') {
            toggleSign();
        } else if (value === '√') {
            calculateSquareRoot();
        } else {
            appendValue(value);
        }
        
        updateDisplay();
    });
});


function clearAll() {
    currentCalculation = '';
    calculationDone = false;
}

function deleteLastChar() {
    if (calculationDone) {
        clearAll();
    } else {
        currentCalculation = currentCalculation.slice(0, -1);
    }
}

function insertLastResult() {
    if (lastResult) {
        if (calculationDone) {
            currentCalculation = lastResult;
            calculationDone = false;
        } else {
            currentCalculation += lastResult;
        }
    }
}

function appendValue(value) {
  
    if (calculationDone) {
        if ('0123456789.('.includes(value)) {
            currentCalculation = value;
            calculationDone = false;
        } else {
            currentCalculation = lastResult + value;
            calculationDone = false;
        }
    } else {
       
        let appendValue = value;
        if (value === '×') appendValue = '*';
        if (value === '÷') appendValue = '/';
        if (value === '−') appendValue = '-';
        
        currentCalculation += appendValue;
    }
}

function toggleSign() {
    if (currentCalculation) {
       
        const regex = /(-?\d*\.?\d+)$/;
        const match = currentCalculation.match(regex);
        
        if (match) {
            const lastNumber = match[0];
            const position = currentCalculation.lastIndexOf(lastNumber);
            const toggledNumber = parseFloat(lastNumber) * -1;
            
            currentCalculation = 
                currentCalculation.substring(0, position) + 
                toggledNumber.toString();
        }
    }
}

function calculateSquareRoot() {
    if (currentCalculation) {
        try {
            
            if (calculationDone) {
                currentCalculation = `Math.sqrt(${lastResult})`;
            } else {
             
                currentCalculation = `Math.sqrt(${currentCalculation})`;
            }
            evaluateCalculation();
        } catch (error) {
            resultDisplay.textContent = 'Error';
        }
    } else {
        currentCalculation = 'Math.sqrt(0)';
        evaluateCalculation();
    }
}

function evaluateCalculation() {
    try {
      
        let calcString = currentCalculation.replace(/(\d+)%/g, function(match, number) {
            return number / 100;
        });
        
       
        calcString = calcString.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        
    
        const result = eval(calcString);
        
        if (isNaN(result) || !isFinite(result)) {
            resultDisplay.textContent = 'Error';
        } else {
          
            let formattedResult;
            if (Number.isInteger(result)) {
                formattedResult = result.toString();
            } else {
                formattedResult = result.toFixed(8).replace(/\.?0+$/, '');
            }
            
            lastResult = formattedResult;
            resultDisplay.textContent = formattedResult;
            calculationDone = true;
        }
    } catch (error) {
        resultDisplay.textContent = 'Error';
    }
}

function updateDisplay() {
   
    calculationDisplay.textContent = currentCalculation || '0';
    
 
    if (!calculationDone && currentCalculation) {
        resultDisplay.textContent = currentCalculation;
    } else if (!calculationDone && !currentCalculation) {
        resultDisplay.textContent = '0';
    }
}

updateDisplay();