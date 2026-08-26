export default class AppController {
  constructor(appState, screenController) {
    this.appState = appState;
    this.screenController = screenController;
  }

  startApp() {
    this.screenController.showStartScreen();
  }

  startGame(playerName, playerFaction) {
    this.appState.setName(playerName);
    this.appState.setPlayerFaction(playerFaction);
    this.screenController.showCharacterSelection();
  }

}
