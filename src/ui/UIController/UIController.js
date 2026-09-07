import {
  $enemyBoardContainer,
  $finishedGameModal,
  $myBoardContainer,
  $battleMessage,
  $characterImg,
  $characterName,
  $characterDialogueGameOver,
  $characterImgGameOver,
  $playerNameGameOver,
} from "../domSelector";

import delay from "../../helpers/delay";

export default class UIController {
  constructor(boardRender, game) {
    this.boardRender = boardRender;
    this.game = game;
    this.isFinished = false;
    this.isPlayingRound = false;
    this.delay = 3250;
  }

  init() {
    this.initEvents();
    this.boardRender.renderMyBoard($myBoardContainer);
    this.boardRender.renderEnemyBoard($enemyBoardContainer);
  }

  initEvents() {
    $enemyBoardContainer.addEventListener("click", (event) =>
      this.handleEnemyBoardClick(event),
    );
  }

  async handleEnemyBoardClick(event) {
    if (this.isFinished || this.isPlayingRound) {
      return;
    }
    
    const $target = event.target;
    
    if (!$target.classList.contains("cell")) {
      return;
    }
    
    this.isPlayingRound = true;
    const coordinates = $target.dataset.coordinate;
    const [x, y] = coordinates.split(",").map(Number);

    const { playerResults, computerResults, winner } = this.game.playRound(
      x,
      y,
    );

    this.boardRender.renderEnemyBoard($enemyBoardContainer);
    this.displayResults(playerResults, this.game.getPlayer1());

    if (computerResults) {
      await delay(this.delay);
      this.boardRender.renderMyBoard($myBoardContainer);
      this.displayResults(computerResults, this.game.getPlayer2());
      this.isPlayingRound = false;
    }

    if (winner) {
      await delay(this.delay);
      this.finishGame(winner);
    }

  }

  finishGame(winner) {
    this.isFinished = true;
    $enemyBoardContainer.classList.add("desactivated");
    this.displayModal(winner);
    $finishedGameModal.classList.remove("hidden");
  }

  displayModal(winner) {
    $characterImgGameOver.src = winner.getCharacter().getImg();
    $characterDialogueGameOver.textContent = winner
      .getCharacter()
      .getRandomDialogue("win");
    $playerNameGameOver.textContent = winner.getName();
  }

  displayResults(results, player) {
    const character = player.getCharacter();

    $characterImg.src = character.getImg();
    $characterName.textContent = `${character.getName()}:`;

    let action;

    if (results.winner) {
      action = "win";
    } else if (results.attackResult === "miss") {
      action = "miss";
    } else if (results.sunkedShip) {
      action = "sunk";
    } else {
      action = "hit";
    }

    $battleMessage.textContent = character.getRandomDialogue(action);
  }
}
