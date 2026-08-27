import AppController from "./AppController";
import {} from "";

let mockCreateCharacter;

jest.mock("../modules/Character/CharacterFactory", () => ({
  __esModule: true,
  default: (...args) => mockCreateCharacter(...args),
}));

describe.skip("AppController", () => {
  let appController;
  let appState;
  let screenController;

  beforeEach(() => {
    appState = {
      setName: jest.fn(),
      setPlayerFaction: jest.fn(),
      getPLayerFaction: jest.fn(),
      setCharacter1: jest.fn(),
      setCharacter2: jest.fn(),
    };

    screenController = {
      showStartScreen: jest.fn(),
      showCharacterSelection: jest.fn(),
      showShipPlacement: jest.fn(),
    };

    mockCreateCharacter = jest.fn();

    appController = new AppController(appState, screenController);
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

    mockCreateCharacter.mockReturnValueOnce(playerCharacter);

    appController.startPlaceShips("Anduin Wrynn", "Sylvanas Windrunner");

    expect(mockCreateCharacter).toHaveBeenCalledWith("Anduin Wrynn");

    expect(appState.setCharacter1).toHaveBeenCalledWith(playerCharacter);
  });

  test("startPlaceShips creates the enemy character using the factory", () => {
    const enemyCharacter = {
      getName: jest.fn().mockReturnValue("Sylvanas Windrunner"),
    };

    mockCreateCharacter
      .mockReturnValueOnce({})
      .mockReturnValueOnce(enemyCharacter);

    appController.startPlaceShips("Anduin Wrynn", "Sylvanas Windrunner");

    expect(mockCreateCharacter).toHaveBeenNthCalledWith(
      2,
      "Sylvanas Windrunner",
    );

    expect(appState.setCharacter2).toHaveBeenCalledWith(enemyCharacter);
  });

  test("startPlaceShips shows the ship placement screen", () => {
    appController.startPlaceShips("character1", "character2");

    expect(screenController.showShipPlacement).toHaveBeenCalled();
  });
});
