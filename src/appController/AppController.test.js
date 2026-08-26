import AppController from "./AppController";

describe("AppController", () => {
  let appController;
  let appState;
  let screenController;

  beforeEach(() => {
    appState = {
      setName: jest.fn(),
      setPlayerFaction: jest.fn(),
    };

    screenController = {
      showStartScreen: jest.fn(),
      showCharacterSelection: jest.fn(),
    };

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

});
