import AppController from "./AppController";

describe.skip("AppController", () => {
  let appController;
  let appState;
  let screenController;

  beforeEach(() => {
    appState = {
      setName: jest.fn(),
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

  test("startGame stores the player name and shows character selection", () => {
    appController.startGame("Luis");

    expect(appState.setName).toHaveBeenCalledWith("Luis");

    expect(screenController.showCharacterSelection).toHaveBeenCalled();
  });
});
