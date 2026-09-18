import GameBoard from "../../modules/GameBoard/GameBoard";
import BoardRender from "./BoardRender";
import "@testing-library/jest-dom";

describe.skip("GameBoardRenderer", () => {
  let renderer;
  let container;
  let myBoard;
  let enemyBoard;

  beforeEach(() => {
    container = document.createElement("div");
    myBoard = new GameBoard();
    enemyBoard = new GameBoard();
    renderer = new BoardRender(myBoard, enemyBoard);
  });

  describe.skip("renderMyBoard", () => {
    test("renders the correct number of cells", () => {
      renderer.renderMyBoard(container);

      const cells = container.querySelectorAll(".cell");

      expect(cells).toHaveLength(100);
    });

    test("renders cells with their coordinates", () => {
      renderer.renderMyBoard(container);

      const cell = container.querySelector('[data-coordinate="3, 0"]');

      expect(cell).not.toBeNull();
    });

    test("marks occupied cells", () => {
      myBoard;

      myBoard.placeShip(0, 0, "x", 2);

      renderer.renderMyBoard(container);

      expect(container.querySelector('[data-coordinate="0, 0"]')).toHaveClass(
        "occupied",
      );

      expect(container.querySelector('[data-coordinate="1, 0"]')).toHaveClass(
        "occupied",
      );
    });

    test("marks unoccupied cells", () => {
      myBoard.placeShip(0, 0, "x", 2);

      renderer.renderMyBoard(container);

      expect(
        container.querySelector('[data-coordinate="2, 2"]'),
      ).not.toHaveClass("occupied");
    });

    test("marks attacked cells", () => {
      myBoard.receiveAttack(0, 0);
      myBoard.receiveAttack(2, 2);

      renderer.renderMyBoard(container);

      expect(container.querySelector('[data-coordinate="0, 0"]')).toHaveClass(
        "attacked",
      );

      expect(container.querySelector('[data-coordinate="2, 2"]')).toHaveClass(
        "attacked",
      );
    });
  });

  describe.skip("renderEnemyBoard", () => {
    test("renders the correct number of cells", () => {
      renderer.renderEnemyBoard(container);

      const cells = container.querySelectorAll(".cell");

      expect(cells).toHaveLength(100);
    });

    test("does not reveal occupied cells", () => {
      enemyBoard.placeShip(0, 0, "x", 2);

      renderer.renderEnemyBoard(container);

      expect(
        container.querySelector('[data-coordinate="0, 0"]'),
      ).not.toHaveClass("occupied");

      expect(
        container.querySelector('[data-coordinate="1, 0"]'),
      ).not.toHaveClass("occupied");
    });

    test("marks attacked cells", () => {
      enemyBoard.receiveAttack(2, 2);

      renderer.renderEnemyBoard(container);

      expect(container.querySelector('[data-coordinate="2, 2"]')).toHaveClass(
        "attacked",
      );
    });

    test("does not mark unattacked cells as attacked", () => {
      enemyBoard.receiveAttack(2, 2);

      renderer.renderEnemyBoard(container);

      expect(
        container.querySelector('[data-coordinate="0, 0"]'),
      ).not.toHaveClass("attacked");
    });
  });
});
