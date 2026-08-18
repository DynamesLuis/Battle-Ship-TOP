import GameBoard from "../../modules/GameBoard/GameBoard";
import UIController from "./UIController";
import "@testing-library/jest-dom";

let mockEnemyBoardContainer;
let mockTurnResult;

jest.mock("../domSelector", () => ({
  get $enemyBoardContainer() {
    return mockEnemyBoardContainer;
  },

  get $turnResult() {
    return mockTurnResult;
  },
}));

describe.skip("UIController", () => {
  let game;
  let boardRenderer;
  let uiController;

  beforeEach(() => {
    mockEnemyBoardContainer = document.createElement("div");

    game = {
      playTurn: jest.fn(),
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

  test("clicking a cell calls game.playTurn with its coordinates", () => {
    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(game.playTurn).toHaveBeenCalledWith(3, 0);
  });

  test("clicking outside a cell does not start a turn", () => {
    uiController.initEvents();

    mockEnemyBoardContainer.click();

    expect(game.playTurn).not.toHaveBeenCalled();
  });

  test("receives the result of a successful playTurn", () => {
    const turnResult = {
      attackResult: "hit",
      sunkedShip: false,
      winner: null,
    };

    game.playTurn.mockReturnValue(turnResult);

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(game.playTurn).toHaveReturnedWith(turnResult);
  });

  test("renders the enemy board again after a successful playTurn", () => {
    const turnResult = {
      attackResult: "hit",
      sunkedShip: false,
      winner: null,
    };

    game.playTurn.mockReturnValue(turnResult);

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "3, 0";

    mockEnemyBoardContainer.appendChild(cell);

    uiController.initEvents();

    cell.click();

    expect(boardRenderer.renderEnemyBoard).toHaveBeenCalledWith(
      mockEnemyBoardContainer,
    );
  });
});

describe("UIController", () => {
  let game;
  let boardRenderer;
  let uiController;

  beforeEach(() => {
    mockEnemyBoardContainer = document.createElement("div");
    mockTurnResult = document.createElement("p");

    game = {
      playTurn: jest.fn(),
    };

    boardRenderer = {
      myBoard: new GameBoard(),
      enemyBoard: new GameBoard(),
      renderEnemyBoard: jest.fn(),
    };

    uiController = new UIController(boardRenderer, game);
  });

  describe("displayResults", () => {
    test("displays miss when the attack misses", () => {
      const results = {
        winner: null,
        attackResult: "miss",
        sunkedShip: false,
      };

      uiController.displayResults(results);

      expect(mockTurnResult).toHaveTextContent(/miss/i);
    });

    test("displays hit when the attack hits a ship", () => {
      const results = {
        winner: null,
        attackResult: "hit",
        sunkedShip: false,
      };

      uiController.displayResults(results);

      expect(mockTurnResult).toHaveTextContent(/hit/i);
    });

    test("displays that a ship was sunk", () => {
      const results = {
        winner: null,
        attackResult: "hit",
        sunkedShip: true,
      };

      uiController.displayResults(results);

      expect(mockTurnResult).toHaveTextContent(/sunk/i);
    });

    test("displays the winner", () => {
      const winner = {
        getName: jest.fn(() => "Player 1"),
      };

      const results = {
        winner,
        attackResult: "hit",
        sunkedShip: true,
      };

      uiController.displayResults(results);

      expect(mockTurnResult).toHaveTextContent(/Player 1/i);
    });

    test("finishes the game when there is a winner", () => {
      const winner = {
        getName: jest.fn(() => "Player 1"),
      };

      const results = {
        winner,
        attackResult: "hit",
        sunkedShip: true,
      };

      game.playTurn.mockReturnValue(results);

      const finishGameSpy = jest.spyOn(uiController, "finishGame");

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(finishGameSpy).toHaveBeenCalledWith(winner);
    });

    test("does not play another turn after the game has finished", () => {
      const winner = {
        getName: jest.fn(() => "Player 1"),
      };

      game.playTurn.mockReturnValue({
        winner,
        attackResult: "hit",
        sunkedShip: true,
      });

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();
      cell.click();

      expect(game.playTurn).toHaveBeenCalledTimes(1);
    });
  });
});
