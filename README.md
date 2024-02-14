# Memory game

<img src="./readme_imgs/app.png" width="300px">

This simple memory game is built using vanilla JavaScript.

## How it Works

The core game logic is encapsulated within a constructor function, which requires three DOM elements as parameters: cardsContainer, playAgainBtn, and selectLevelElem.

_js/app.js_

<img src="./readme_imgs/game.PNG" width="600px">

The start game method is responsible for getting the card values and creating them, each card has event listeners for hover and click interactions.

<img src="./readme_imgs/start.PNG" width="600px">

When an user clicks on a card, the game checks if there is already a chosen card. If not, the clicked card becomes the first chosen card. If there is a chosen card, all cards are temporarily disabled. The game then validates if the first chosen card is equal to the second chosen card. Depending on this validation, either the cardsFound or cardsNotFound function will be invoked.

<img src="./readme_imgs/onClick.PNG" width="600px">

In both the cardsFound and cardsNotFound functions, all cards are re-enabled for clicking, and the first chosen card property is reset to null. In the cardsFound function, the cards that have been successfully matched are removed from the available cards.

<img src="./readme_imgs/found.PNG" width="600px">

<img src="./readme_imgs/notfound.PNG" width="600px">

If no more available cards remain, the "Play Again" button becomes visible to the user.
