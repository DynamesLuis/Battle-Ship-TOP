import GameBoard from "../../modules/GameBoard/GameBoard";
import BoardRender from "./BoardRender";
import "@testing-library/jest-dom";

describe.skip("GameBoardRenderer", () => {
  let renderer;
  let container;

  beforeEach(() => {
    renderer = new BoardRender();
    container = document.createElement("div");
  });

  describe("renderMyBoard", () => {
    test("renders the correct number of cells", () => {
      const board = new GameBoard();

      renderer.renderMyBoard(board, container);

      const cells = container.querySelectorAll(".cell");

      expect(cells).toHaveLength(100);
    });

    test("renders cells with their coordinates", () => {
      const board = new GameBoard();

      renderer.renderMyBoard(board, container);

      const cell = container.querySelector('[data-coordinate="3, 0"]');

      expect(cell).not.toBeNull();
    });

    test("marks occupied cells", () => {
      const board = new GameBoard();

      board.placeShip(0, 0, "x", 2);

      renderer.renderMyBoard(board, container);

      expect(container.querySelector('[data-coordinate="0, 0"]')).toHaveClass(
        "occupied",
      );

      expect(container.querySelector('[data-coordinate="1, 0"]')).toHaveClass(
        "occupied",
      );
    });

    test("marks unoccupied cells", () => {
      const board = new GameBoard();

      board.placeShip(0, 0, "x", 2);

      renderer.renderMyBoard(board, container);

      expect(
        container.querySelector('[data-coordinate="2, 2"]'),
      ).not.toHaveClass("occupied");
    });

    test("marks attacked cells", () => {
      const board = new GameBoard();

      board.receiveAttack(0, 0);
      board.receiveAttack(2, 2);

      renderer.renderMyBoard(board, container);

      expect(container.querySelector('[data-coordinate="0, 0"]')).toHaveClass(
        "attacked",
      );

      expect(container.querySelector('[data-coordinate="2, 2"]')).toHaveClass(
        "attacked",
      );
    });
  });

  describe("renderEnemyBoard", () => {
    test("renders the correct number of cells", () => {
      const board = new GameBoard();

      renderer.renderEnemyBoard(board, container);

      const cells = container.querySelectorAll(".cell");

      expect(cells).toHaveLength(100);
    });

    test("does not reveal occupied cells", () => {
      const board = new GameBoard();

      board.placeShip(0, 0, "x", 2);

      renderer.renderEnemyBoard(board, container);

      expect(
        container.querySelector('[data-coordinate="0, 0"]'),
      ).not.toHaveClass("occupied");

      expect(
        container.querySelector('[data-coordinate="1, 0"]'),
      ).not.toHaveClass("occupied");
    });

    test("marks attacked cells", () => {
      const board = new GameBoard();

      board.receiveAttack(2, 2);

      renderer.renderEnemyBoard(board, container);

      expect(container.querySelector('[data-coordinate="2, 2"]')).toHaveClass(
        "attacked",
      );
    });

    test("does not mark unattacked cells as attacked", () => {
      const board = new GameBoard();

      board.receiveAttack(2, 2);

      renderer.renderEnemyBoard(board, container);

      expect(
        container.querySelector('[data-coordinate="0, 0"]'),
      ).not.toHaveClass("attacked");
    });
  });
});
