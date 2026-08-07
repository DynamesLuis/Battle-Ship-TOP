import GameBoard from "./GameBoard";

describe("GameBoard", () => {
  test("a new board has no sunk ships", () => {
    const board = new GameBoard();

    expect(board.allShipsSunk()).toBe(false);
  });

  test("attacking an empty cell does not sink ships", () => {
    const board = new GameBoard();

    board.placeShip(0, 0, "x", 2);

    board.receiveAttack(5, 5);

    expect(board.allShipsSunk()).toBe(false);
  });

  test("a ship is sunk after all its positions are attacked", () => {
    const board = new GameBoard();

    board.placeShip(0, 0, "x", 2);

    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);

    expect(board.allShipsSunk()).toBe(true);
  });

  test("all ships must be sunk before returning true", () => {
    const board = new GameBoard();

    board.placeShip(0, 0, "x", 2);
    board.placeShip(5, 5, "y", 2);

    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);

    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttack(5, 5);
    board.receiveAttack(5, 6);

    expect(board.allShipsSunk()).toBe(true);
  });

  test("receiveAttack records attacked coordinates", () => {
    const board = new GameBoard();

    board.receiveAttack(3, 4);

    expect(board.getAttackedCells().has("3, 4")).toBe(true);
  });
});
