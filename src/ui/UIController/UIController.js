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
} from "../domSelector";

import delay from "../../helpers/delay";
import typeWriter from "../../helpers/typeWriter";

export default class UIController {
  constructor(boardRender, game, player, audioController) {
    this.boardRender = boardRender;
    this.game = game;
    this.player = player;
    this.audioController = audioController;
    this.isFinished = false;
    this.isPlayingRound = false;
    this.delay = 3100;
  }

  init() {
    this.initEvents();
    this.boardRender.renderMyBoard($myBoardContainer);
    this.boardRender.renderEnemyBoard($enemyBoardContainer);
    this.renderInstuction();
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
      this.isPlayingRound = false;
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
    $characterDialogueGameOver.textContent = winner
      .getCharacter()
      .getRandomDialogue("win");
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
      default:
        break;
    }

    const dialogue = character.getRandomDialogue(action);
    $battleReport.classList.remove("fade-out");
    await typeWriter($battleMessage, dialogue);
  }
}
