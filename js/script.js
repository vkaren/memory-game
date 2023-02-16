document.getElementById('difficulty').addEventListener('change', selectDifficulty)

const container = document.getElementById("container-cards");
let difficulty = {easy: 25, medium: 36, hard: 64}
let difficultySelected = 36
let values = [];

function selectDifficulty(e){
   difficultySelected = difficulty[e.currentTarget.value]
   values = []
   container.innerHTML = ''
   loadCards()
}

function randomCardsValues() {

  while (values.length < difficultySelected) {
    let randomNum = Math.floor(Math.random() * ((difficultySelected/2) - 1 + 1)) + 1;
    let index = values.indexOf(randomNum);

    if (index === -1 || values.indexOf(randomNum, index + 1) === -1) {
      values.push(randomNum);
    }
  }
}

function loadCards() {
  
  randomCardsValues()
  const grid = Math.sqrt(values.length)

  if(grid === 5){
container.style.gridTemplateColumns = `repeat(${grid}, 18%)`
container.style.gridTemplateRows = `repeat(${grid}, 18%)`
  } else  if(grid === 6 ){
    container.style.gridTemplateColumns = `repeat(${grid}, 15%)`
    container.style.gridTemplateRows = `repeat(${grid}, 15%)`
      }
      else {
    container.style.gridTemplateColumns = `repeat(${grid}, 11%)`
    container.style.gridTemplateRows = `repeat(${grid}, 11%)`
  }

  let i = 0;
  while (i < values.length) {
    container.innerHTML += `
      <button id='card-${i}'>
        <div class='front'></div>
        <div class='back'>
          ${values[i]}
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
        availablesCards(currCardRevealed.innerText)
        changeStateCards();
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

function availablesCards(card){
const buttonPlayAgain = document.getElementById("play-again");

 let firstCard = values.indexOf(card)
 let secondCard = values.indexOf(card, firstCard+1)

 values.splice(0)
 //values.splice(firstCard,1)
 //values.splice(secondCard-1,1)
 
 if(values.length === 0){
  buttonPlayAgain.addEventListener('click', playAgain)
  buttonPlayAgain.classList.add('visible')
 }
}

function onMouseOver(event) {
  const card = event.currentTarget;
  card.classList.add("hover");
}

function onMouseOut(event) {
  const card = event.currentTarget;
  card.classList.remove("hover");
}
//font-family: 'Signika Negative', sans-serif;
function playAgain(){
  document.getElementById("play-again").classList.remove('visible')
  container.innerHTML = ''
  loadCards()
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
function cardsEvent(fn) {
  Object.values(container.children).forEach((card)=> {
   if(card.id !== 'play-again' ) {
     fn(card)
   }
   
  });
}

window.addEventListener('load',() => {
  randomCardsValues();
  loadCards()
} )