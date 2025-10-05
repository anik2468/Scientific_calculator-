const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function insertFunction(func) {
    if (func === 'sin') {
        display.value += 'sin(';
    } else if (func === 'cos') {
        display.value += 'cos(';
    } else if (func === 'tan') {
        display.value += 'tan(';
    } else if (func === 'sqrt') {
        display.value += '√(';
    } else if (func === 'pow') {
        display.value += '^';
    } else if (func === 'log') {
        display.value += 'log(';
    } else if (func === 'ln') {
        display.value += 'ln(';
    }
}

function calculate() {
    let expression = display.value;

    try {
        // Convert trig functions to radians directly in expression
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * (Math.PI / 180))');
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * (Math.PI / 180))');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * (Math.PI / 180))');

        // Replace sqrt symbol with Math.sqrt
        expression = expression.replace(/√\(/g, 'Math.sqrt(');

        // Replace power (caret) with JS exponent operator
        expression = expression.replace(/\^/g, '**');

        // Replace log and ln
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');

        let result = eval(expression);
        display.value = result;
    } catch (err) {
        display.value = "Error";
    }
}

function deleteChar() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = "";
}

// Keyboard input support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9+\-*/.^()]/.test(key)) {
        event.preventDefault(); // Prevent default typing
        appendValue(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        event.preventDefault();
        deleteChar();
    } else if (key === "Escape") {
        event.preventDefault();
        clearDisplay();
    }
});
