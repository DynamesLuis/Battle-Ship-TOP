export default class ScreenController {
  constructor(startScreen, characterSelection, shipPlacement, game) {
    this.currentScreen = null;
    this.startScreen = startScreen;
    this.characterSelection = characterSelection;
    this.shipPlacement = shipPlacement;
    this.game = game;
  }

  showStartScreen() {
    this.hideScreen();
    this.currentScreen = this.startScreen;
    this.startScreen.classList.remove("hidden");
  }
  showCharacterSelection() {
    this.hideScreen();
    this.currentScreen = this.characterSelection;
    this.characterSelection.classList.remove("hidden");
  }
  showShipPlacement() {
    this.hideScreen();
    this.currentScreen = this.shipPlacement;
    this.shipPlacement.classList.remove("hidden");
  }
  showGame() {
    this.hideScreen();
    this.currentScreen = this.game;
    this.game.classList.remove("hidden");
  }

  hideScreen() {
    if (this.currentScreen) {
      this.currentScreen.classList.add("hidden");
    }
  }
}
