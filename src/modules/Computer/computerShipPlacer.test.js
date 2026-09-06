import GameBoard from "../GameBoard/GameBoard";
import computerShipPlacer from "./computerShipPlacer";
import shipsData from "../../gameData/shipsData";

describe.skip("computerShipPlacer", () => {
  let board;

  beforeEach(() => {
    board = new GameBoard();
  });

  test("places all ships on an empty board", () => {
    computerShipPlacer(board);

    expect(board.getShips()).toHaveLength(shipsData.length);
  });

  test("all occupied positions are valid", () => {
    computerShipPlacer(board);

    const occupiedCells = board.getOccupiedCells();

    for (const coordinate of occupiedCells.keys()) {
      const [x, y] = coordinate.split(",").map(Number);

      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(board.getLength());

      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(board.getHeight());
    }
  });

  test("ships do not overlap", () => {
    computerShipPlacer(board);

    const occupiedCells = board.getOccupiedCells();

    const totalShipLength = board
      .getShips()
      .reduce((total, ship) => total + ship.getLength(), 0);

    expect(occupiedCells.size).toBe(totalShipLength);
  });

  test("uses all required ships", () => {
    computerShipPlacer(board);

    const placedShips = board.getShips();

    for (const shipData of shipsData) {     
      expect(placedShips.some((ship) => ship.getName() === shipData.name)).toBe(
        true,
      );
    }
  });
});
