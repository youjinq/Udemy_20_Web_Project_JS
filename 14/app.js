const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// keep track of  current card
let currentActiveCard = 0;

// store DOM cards
const cardsEl = [];

// store card data
// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

const cardsData =
  localStorage.getItem("cards") !== null
    ? JSON.parse(localStorage.getItem("cards"))
    : [];

// create all cards
function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

// create a single card
function createCard(data, index) {
  let { question, answer } = data;
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>${question}</p>
    </div>
    <div class="inner-card-back">
        <p>${answer}</p>
    </div>
</div>
</div>
    `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM card storage
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function switchtoRight() {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
}

function switchtoLeft() {
  cardsEl[currentActiveCard].className = "card";

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
}

function AddaCard() {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    // destructing
    const newCard = { question, answer };
    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
}

function setCardsData(cardsData) {
  localStorage.setItem("cards", JSON.stringify(cardsData));
  window.location.reload();
}

createCards();

// next button
// event listener with the index
nextBtn.addEventListener("click", switchtoRight);

// previous button
prevBtn.addEventListener("click", switchtoLeft);

showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// hideBtN
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

// add a new card
addCardBtn.addEventListener("click", () => {
  AddaCard();
});

// clear card btn
clearBtn.addEventListener("click", () => {
  localStorage.clear();

  cardsContainer.innerHTML = "";
  window.location.reload();
});

window.addEventListener("keydown", (e) => {
  if (e.which == 39 || e.keyCode == 39) {
    switchtoRight();
  } else if (e.which == 37 || e.keyCode == 37) {
    switchtoLeft();
  }
});
