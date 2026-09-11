import delay from "../../helpers/delay";

export default class ScreenController {
  constructor(
    startScreen,
    characterSelection,
    shipPlacement,
    game,
    audioController,
  ) {
    this.currentScreen = null;
    this.startScreen = startScreen;
    this.characterSelection = characterSelection;
    this.shipPlacement = shipPlacement;
    this.game = game;
    this.audioController = audioController;
    this.isTransition = false;
  }

  showStartScreen() {
    this.currentScreen = this.startScreen;
    this.startScreen.classList.remove("hidden");
    this.audioController.playMenuMusic();
  }

  async showCharacterSelection() {
    await this.changeScreen(this.characterSelection);
    this.audioController.playMenuMusic();
  }

  async showShipPlacement() {
    await this.changeScreen(this.shipPlacement);
    this.audioController.playMenuMusic();
  }

  async showGame() {
    await this.changeScreen(this.game);
    this.audioController.playBattleMusic();
  } 

  async changeScreen(newScreen) {
    if (this.currentScreen === newScreen || this.isTransition) return;

    this.isTransition = true;

    if (this.currentScreen) {
      this.currentScreen.classList.add("screen-exit");

      await delay(300);

      this.currentScreen.classList.add("hidden");
      this.currentScreen.classList.remove("screen-exit");
    }

    this.currentScreen = newScreen;

    newScreen.classList.remove("hidden");
    newScreen.classList.add("screen-enter");

    await delay(400);

    newScreen.classList.remove("screen-enter");
    this.isTransition = false;
  }
}
