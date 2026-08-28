import AppController from "./AppController";
import Player from "../modules/Player/Player";

let mockCreateCharacter;

jest.mock("../modules/Character/CharacterFactory", () => ({
  __esModule: true,
  default: (...args) => mockCreateCharacter(...args),
}));
jest.mock("../modules/Player/Player", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("AppController", () => {
  let appController;
  let appState;
  let screenController;
  let characterSelectionController;

  beforeEach(() => {
    jest.clearAllMocks();
    Player.mockReset();

    appState = {
      setName: jest.fn(),
      getName: jest.fn(),
      setPlayerFaction: jest.fn(),
      getPlayerFaction: jest.fn(),
      setCharacter1: jest.fn(),
      getCharacter1: jest.fn(),
      setCharacter2: jest.fn(),
      setPlayer1: jest.fn(),
    };

    screenController = {
      showStartScreen: jest.fn(),
      showCharacterSelection: jest.fn(),
      showShipPlacement: jest.fn(),
    };

    characterSelectionController = {
      init: jest.fn(),
    };

    mockCreateCharacter = jest.fn();

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
});
