import createCharacter from "../modules/Character/CharacterFactory";
import Computer from "../modules/Computer/Computer";
import Player from "../modules/Player/Player";
import computerShipPlacer from "../modules/Computer/computerShipPlacer";
import Game from "../modules/Game/Game";
import UIController from "../ui/UIController/UIController";
import BoardRender from "../ui/BoardRender/BoardRender";
import ShipPlacementController from "../ui/ShipPlacementController/ShipPlacementController";

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

    const player1 = new Player(
      this.appState.getName(),
      this.appState.getCharacter1(),
    );

    this.appState.setPlayer1(player1);

    const shipPlacementController = new ShipPlacementController(
      this.appState,
      this.startBattle.bind(this),
    );
    shipPlacementController.init();
    this.screenController.showShipPlacement();
  }

  startBattle() {
    const player1 = this.appState.getPlayer1();
    const computerCharacter = this.appState.getCharacter2();
    const player2 = new Computer(
      computerCharacter.getName(),
      computerCharacter,
    );
    this.appState.setPlayer2(player2);
    computerShipPlacer(this.appState.getPlayer2().getGameBoard());
    const game = new Game(player1, this.appState.getPlayer2());
    this.appState.setGame(game);

    const boardRender = new BoardRender(
      this.appState.getPlayer1().getGameBoard(),
      this.appState.getPlayer2().getGameBoard(),
    );
    const uiController = new UIController(boardRender, this.appState.getGame());

    uiController.initEvents();
    this.screenController.showGame();
  }
}
