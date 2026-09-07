import AppController from "./AppController";
import Player from "../modules/Player/Player";
import Computer from "../modules/Computer/Computer";
import computerShipPlacer from "../modules/Computer/computerShipPlacer";
import Game from "../modules/Game/Game";
import UIController from "../ui/UIController/UIController";
import BoardRender from "../ui/BoardRender/BoardRender";
import ShipPlacementController from "../ui/ShipPlacementController/ShipPlacementController";

let mockCreateCharacter;
let mockComputer;

jest.mock("../ui/ShipPlacementController/ShipPlacementController", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../ui/BoardRender/BoardRender", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../ui/UIController/UIController", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../modules/Game/Game", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../modules/Computer/computerShipPlacer", () => ({
  __esModule: true,
  default: (...args) => jest.fn(),
}));

jest.mock("../modules/Character/CharacterFactory", () => ({
  __esModule: true,
  default: (...args) => mockCreateCharacter(...args),
}));
jest.mock("../modules/Player/Player", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../modules/Computer/Computer", () => ({
  __esModule: true,
  default: jest.fn((...args) => {
    mockComputer = {
      args,
    };

    return mockComputer;
  }),
}));

describe.skip("AppController", () => {
  let appController;
  let appState;
  let screenController;
  let characterSelectionController;
  let player;
  let computerPlayer;
  let computerCharacter;
  let computerBoard;
  let playerBoard;
  let game;
  let boardRender;
  let uiController;
  let shipPlacementController;

  beforeEach(() => {
    jest.clearAllMocks();
    Player.mockReset();

    shipPlacementController = {
      init: jest.fn(),
    };

    boardRender = {};
    uiController = {
      init: jest.fn(),
    };

    playerBoard = {};
    player = {
      getGameBoard: jest.fn().mockReturnValue(playerBoard),
    };
    game = {};

    computerCharacter = {
      getName: jest.fn().mockReturnValue("Arthas"),
    };
    computerBoard = {};
    computerPlayer = {
      getGameBoard: jest.fn().mockReturnValue(computerBoard),
    };

    appState = {
      setName: jest.fn(),
      setPlayerFaction: jest.fn(),
      setCharacter1: jest.fn(),
      setCharacter2: jest.fn(),
      setPlayer1: jest.fn(),
      setPlayer2: jest.fn(),
      getName: jest.fn(),
      getPlayerFaction: jest.fn(),
      getCharacter1: jest.fn(),
      getCharacter2: jest.fn().mockReturnValue(computerCharacter),
      getPlayer1: jest.fn().mockReturnValue(player),
      getPlayer2: jest.fn().mockReturnValue(computerPlayer),
      setGame: jest.fn(),
      getGame: jest.fn().mockReturnValue(game),
    };

    screenController = {
      showStartScreen: jest.fn(),
      showCharacterSelection: jest.fn(),
      showShipPlacement: jest.fn(),
      showGame: jest.fn(),
    };

    characterSelectionController = {
      init: jest.fn(),
    };

    mockCreateCharacter = jest.fn();
    Game.mockReturnValue(game);
    BoardRender.mockReturnValue(boardRender);
    UIController.mockReturnValue(uiController);
    ShipPlacementController.mockReturnValue(shipPlacementController);

    appController = new AppController(appState, screenController);
    appController.setCharacterSelectionController(characterSelectionController);
  });

  test("can be created", () => {
    expect(appController).toBeDefined();
  });

  test("start shows the start screen", () => {
    appController.startApp();

    expect(screenController.showStartScreen).toHaveBeenCalled();
  });

  //startGame
  test("startGame stores the player name and shows character selection", () => {
    appController.startGame("Luis", "horde");

    expect(appState.setName).toHaveBeenCalledWith("Luis");

    expect(screenController.showCharacterSelection).toHaveBeenCalled();
  });

  test("startGame stores the player faction and shows character selection", () => {
    appController.startGame("Luis", "horde");

    expect(appState.setPlayerFaction).toHaveBeenCalledWith("horde");

    expect(screenController.showCharacterSelection).toHaveBeenCalled();
  });

  //startPlacingShip
  test("startPlaceShips creates the player character using the factory", () => {
    const playerCharacter = {
      getName: jest.fn().mockReturnValue("Anduin Wrynn"),
    };

    appState.getPlayerFaction.mockReturnValue("alliance");
    mockCreateCharacter.mockReturnValueOnce(playerCharacter);

    appController.startPlaceShips("1", "6");

    expect(mockCreateCharacter).toHaveBeenCalledWith("1", "alliance");

    expect(appState.setCharacter1).toHaveBeenCalledWith(playerCharacter);
  });

  test("startPlaceShips creates the enemy character using the factory", () => {
    const enemyCharacter = {
      getName: jest.fn().mockReturnValue("Sylvanas Windrunner"),
    };

    mockCreateCharacter
      .mockReturnValueOnce({})
      .mockReturnValueOnce(enemyCharacter);

    appState.getPlayerFaction.mockReturnValue("alliance");

    appController.startPlaceShips("1", "7");

    expect(mockCreateCharacter).toHaveBeenNthCalledWith(2, "7", "horde");

    expect(appState.setCharacter2).toHaveBeenCalledWith(enemyCharacter);
  });

  test("startPlaceShips shows the ship placement screen", () => {
    appController.startPlaceShips("character1", "character2");

    expect(screenController.showShipPlacement).toHaveBeenCalled();
  });

  test("startPlaceShips creates the player and stores it in appState", () => {
    const playerCharacter = {
      getName: jest.fn().mockReturnValue("Anduin Wrynn"),
    };

    const player = {
      getName: jest.fn().mockReturnValue("Luis"),
      getCharacter: jest.fn().mockReturnValue(playerCharacter),
    };

    appState.getName.mockReturnValue("Luis");
    appState.getPlayerFaction.mockReturnValue("alliance");
    appState.getCharacter1.mockReturnValue(playerCharacter);

    mockCreateCharacter.mockReturnValueOnce(playerCharacter);
    Player.mockReturnValueOnce(player);

    appController.startPlaceShips("1", "6");

    expect(Player).toHaveBeenCalledWith("Luis", playerCharacter);

    expect(appState.setPlayer1).toHaveBeenCalledWith(player);
  });

  test("creates a ShipPlacementController with AppState and startBattle callback", () => {
    appController.startPlaceShips();

    expect(ShipPlacementController).toHaveBeenCalledWith(
      appState,
      expect.any(Function),
    );
  });

  test("initializes the ShipPlacementController", () => {
    appController.startPlaceShips();

    expect(shipPlacementController.init).toHaveBeenCalled();
  });

  //startBattle

  test("gets the Player from AppState", () => {
    appController.startBattle();

    expect(appState.getPlayer1).toHaveBeenCalled();
  });

  test("gets the opponent Character from AppState", () => {
    appController.startBattle();

    expect(appState.getCharacter2).toHaveBeenCalled();
  });

  test("gets the opponent character name", () => {
    appController.startBattle();

    expect(computerCharacter.getName).toHaveBeenCalled();
  });

  test("creates a Computer with the opponent Character", () => {
    appController.startBattle();

    expect(Computer).toHaveBeenCalledWith(
      computerCharacter.getName(),
      computerCharacter,
    );
  });

  test("stores the Computer in AppState", () => {
    appController.startBattle();

    expect(appState.setPlayer2).toHaveBeenCalledWith(mockComputer);
  });

  test("gets the Player from AppState", () => {
    appController.startBattle();

    expect(appState.getPlayer1).toHaveBeenCalled();
  });

  test("gets the Computer from AppState", () => {
    appController.startBattle();

    expect(appState.getPlayer2).toHaveBeenCalled();
  });

  test("creates a Game with the Player and Computer", () => {
    appController.startBattle();

    expect(Game).toHaveBeenCalledWith(player, computerPlayer);
  });

  test("stores the Game in AppState", () => {
    appController.startBattle();

    expect(appState.setGame).toHaveBeenCalledWith(game);
  });

  test("gets the Game from AppState", () => {
    appController.startBattle();

    expect(appState.getGame).toHaveBeenCalled();
  });

  test("gets the GameBoard from the Player and Computer", () => {
    appController.startBattle();

    expect(player.getGameBoard).toHaveBeenCalled();
    expect(computerPlayer.getGameBoard).toHaveBeenCalled();
  });

  test("creates a BoardRenderer with both GameBoards", () => {
    appController.startBattle();

    expect(BoardRender).toHaveBeenCalledWith(playerBoard, computerBoard);
  });

  test("creates a UIController with the Game and BoardRenderer", () => {
    appController.startBattle();

    expect(UIController).toHaveBeenCalledWith(game, boardRender);
  });

  test("initializes the UIController", () => {
    appController.startBattle();

    expect(uiController.init).toHaveBeenCalled();
  });

  test("shows the Game Screen", () => {
    appController.startBattle();

    expect(screenController.showGame).toHaveBeenCalled();
  });
});
