import ScreenController from "./ScreenController";
import "@testing-library/jest-dom";

describe.skip("ScreenController", () => {
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

  test("hides the current screen when changing screens", async () => {
    jest.useFakeTimers();

    screenController.showStartScreen();

    const changeScreenPromise = screenController.changeScreen(
      mockCharacterSelection,
    );

    await jest.advanceTimersByTimeAsync(300);

    expect(mockStartScreen).toHaveClass("hidden");

    await jest.advanceTimersByTimeAsync(400);
    await changeScreenPromise;

    jest.useRealTimers();
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

  test("hides the current screen before showing another screen", async () => {
    jest.useFakeTimers();

    screenController.showStartScreen();

    const transition = screenController.showCharacterSelection();

    expect(mockStartScreen).toHaveClass("screen-exit");
    expect(mockStartScreen).not.toHaveClass("hidden");

    await jest.advanceTimersByTimeAsync(300);

    expect(mockStartScreen).toHaveClass("hidden");
    expect(mockStartScreen).not.toHaveClass("screen-exit");

    expect(mockCharacterSelection).not.toHaveClass("hidden");
    expect(mockCharacterSelection).toHaveClass("screen-enter");

    await jest.advanceTimersByTimeAsync(400);
    await transition;

    expect(mockCharacterSelection).not.toHaveClass("screen-enter");

    jest.useRealTimers();
  });
});
