import GameBoard from "./GameBoard";

describe.skip("GameBoard", () => {
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

  test("receiveAttack returns miss when attacking an empty cell", () => {
    const board = new GameBoard();

    const result = board.receiveAttack(3, 4);

    expect(result).toEqual({
      attackResult: "miss",
      sunkedShip: false,
    });
  });

  test("receiveAttack returns hit when attacking a ship without sinking it", () => {
    const board = new GameBoard();

    board.placeShip(0, 0, "x", 2);

    const result = board.receiveAttack(0, 0);

    expect(result).toEqual({
      attackResult: "hit",
      sunkedShip: false,
    });
  });

  test("receiveAttack returns hit and sunkedShip true when the attack sinks a ship", () => {
    const board = new GameBoard();

    board.placeShip(0, 0, "x", 1);

    const result = board.receiveAttack(0, 0);

    expect(result).toEqual({
      attackResult: "hit",
      sunkedShip: true,
    });
  });

  test("returns the board length", () => {
    const board = new GameBoard(10, 10);

    expect(board.getLength()).toBe(10);
  });

  test("returns the board height", () => {
    const board = new GameBoard(10, 10);

    expect(board.getHeight()).toBe(10);
  });

  test("returns a copy of the attacked cells", () => {
    const board = new GameBoard(10, 10);

    board.receiveAttack(3, 4);

    const attackedCells = board.getAttackedCells();

    expect(attackedCells).toEqual(new Set(["3, 4"]));
    expect(attackedCells).not.toBe(board.attackedCells);
  });

  test("returns a copy of the occupied cells", () => {
    const board = new GameBoard(10, 10);

    board.placeShip(0, 0, "x", 3);

    const occupiedCells = board.getOccupiedCells();

    expect(occupiedCells.has("0, 0")).toBe(true);
    expect(occupiedCells.has("1, 0")).toBe(true);
    expect(occupiedCells.has("2, 0")).toBe(true);
    expect(occupiedCells).not.toBe(board.occupiedCells);
  });
});
