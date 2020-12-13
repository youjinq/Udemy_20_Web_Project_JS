const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// **************************************{FUNCTION}***********************************************
// fetch random user
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  console.log(user);
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000),
  };

  // add data function
  addData(newUser);
}

// double money -part 3
// ...data = include all data within user
function doubleMoney() {
  data = data.map((user) => {
    // console.log(user);
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// sort by richest -part 4 (descending)
function sortByRichest() {
  console.log();
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// filter to millionaire -part 5
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// reduce to count total -part 6
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl)
}

// add new obj to data array
function addData(obj) {
  data.push(obj);
  //   console.log(data);
  updateDOM();
}

// Update DOM

function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  //   For each
  providedData.forEach(function (item) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// **************************************{EVENT LISTENER}***********************************************

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
