import {
  $enemyBoardContainer,
  $finishedGameModal,
  $myBoardContainer,
  $battleMessage,
  $characterImg,
  $characterName,
} from "../domSelector";

import delay from "../../helpers/delay";

export default class UIController {
  constructor(boardRender, game) {
    this.boardRender = boardRender;
    this.game = game;
    this.isFinished = false;
  }

  initEvents() {
    $enemyBoardContainer.addEventListener("click", (event) =>
      this.handleEnemyBoardClick(event),
    );
  }

  async handleEnemyBoardClick(event) {
    if (this.isFinished) {
      return;
    }

    const $target = event.target;

    if (!$target.classList.contains("cell")) {
      return;
    }

    const coordinates = $target.dataset.coordinate;
    const [x, y] = coordinates.split(",").map(Number);

    const { playerResults, computerResults, winner } = this.game.playRound(
      x,
      y,
    );

    this.boardRender.renderEnemyBoard($enemyBoardContainer);
    this.displayResults(playerResults, this.game.getPlayer1());

    if (computerResults) {
      await delay(2000);
      this.boardRender.renderMyBoard($myBoardContainer);
      this.displayResults(computerResults, this.game.getPlayer2());
    }

    if (winner) {
      this.finishGame(winner);
    }
  }

  finishGame(winner) {
    $enemyBoardContainer.classList.add("desactivated");
    this.isFinished = true;
    $finishedGameModal.classList.remove("hidden");
  }

  displayResults(results, player) {
    const character = player.getCharacter();
    if (results.winner) {
      $characterImg.src = character.getImg();
      $characterName.textContent = character.getName();
      $battleMessage.textContent = character.getRandomDialogue("win");
      return;
    }
    if (results.attackResult === "miss") {
      $characterImg.src = character.getImg();
      $characterName.textContent = character.getName();
      $battleMessage.textContent = character.getRandomDialogue("miss");
      return;
    } else if (results.sunkedShip) {
      $characterImg.src = character.getImg();
      $characterName.textContent = character.getName();
      $battleMessage.textContent = character.getRandomDialogue("sunk");
      return;
    } else {
      $characterImg.src = character.getImg();
      $characterName.textContent = character.getName();
      $battleMessage.textContent = character.getRandomDialogue("hit");
      return;
    }
  }
}
