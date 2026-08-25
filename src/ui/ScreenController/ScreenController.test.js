import ScreenController from "./ScreenController";
import "@testing-library/jest-dom";

describe("ScreenController", () => {
  let screenController;
  let mockStartScreen;
  let mockCharacterSelection;
  let mockShipPlacement;
  let mockGame;

  beforeEach(() => {
    mockStartScreen = document.createElement("main");
    mockCharacterSelection = document.createElement("main");
    mockShipPlacement = document.createElement("main");
    mockGame = document.createElement("main");

    mockStartScreen.classList.add("hidden");
    mockCharacterSelection.classList.add("hidden");
    mockShipPlacement.classList.add("hidden");
    mockGame.classList.add("hidden");

    screenController = new ScreenController(
      mockStartScreen,
      mockCharacterSelection,
      mockShipPlacement,
      mockGame,
    );
  });

  test("can be created", () => {
    expect(screenController).toBeDefined();
  });

  test("hides the current screen", () => {
    screenController.showStartScreen();

    screenController.hideScreen();

    expect(mockStartScreen).toHaveClass("hidden");
  });

  test("shows the start screen", () => {
    screenController.showStartScreen();

    expect(mockStartScreen.classList.contains("hidden")).toBe(false);

    expect(screenController.currentScreen).toBe(mockStartScreen);
  });

  test("shows the character selection screen", () => {
    screenController.showCharacterSelection();

    expect(mockCharacterSelection.classList.contains("hidden")).toBe(false);

    expect(screenController.currentScreen).toBe(mockCharacterSelection);
  });

  test("shows the ship placement screen", () => {
    screenController.showShipPlacement();

    expect(mockShipPlacement.classList.contains("hidden")).toBe(false);

    expect(screenController.currentScreen).toBe(mockShipPlacement);
  });

  test("shows the game screen", () => {
    screenController.showGame();

    expect(mockGame.classList.contains("hidden")).toBe(false);

    expect(screenController.currentScreen).toBe(mockGame);
  });

  test("hides the current screen before showing another screen", () => {
    screenController.showStartScreen();

    screenController.showCharacterSelection();

    expect(mockStartScreen.classList.contains("hidden")).toBe(true);

    expect(mockCharacterSelection.classList.contains("hidden")).toBe(false);
  });
});
