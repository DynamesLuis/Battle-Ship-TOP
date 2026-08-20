import GameBoard from "../../modules/GameBoard/GameBoard";
import UIController from "./UIController";
import "@testing-library/jest-dom";

let mockEnemyBoardContainer;
let mockMyBoardContainer;
let mockTurnResult;
let mockFinishedGameModal;

jest.mock("../domSelector", () => ({
  get $enemyBoardContainer() {
    return mockEnemyBoardContainer;
  },

  get $myBoardContainer() {
    return mockMyBoardContainer;
  },

  get $turnResult() {
    return mockTurnResult;
  },

  get $finishedGameModal() {
    return mockFinishedGameModal;
  },
}));

describe.skip("UIController", () => {
  let game;
  let boardRenderer;
  let uiController;

  beforeEach(() => {
    mockEnemyBoardContainer = document.createElement("div");

    game = {
      playRound: jest.fn().mockReturnValue({
        playerResults: null,
        computerResults: null,
        winner: null,
      }),
    };

    boardRenderer = {
      myBoard: new GameBoard(),
      enemyBoard: new GameBoard(),
      renderEnemyBoard: jest.fn(),
    };

    uiController = new UIController(boardRenderer, game);
  });

  test("can be created with Game and BoardRenderer dependencies", () => {
    expect(uiController).toBeDefined();
  });

  test("initEvents registers a click event on the enemy board", () => {
    const addEventListener = jest.spyOn(
      mockEnemyBoardContainer,
      "addEventListener",
    );

    uiController.initEvents();

    expect(addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
  });

  test("clicking a cell calls game.playRound with its coordinates", () => {
    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(game.playRound).toHaveBeenCalledWith(3, 0);
  });

  test("clicking outside a cell does not start a turn", () => {
    uiController.initEvents();

    mockEnemyBoardContainer.click();

    expect(game.playRound).not.toHaveBeenCalled();
  });

  test("receives the player and computer results from playRound", () => {
    const playerResults = {
      attackResult: "hit",
      sunkedShip: false,
    };

    const computerResults = {
      attackResult: "miss",
      sunkedShip: false,
    };

    const roundResults = {
      playerResults,
      computerResults,
      winner: null,
    };

    game.playRound.mockReturnValue(roundResults);

    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(game.playRound).toHaveReturnedWith(roundResults);
  });

  test("finishes the game when the player wins", () => {
    const winner = {
      getName: jest.fn(() => "Player 1"),
    };

    const playerResults = {
      attackResult: "hit",
      sunkedShip: true,
    };

    const roundResults = {
      playerResults,
      computerResults: null,
      winner,
    };

    game.playRound.mockReturnValue(roundResults);

    const finishGame = jest.spyOn(uiController, "finishGame");

    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(finishGame).toHaveBeenCalledWith(winner);
  });

  test("does not finish the game when there is no winner", () => {
    const roundResults = {
      playerResults: {
        attackResult: "hit",
        sunkedShip: false,
      },

      computerResults: {
        attackResult: "miss",
        sunkedShip: false,
      },

      winner: null,
    };

    game.playRound.mockReturnValue(roundResults);

    const finishGame = jest.spyOn(uiController, "finishGame");

    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(finishGame).not.toHaveBeenCalled();
  });

  test("finishes the game when the computer wins", () => {
    const winner = {
      getName: jest.fn(() => "Computer"),
    };

    const playerResults = {
      attackResult: "miss",
      sunkedShip: false,
    };

    const computerResults = {
      attackResult: "hit",
      sunkedShip: true,
    };

    const roundResults = {
      playerResults,
      computerResults,
      winner,
    };

    game.playRound.mockReturnValue(roundResults);

    const finishGame = jest.spyOn(uiController, "finishGame");

    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(finishGame).toHaveBeenCalledWith(winner);
  });
});

describe("Renders", () => {
  let game;
  let boardRenderer;
  let uiController;

  beforeEach(() => {
    mockEnemyBoardContainer = document.createElement("div");
    mockTurnResult = document.createElement("p");
    mockFinishedGameModal = document.createElement("div");

    game = {
      playRound: jest.fn(),
    };

    boardRenderer = {
      myBoard: new GameBoard(),
      enemyBoard: new GameBoard(),
      renderEnemyBoard: jest.fn(),
      renderMyBoard: jest.fn(),
    };

    uiController = new UIController(boardRenderer, game);
  });

  test("renders both boards after a complete round", async () => {
    jest.useFakeTimers();
    game.playRound.mockReturnValue({
      playerResults: {
        attackResult: "hit",
        sunkedShip: false,
      },
      computerResults: {
        attackResult: "miss",
        sunkedShip: false,
      },
      winner: null,
    });

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(boardRenderer.renderEnemyBoard).toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(2000);
    expect(boardRenderer.renderMyBoard).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("does not render myBoard when computer did not play", () => {
    game.playRound.mockReturnValue({
      playerResults: {
        attackResult: "hit",
        sunkedShip: true,
      },
      computerResults: null,
      winner: {},
    });

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(boardRenderer.renderEnemyBoard).toHaveBeenCalled();

    expect(boardRenderer.renderMyBoard).not.toHaveBeenCalled();
  });

  test("displays player results first and computer results after", async () => {
    jest.useFakeTimers();

    const playerResults = {
      attackResult: "hit",
      sunkedShip: false,
    };

    const computerResults = {
      attackResult: "miss",
      sunkedShip: false,
    };

    game.playRound.mockReturnValue({
      playerResults,
      computerResults,
      winner: null,
    });

    const displayResults = jest.spyOn(uiController, "displayResults");

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(displayResults).toHaveBeenCalledWith(playerResults);

    await jest.advanceTimersByTimeAsync(2000);

    expect(displayResults).toHaveBeenNthCalledWith(2, computerResults);

    jest.useRealTimers();
  });

  test("only displays player results when computerResults is null", () => {
    const playerResults = {
      attackResult: "hit",
      sunkedShip: true,
    };

    game.playRound.mockReturnValue({
      playerResults,
      computerResults: null,
      winner: {},
    });

    const displayResults = jest.spyOn(uiController, "displayResults");

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(displayResults).toHaveBeenCalledTimes(1);

    expect(displayResults).toHaveBeenCalledWith(playerResults);
  });

  test("displays computer results after a delay", async () => {
    jest.useFakeTimers();

    const playerResults = {
      attackResult: "hit",
      sunkedShip: false,
    };

    const computerResults = {
      attackResult: "miss",
      sunkedShip: false,
    };

    game.playRound.mockReturnValue({
      playerResults,
      computerResults,
      winner: null,
    });

    const displayResults = jest.spyOn(uiController, "displayResults");

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(displayResults).toHaveBeenCalledTimes(1);

    expect(displayResults).toHaveBeenNthCalledWith(1, playerResults);

    jest.advanceTimersByTime(999);

    expect(displayResults).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1);
    await jest.advanceTimersByTimeAsync(1000);

    expect(displayResults).toHaveBeenCalledTimes(2);

    expect(displayResults).toHaveBeenNthCalledWith(2, computerResults);

    jest.useRealTimers();
  });

  test("shows the finished game modal", () => {
    mockFinishedGameModal.classList.add("hidden");

    uiController.finishGame();

    expect(mockFinishedGameModal).not.toHaveClass("hidden");
  });
});
