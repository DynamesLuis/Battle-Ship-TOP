import createCharacter from "../modules/Character/CharacterFactory";

export default class AppController {
  constructor(appState, screenController) {
    this.appState = appState;
    this.screenController = screenController;
  }

  setCharacterSelectionController(characterSelectionController) {
    this.characterSelectionController = characterSelectionController;
  }

  startApp() {
    this.screenController.showStartScreen();
  }

  startGame(playerName, playerFaction) {
    this.appState.setName(playerName);
    this.appState.setPlayerFaction(playerFaction);
    this.characterSelectionController.init();
    this.screenController.showCharacterSelection();
  }

  startPlaceShips(playerCharacterSelection, enemyCharacterSelection) {
    const playerCharacter = createCharacter(
      playerCharacterSelection,
      this.appState.getPlayerFaction(),
    );
    const enemyCharacter = createCharacter(
      enemyCharacterSelection,
      this.appState.getPlayerFaction() === "horde" ? "alliance" : "horde",
    );
    this.appState.setCharacter1(playerCharacter);
    this.appState.setCharacter2(enemyCharacter);

    this.screenController.showShipPlacement();
  }
}
