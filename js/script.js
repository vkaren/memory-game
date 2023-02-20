document
  .getElementById("difficulty")
  .addEventListener("change", selectDifficulty);

const container = document.getElementById("container-cards");
const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", playAgain);
const difficulty = { easy: 16, medium: 36, hard: 64 };
let difficultySelected = difficulty.medium;
let cardValues = [];

function selectDifficulty(e) {
  difficultySelected = difficulty[e.currentTarget.value];
  playAgainButton.classList.remove("visible");
  container.innerHTML = "";
  cardValues = [];
  loadCards();
}

function randomCardsValues() {
  while (cardValues.length < difficultySelected) {
    let randomNum =
      Math.floor(Math.random() * (difficultySelected / 2 - 1 + 1)) + 1;
    let index = cardValues.indexOf(randomNum);

    if (index === -1 || cardValues.indexOf(randomNum, index + 1) === -1) {
      cardValues.push(randomNum);
    }
  }
}

function loadCards() {
  randomCardsValues();

  const grid = Math.sqrt(difficultySelected);
  const gridTemplate = `repeat(${grid}, ${Math.floor(100 / grid - 1)}%)`;

  container.style.gridTemplateColumns = gridTemplate;
  container.style.gridTemplateRows = gridTemplate;

  let i = 0;
  while (i < cardValues.length) {
    container.innerHTML += `
      <button id='card-${i}'>
        <div class='front'></div>
        <div class='back'>
          ${cardValues[i]}
        </div>
      </button>
    `;
    i++;
  }

  cardsEvent((card) => {
    card.addEventListener("mouseover", onMouseOver);
    card.addEventListener("mouseout", onMouseOut);
    card.addEventListener("click", onClickCard);
  });
}

let previousCardRevealed = null;
function onClickCard(event) {
  let currCardRevealed = event.currentTarget;
  currCardRevealed.classList.add("selected");

  if (previousCardRevealed) {
    changeStateCards();

    if (
      previousCardRevealed.innerText === currCardRevealed.innerText &&
      previousCardRevealed.id !== currCardRevealed.id
    ) {
      setTimeout(() => {
        currCardRevealed.classList.add("found");
        previousCardRevealed.classList.add("found");
        previousCardRevealed = null;
        changeStateCards();
        availablesCards(currCardRevealed.innerText);
      }, 1000);
    } else {
      setTimeout(() => {
        previousCardRevealed.classList.remove("selected");
        currCardRevealed.classList.remove("selected");
        previousCardRevealed = null;
        changeStateCards();
      }, 1000);
    }
  } else {
    previousCardRevealed = currCardRevealed;
  }
}

function availablesCards(card) {
  // const buttonPlayAgain = document.getElementById("play-again");
  let firstCard = cardValues.indexOf(card);
  let secondCard = cardValues.indexOf(card, firstCard + 1);

  cardValues.splice(firstCard, 1);
  cardValues.splice(secondCard - 1, 1);

  if (cardValues.length === 0) {
    setTimeout(() => {
      playAgainButton.classList.add("visible");
    }, 1000);
  }
}

function playAgain() {
  playAgainButton.classList.remove("visible");
  container.innerHTML = "";
  loadCards();
}

function changeStateCards() {
  cardsEvent((card) => {
    card.disabled = !card.disabled;
    if (card.disabled) {
      card.classList.remove("hover");
      card.removeEventListener("mouseover", onMouseOver);
      card.removeEventListener("mouseout", onMouseOut);
    } else {
      card.addEventListener("mouseover", onMouseOver);
      card.addEventListener("mouseout", onMouseOut);
    }
  });
}

function onMouseOver(event) {
  const card = event.currentTarget;
  card.classList.add("hover");
}
function onMouseOut(event) {
  const card = event.currentTarget;
  card.classList.remove("hover");
}
function cardsEvent(fn) {
  Object.values(container.children).forEach((card) => fn(card));
}

window.addEventListener("load", () => loadCards());
