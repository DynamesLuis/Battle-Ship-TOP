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

  //placeShips

  test("places a ship horizontally when it fits on the board", () => {
    const gameBoard = new GameBoard();

    const result = gameBoard.placeShip(5, 0, "x", 2);

    expect(result).toBe(true);

    const occupiedCells = gameBoard.getOccupiedCells();

    expect(occupiedCells.size).toBe(2);
    expect(occupiedCells.has("5, 0")).toBe(true);
    expect(occupiedCells.has("6, 0")).toBe(true);
  });

  test("places a ship vertically when it fits on the board", () => {
    const gameBoard = new GameBoard();

    const result = gameBoard.placeShip(0, 5, "y", 2);

    expect(result).toBe(true);

    const occupiedCells = gameBoard.getOccupiedCells();

    expect(occupiedCells.size).toBe(2);
    expect(occupiedCells.has("0, 5")).toBe(true);
    expect(occupiedCells.has("0, 6")).toBe(true);
  });

  test("returns false when a horizontal ship exceeds the board", () => {
    const gameBoard = new GameBoard();

    const result = gameBoard.placeShip(8, 0, "x", 4);

    expect(result).toBe(false);

    const occupiedCells = gameBoard.getOccupiedCells();

    expect(occupiedCells.size).toBe(0);
  });

  test("returns false when a vertical ship exceeds the board", () => {
    const gameBoard = new GameBoard();

    const result = gameBoard.placeShip(0, 8, "y", 4);

    expect(result).toBe(false);

    const occupiedCells = gameBoard.getOccupiedCells();

    expect(occupiedCells.size).toBe(0);
  });

  test("does not partially place a ship when it exceeds the board", () => {
    const gameBoard = new GameBoard();

    const result = gameBoard.placeShip(8, 0, "x", 4);

    expect(result).toBe(false);
    expect(gameBoard.getOccupiedCells().size).toBe(0);
  });

  test("assigns the same ship to every occupied coordinate", () => {
    const gameBoard = new GameBoard();

    gameBoard.placeShip(5, 0, "x", 3);

    const occupiedCells = gameBoard.getOccupiedCells();

    const ship1 = occupiedCells.get("5, 0");
    const ship2 = occupiedCells.get("6, 0");
    const ship3 = occupiedCells.get("7, 0");

    expect(ship1).toBe(ship2);
    expect(ship2).toBe(ship3);
  });
});
