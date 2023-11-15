let fromCurrencyBtns = document.querySelectorAll(".b");
let toCurrencyBtns = document.querySelectorAll(".c");
let inputs = document.querySelectorAll("input");
let elements = document.querySelectorAll('.a1 button');
let elements2 = document.querySelectorAll('.a2 button');
document.addEventListener('content', function () {
    const currencyButtonsLeft = document.querySelectorAll('.left button');
    const currencyButtonsRight = document.querySelectorAll('.right button');
    currencyButtonsLeft.forEach(function (button) {
        button.addEventListener('click', function () {
            currencyButtonsLeft.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
    currencyButtonsRight.forEach(function (button) {
        button.addEventListener('click', function () {
            currencyButtonsRight.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
});
document.addEventListener('content', function () {
    const inputFields = document.querySelectorAll('input');

    inputFields.forEach(function (input) {
        input.addEventListener('input', function () {
            if (parseFloat(input.value) < 0) {
                input.value = '';
            }
        });
    });
});
const url = 'https://api.currencybeacon.com/v1/convert'
const apikey = 'QkhqFAE15GqCjGgVpZosa8hcxhTjLqF4'
const currency1 = 'RUB'
const currency2 = 'USD'
const apiurl = `${url}?api_key=${apikey}&from=${currency1}&to=${currency2}&amount${1}`
fetch(apiurl)
.then(res=>res.json)
.then(data=>{
    console.log(data);
})
function getExchange(from, to, amount, input) {
    fetch(`https://v6.exchangerate-api.com/v6/a4a5661764e25182a524d47d/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            let exchange = data.conversion_rates[to];
            let enteredAmount = parseFloat(amount);
            if (!isNaN(enteredAmount)) {
                let convertedAmount = (enteredAmount * exchange).toFixed(4);
                input.value = convertedAmount;
                document.getElementById('one').innerText = `1 ${from} = ${exchange.toFixed(4)} ${to}`;
                document.getElementById('two').innerText = `1 ${to} = ${(1 / exchange).toFixed(4)} ${from}`;
            } else {
            }
        })
}
let fromCurrency = "RUB";
let toCurrency = "USD";
function updateCurrency(event) {
    if (event.target.classList.contains("b")) {
        fromCurrency = event.target.innerText;
        handleButton(event.target, 'a1');
    } else if (event.target.classList.contains("a2")) {
        toCurrency = event.target.innerText;
        handleButton(event.target, 'c');
    }
    getExchange(fromCurrency, toCurrency, inputs[0].value, inputs[1]);
}
fromCurrencyBtns.forEach(button => {
    button.addEventListener("click", updateCurrency);
});
toCurrencyBtns.forEach(button => {
    button.addEventListener("click", updateCurrency);
});
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (index === 0) {
            getExchange(fromCurrency, toCurrency, input.value, inputs[1]);
        } else {
            getExchange(toCurrency, fromCurrency, input.value, inputs[0]);
        }
    });
});
elements.forEach(but1 => {
    but1.addEventListener('click', function() {
        handleButton(but1, 'a1');
        updateCurrency({ target: but1 });
    });
});
elements2.forEach(but2 => {
    but2.addEventListener('click', function() {
        handleButton(but2, 'a2');
        updateCurrency({ target: but2 });
    });
});
function handleButton(item, aClass) {
    const activeButtons = document.querySelectorAll(`.${aClass} .active`);
    if (!item.classList.contains('active')) {
        if (activeButtons.length > 0) {
            activeButtons[0].classList.remove('active');
        }
        item.classList.add('active');
        item.style.display = 'inline-block';
    }
    document.querySelectorAll(`.${aClass} button`).forEach(button => {
        if (button !== item && !button.classList.contains('active')) {
            button.style.display = 'inline-block';
        }
    });
    if (aClass === 'a1') {
        fromCurrency = item.innerText;
    } else if (aClass === 'a2') {
        toCurrency = item.innerText;
    }
}