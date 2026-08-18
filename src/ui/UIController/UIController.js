import { $enemyBoardContainer, $turnResult } from "../domSelector";

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

  handleEnemyBoardClick(event) {
    if (this.isFinished) {
      return;
    }
    
    const $target = event.target;

    if (!$target.classList.contains("cell")) {
      return;
    }

    const coordinates = $target.dataset.coordinate;
    const [x, y] = coordinates.split(",").map(Number);

    const turnResults = this.game.playTurn(x, y);
    this.displayResults(turnResults);
    this.boardRender.renderEnemyBoard($enemyBoardContainer);
    if (turnResults.winner) {
      this.finishGame(turnResults.winner);
    }
  }

  finishGame(winner) {
    $enemyBoardContainer.classList.add("desactivated");
    this.isFinished = true;
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
