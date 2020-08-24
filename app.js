const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moenyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const textField = document.getElementById("text");
const amountField = document.getElementById("amount");

// const dummyTransactions = [
//     {id: 1, text: "Flower", amount: -20},
//     {id: 2, text: "Salary", amount: 320},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "Camera", amount: 120},
// ];

let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Functions
// Add Transactions
function addTransactionDOM(transaction) {
    // Get Sign
    const sign = transaction.amount > 0 ? "+" : "-"
    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount > 0 ? "plus" : "minus");
    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button></li>
    `;
    list.appendChild(item)
}

// Update balance (Income & Expense)
function updateValues() {
    let amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
                .toFixed(2);
    const expense = (amounts
        .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerText = `${total}`;
    moneyPlus.innerText = `$${income}`
    moenyMinus.innerText = `$${expense}`

}

function addTransaction(e) {
    e.preventDefault();
    if (textField.value.trim() === "" || amountField.value.trim() === "") {
        alert("Please add a text and an amount")
    } else {
        const transaction = {
            id: generateId(),
            text: textField.value.trim(),
            amount: +amountField.value.trim()
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        textField.value = "";
        amountField.value = "";
    }
}

function generateId() {
    return Math.floor(Math.random() * 100000000);
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// App Init
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM)
    updateValues();
}

init();

// Listeners
form.addEventListener("submit", addTransaction);