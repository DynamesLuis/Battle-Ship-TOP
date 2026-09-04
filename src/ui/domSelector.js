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
const $playerCharacters = document.querySelector("#player-characters");
const $enemyCharacters = document.querySelector("#enemy-characters");
const $nextBtn = document.querySelector(".nextButton");
const $factionInputs = document.querySelectorAll('[name="faction"]');
const $availableShips = document.querySelectorAll(".availableShips");
const $directionBtnContainer = document.querySelectorAll(
  ".direction-Btn-Container",
);
const $myBoardPlacement = document.querySelectorAll(
  ".player-placement-container",
);
const $startBattleBtn = document.querySelector(".start-battle");

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
  $playerCharacters,
  $enemyCharacters,
  $nextBtn,
  $factionInputs,
  $availableShips,
  $directionBtnContainer,
  $myBoardPlacement,
  $startBattleBtn,
};
