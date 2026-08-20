import {
  $enemyBoardContainer,
  $finishedGameModal,
  $myBoardContainer,
  $turnResult,
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
    this.displayResults(playerResults);

    if (computerResults) {
      await delay(2000);
      this.boardRender.renderMyBoard($myBoardContainer);
      this.displayResults(computerResults);
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

  displayResults(results) {
    if (results.winner) {
      $turnResult.textContent = results.winner.getName();
      return;
    }
    if (results.attackResult === "miss") {
      $turnResult.textContent = results.attackResult;
      return;
    } else if (results.sunkedShip) {
      $turnResult.textContent = "sunk";
      return;
    } else {
      $turnResult.textContent = results.attackResult;
      return;
    }
  }
}
