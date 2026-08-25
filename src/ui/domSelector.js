const $enemyBoardContainer = document.querySelector("#enemy-board");
const $myBoardContainer = document.querySelector("#my-board");
const $finishedGameModal = document.querySelector("#game-over-modal");
const $characterImg = document.querySelector(".character-portrait img");
const $characterName = document.querySelector(".character");
const $battleMessage = document.querySelector(".message");
const $characterImgGameOver = document.querySelector(
  ".game-over-character img",
);
const $characterDialogueGameOver = document.querySelector(".game-over-quote p");
const $playerNameGameOver = document.querySelector(".game-over-winner strong");
const $startScreen = document.querySelector(".startScreen");
const $characterSelection = document.querySelector(".characterSelection");
const $shipPlacement = document.querySelector(".shipPlacement");
const $game = document.querySelector(".game");
const $playerNameInput = document.querySelector("#playerName");
const $startAppBtn = document.querySelector(".start-app-btn");

export {
  $enemyBoardContainer,
  $myBoardContainer,
  $finishedGameModal,
  $characterImg,
  $characterName,
  $battleMessage,
  $characterImgGameOver,
  $characterDialogueGameOver,
  $playerNameGameOver,
  $startScreen,
  $characterSelection,
  $shipPlacement,
  $game,
  $startAppBtn,
  $playerNameInput,
};
