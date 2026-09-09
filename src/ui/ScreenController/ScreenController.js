import delay from "../../helpers/delay";

export default class ScreenController {
  constructor(startScreen, characterSelection, shipPlacement, game) {
    this.currentScreen = null;
    this.startScreen = startScreen;
    this.characterSelection = characterSelection;
    this.shipPlacement = shipPlacement;
    this.game = game;
    this.isTransition = false;
  }

  showStartScreen() {
    this.currentScreen = this.startScreen;
    this.startScreen.classList.remove("hidden");
  }

  async showCharacterSelection() {
    await this.changeScreen(this.characterSelection);
  }

  async showShipPlacement() {
    await this.changeScreen(this.shipPlacement);
  }

  async showGame() {
    await this.changeScreen(this.game);
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
