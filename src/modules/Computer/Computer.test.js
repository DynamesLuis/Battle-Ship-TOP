import Computer from "./Computer";

describe.skip("Computer", () => {
  test("inherits the name from Player", () => {
    const computer = new Computer("CPU");

    expect(computer.getName()).toBe("CPU");
  });

  test("creates a game board", () => {
    const computer = new Computer("CPU");

    expect(computer.getGameBoard()).toBeDefined();
  });

  test("attacks the enemy board", () => {
    const computer = new Computer("CPU");

    const enemyBoard = {
      getAttackedCells: jest.fn(() => new Set()),
      receiveAttack: jest.fn(),
    };

    computer.attack(enemyBoard);

    expect(enemyBoard.getAttackedCells).toHaveBeenCalledTimes(1);
    expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1);
  });

  test("attacks using valid board coordinates", () => {
    const computer = new Computer("CPU");

    const enemyBoard = {
      getAttackedCells: jest.fn(() => new Set()),
      receiveAttack: jest.fn(),
    };

    computer.attack(enemyBoard);

    const [x, y] = enemyBoard.receiveAttack.mock.calls[0];

    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);

    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });

  test("does not attack the same cell twice", () => {
    const computer = new Computer("CPU");
    const attackedCells = new Set();

    const enemyBoard = {
      getAttackedCells: jest.fn(() => attackedCells),
      receiveAttack: jest.fn((x, y) => {
        attackedCells.add(`${x},${y}`);
      }),
    };

    for (let i = 0; i < 50; i++) {
      computer.attack(enemyBoard);
    }

    expect(attackedCells.size).toBe(50);
  });

  test("attack returns the result from the enemy board", () => {
    const computer = new Computer("Computer");

    const attackResult = {
      attackResult: "hit",
      sunkedShip: true,
    };

    const enemyBoard = {
      getAttackedCells: jest.fn(() => new Set()),
      receiveAttack: jest.fn(() => attackResult),
    };

    const result = computer.attack(enemyBoard);

    expect(result).toEqual(attackResult);
    expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1);
  });
});
