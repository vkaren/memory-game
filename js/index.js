window.addEventListener("load", () => {
  let cardsContainer = document.querySelector(".cards_container");
  let playAgainBtn = document.querySelector(".play-again_btn");
  let selectLevelElem = document.querySelector("#levels");

  let game = new MemoryGame({ cardsContainer, playAgainBtn, selectLevelElem });

  game.start();
});
