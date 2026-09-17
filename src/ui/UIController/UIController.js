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
  $battleReport,
  $attackResult,
  $characterNameGameOver,
  $playAgainBtn,
} from "../domSelector";

import delay from "../../helpers/delay";
import typeWriter from "../../helpers/typeWriter";

export default class UIController {
  constructor(boardRender, game, player, audioController, onRestartGame) {
    this.boardRender = boardRender;
    this.game = game;
    this.player = player;
    this.audioController = audioController;
    this.isFinished = false;
    this.isPlayingRound = false;
    this.delay = 3100;
    this.onRestartGame = onRestartGame;
  }

  init() {
    this.initEvents();
    this.resetUI();
    this.boardRender.renderMyBoard($myBoardContainer);
    this.boardRender.renderEnemyBoard($enemyBoardContainer);
    this.renderInstuction();
  }

  initEvents() {
    this.handleEnemyBoardClickListener = (event) =>
      this.handleEnemyBoardClick(event);

    this.restartGameListener = () => this.onRestartGame();

    $enemyBoardContainer.addEventListener(
      "click",
      this.handleEnemyBoardClickListener,
    );

    $playAgainBtn.addEventListener("click", this.restartGameListener);
  }

  resetUI() {
    $enemyBoardContainer.classList.remove("desactivated");
    $attackResult.textContent = "";
    $battleMessage.textContent = `Your turn! Make your attack. Wait for the enemy to attack before
                attacking again.`;
  }

  destroy() {
    $enemyBoardContainer.removeEventListener(
      "click",
      this.handleEnemyBoardClickListener,
    );

    $playAgainBtn.removeEventListener("click", this.restartGameListener);
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
    this.audioController.playShot();
    const { playerResults, computerResults, winner } = this.game.playRound(
      x,
      y,
    );

    this.boardRender.renderEnemyBoard($enemyBoardContainer);
    await this.displayResults(playerResults, this.game.getPlayer1());

    if (computerResults) {
      await delay(this.delay);
      this.audioController.playShot();
      this.boardRender.renderMyBoard($myBoardContainer);
      await this.displayResults(computerResults, this.game.getPlayer2());
      if (!winner) {
        this.isPlayingRound = false;
      }
    }

    if (winner) {
      await delay(this.delay);
      this.finishGame(winner);
    }
  }

  renderInstuction() {
    const character = this.player.getCharacter();

    $characterImg.src = character.getImg();
    $characterName.textContent = `${character.getName()}:`;
  }

  finishGame(winner) {
    this.audioController.stopMusic();
    this.audioController.playVictory();
    this.isFinished = true;
    $enemyBoardContainer.classList.add("desactivated");
    this.displayModal(winner);
    $finishedGameModal.classList.remove("hidden");
  }

  displayModal(winner) {
    $characterImgGameOver.src = winner.getCharacter().getImg();
    $characterDialogueGameOver.textContent = `"${winner
      .getCharacter()
      .getRandomDialogue("win")}"`;
    $characterNameGameOver.textContent = winner.getCharacter().getName();
    $playerNameGameOver.textContent = winner.getName();
  }

  async displayResults(results, player) {
    const character = player.getCharacter();

    $battleReport.classList.add("fade-out");

    await delay(250);

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

    $attackResult.classList.remove("hit", "miss", "sunk");
    if (results.winner) {
      $attackResult.textContent = "sunk";
      $attackResult.classList.add("sunk");
    } else {
      $attackResult.textContent = action;
      $attackResult.classList.add(action);
    }

    switch (action) {
      case "miss":
        this.audioController.playMiss();
        break;
      case "hit":
        this.audioController.playHit();
        break;
      case "sunk":
        this.audioController.playSunk();
        break;
      case "win":
        this.audioController.playSunk();
      default:
        break;
    }

    if (action === "win") {
      action = "sunk";
    }
    const dialogue = character.getRandomDialogue(action);
    $battleReport.classList.remove("fade-out");
    await typeWriter($battleMessage, dialogue);
  }
}
