import Player from "../Player/Player";
import GameBoard from "../GameBoard/GameBoard";

describe.skip("Player", () => {
  test("stores the player's name", () => {
    const player = new Player("Luis");

    expect(player.getName()).toBe("Luis");
  });

  test("creates a game board for the player", () => {
    const player = new Player("Luis");

    expect(player.getGameBoard()).toBeInstanceOf(GameBoard);
  });

  test("attacks the enemy board at the given coordinates", () => {
    const player = new Player("Luis");
    const enemyBoard = player.getGameBoard();

    enemyBoard.placeShip(0, 0, "x", 1);

    player.attack(enemyBoard, 0, 0);

    expect(enemyBoard.allShipsSunk()).toBe(true);
  });

  test("can attack an empty cell without throwing an error", () => {
    const player = new Player("Luis");
    const enemyBoard = player.getGameBoard();

    expect(() => {
      player.attack(enemyBoard, 5, 5);
    }).not.toThrow();
  });

  test("calls receiveAttack on the enemy board", () => {
    const player = new Player("Luis");

    const enemyBoard = {
      receiveAttack: jest.fn(),
    };

    player.attack(enemyBoard, 3, 4);

    expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(3, 4);
  });

  test("attack returns the result from the enemy board", () => {
    const player = new Player("Player");

    const attackResult = {
      attackResult: "hit",
      sunkedShip: true,
    };

    const enemyBoard = {
      receiveAttack: jest.fn(() => attackResult),
    };

    const result = player.attack(enemyBoard, 3, 4);

    expect(result).toEqual(attackResult);
    expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(3, 4);
  });
});
