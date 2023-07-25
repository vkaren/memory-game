function MemoryGame({ cardsContainer, playAgainBtn, selectLevelElem }) {
  this.levels = {
    easy: 16,
    medium: 36,
    hard: 64,
  };

  this.currentLevel = this.levels.medium; // Default
  this.availableCards = [];
  this.firstChosenCard = null;

  this.cardsContainer = cardsContainer;

  this.playAgainBtn = playAgainBtn;
  this.playAgainBtn.addEventListener("click", () => {
    this.reset();
    this.start();
  });

  selectLevelElem.addEventListener("change", this.selectLevel.bind(this));
}

MemoryGame.prototype.selectLevel = function (e) {
  const level = e.currentTarget.value;
  this.currentLevel = this.levels[level];

  this.reset();
  this.start();
};

MemoryGame.prototype.start = function () {
  // Get card values
  this.getCards();

  // Set grid template on cards container
  const grid = Math.sqrt(this.currentLevel);
  const gridTemplate = `repeat(${grid}, ${Math.floor(100 / grid - 1)}%)`;

  this.cardsContainer.style.gridTemplateColumns = gridTemplate;
  this.cardsContainer.style.gridTemplateRows = gridTemplate;

  // Create cards
  for (let i = 0; i < this.availableCards.length; i++) {
    const cardElem = this.createCardElem(i, this.availableCards[i]);

    this.cardsContainer.append(cardElem);
  }
};

MemoryGame.prototype.getCards = function () {
  while (this.availableCards.length < this.currentLevel) {
    let randomNum =
      Math.floor(Math.random() * (this.currentLevel / 2 - 1 + 1)) + 1;

    let indexAddedFirst = this.availableCards.indexOf(randomNum);
    let indexAddedSecond = this.availableCards.indexOf(
      randomNum,
      indexAddedFirst + 1
    );

    if (indexAddedFirst < 0 || indexAddedSecond < 0) {
      this.availableCards.push(randomNum);
    }
  }
};

MemoryGame.prototype.createCardElem = function (id, value) {
  const cardButton = document.createElement("button");
  cardButton.setAttribute("id", id);
  cardButton.setAttribute("class", "card");

  const cardFront = document.createElement("div");
  cardFront.setAttribute("class", "front");

  const cardBack = document.createElement("div");
  cardBack.setAttribute("class", "back");
  cardBack.textContent = value;

  cardButton.append(cardFront, cardBack);

  cardButton.addEventListener("mouseover", this.onHover);
  cardButton.addEventListener("mouseout", this.onHoverEnd);
  cardButton.addEventListener("touchstart", this.onHover);
  cardButton.addEventListener("touchend", this.onHoverEnd);
  cardButton.addEventListener("click", this.onClickCard.bind(this));

  return cardButton;
};

MemoryGame.prototype.onHover = function (e) {
  if (!e.currentTarget.disabled) {
    e.currentTarget.classList.add("hover");
  }
};

MemoryGame.prototype.onHoverEnd = function (e) {
  e.currentTarget.classList.remove("hover");
};

MemoryGame.prototype.onClickCard = function (e) {
  let chosenCard = e.currentTarget;

  chosenCard.classList.add("selected");

  if (this.firstChosenCard) {
    this.changeStateOfCards();

    let firstChosenCardValue = this.firstChosenCard.innerText;
    let firstChosenCardId = this.firstChosenCard.id;

    let chosenCardValue = chosenCard.innerText;
    let chosenCardId = chosenCard.id;

    if (
      firstChosenCardValue === chosenCardValue &&
      firstChosenCardId !== chosenCardId
    ) {
      setTimeout(() => this.cardsFound(chosenCard, chosenCardValue), 1000);
    } else {
      setTimeout(() => this.cardsNotFound(chosenCard), 1000);
    }
  } else {
    this.firstChosenCard = chosenCard;
  }
};

MemoryGame.prototype.cardsFound = function (chosenCard, chosenCardValue) {
  chosenCard.classList.add("found");
  this.firstChosenCard.classList.add("found");
  this.firstChosenCard = null;

  this.changeStateOfCards();
  this.updateAvailableCards(chosenCardValue);
};

MemoryGame.prototype.cardsNotFound = function (chosenCard) {
  chosenCard.classList.remove("selected");
  this.firstChosenCard.classList.remove("selected");
  this.firstChosenCard = null;

  this.changeStateOfCards();
};

MemoryGame.prototype.updateAvailableCards = function (cardToRemove) {
  let firstCardIndexToRemove = this.availableCards.indexOf(cardToRemove);
  let secondCardIndexToRemove = this.availableCards.indexOf(
    cardToRemove,
    firstCardIndexToRemove + 1
  );

  this.availableCards.splice(firstCardIndexToRemove, 1);
  this.availableCards.splice(secondCardIndexToRemove - 1, 1);

  if (this.availableCards.length === 0) {
    setTimeout(() => {
      this.playAgainBtn.classList.add("visible");
    }, 1000);
  }
};

MemoryGame.prototype.changeStateOfCards = function () {
  [...this.cardsContainer.children].forEach((cardElem) => {
    let isDisabled = !cardElem.disabled;

    if (isDisabled) {
      cardElem.classList.remove("hover");
    }

    cardElem.disabled = isDisabled;
  });
};

MemoryGame.prototype.reset = function () {
  this.playAgainBtn.classList.remove("visible");
  this.cardsContainer.innerHTML = "";
  this.availableCards = [];
  this.firstChosenCard = null;
};

Object.freeze(MemoryGame);
