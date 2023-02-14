const container = document.getElementById("container-cards");
const buttonPlayAgain = document.getElementById("play-again");
//buttonPlayAgain.style.display = "none";

let values = [];

function randomCardsValues() {
  while (values.length < 36) {
    let randomNum = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
    let index = values.indexOf(randomNum);

    if (index === -1 || values.indexOf(randomNum, index + 1) === -1) {
      values.push(randomNum);
    }
  }
}

function loadCards() {
  randomCardsValues();
  let i = 0;
  while (i < 36) {
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
       availablesCards(currCardRevealed.innerText)
        currCardRevealed.classList.add("found");
        previousCardRevealed.classList.add("found");
        previousCardRevealed = null;
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
 let firstCard = values.indexOf(card)
 let secondCard = values.indexOf(card, firstCard+1)

 values.splice(0)
 //values.splice(firstCard,1)
// values.splice(secondCard-1,1)
 if(values.length === 0){
  buttonPlayAgain.style.color = 'white'
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

window.addEventListener('load', loadCards)