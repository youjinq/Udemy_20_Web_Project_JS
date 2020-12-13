const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// use array instead of LS this time

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// STORAGE
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transaction")
);

// let transactions = dummyTransactions;

// condition
let transactions =
  localStorage.getItem("transaction") !== null
    ? localStorageTransactions
    : [];

// add transaction to dom list -1
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  //  create list
  const item = document.createElement("li");
  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

// update the balance,income and expense -2

function updateValue() {
  // loop through object.amount
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//  add item
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      // convert to number from string from input
      amount: +amount.value,
    };

    transactions.push(transaction);
    // update list of single 
    addTransactionDOM(transaction);
    // load
    updateValue();

    // update LS
    updateLocalStorage();

    // clear

    text.value = "";
    amount.value = "";
  }
}
// generate random ID

function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// remove item by filter id

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);

  // update localstorage

  updateLocalStorage();
  console.log(transactions);

  init();
}

// update LS -4

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// function init app -1

function init() {
  list.innerHTML = "";

  if (transactions !== null) {
    transactions.forEach(addTransactionDOM);
  }

  updateValue();
}

init();

form.addEventListener("submit", addTransaction);
