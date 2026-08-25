export default class AppController {
  constructor(appState, screenController) {
    this.appState = appState;
    this.screenController = screenController;
  }

  startApp() {
    this.screenController.showStartScreen();
  }

  startGame(playerName) {
    this.appState.setName(playerName);
    this.screenController.showCharacterSelection();
  }
}
