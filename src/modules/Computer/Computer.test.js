import Computer from "./Computer";
import Character from "../Character/Character";

describe.skip("Computer functionality", () => {
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
      receiveAttack: jest.fn(() => ({
        attackResult: "miss",
        sunkedShip: false,
      })),
    };

    computer.attack(enemyBoard);

    expect(enemyBoard.getAttackedCells).toHaveBeenCalledTimes(1);
    expect(enemyBoard.receiveAttack).toHaveBeenCalledTimes(1);
  });

  test("attacks using valid board coordinates", () => {
    const computer = new Computer("CPU");

    const enemyBoard = {
      getAttackedCells: jest.fn(() => new Set()),
      receiveAttack: jest.fn(() => ({
        attackResult: "miss",
        sunkedShip: false,
      })),
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

        return {
          attackResult: "miss",
          sunkedShip: false,
        };
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

describe.skip("Computer objective behavior", () => {
  let computer;
  let enemyBoard;
  let character;

  beforeEach(() => {
    character = {};

    computer = new Computer("Computer", character);

    enemyBoard = {
      receiveAttack: jest.fn(),
      getAttackedCells: jest.fn().mockReturnValue(new Set()),
    };
  });

  test("starts without an objective", () => {
    expect(computer.hasObjective).toBe(false);
    expect(computer.objectiveCoordinates).toEqual(null);
  });

  test("does not set an objective after a miss", () => {
    enemyBoard.receiveAttack.mockReturnValue({
      attackResult: "miss",
      sunkedShip: false,
    });

    computer.attack(enemyBoard);

    expect(computer.hasObjective).toBe(false);
    expect(computer.objectiveCoordinates).toEqual(null);
  });

  test("sets an objective after hitting a ship without sinking it", () => {
    enemyBoard.receiveAttack.mockReturnValue({
      attackResult: "hit",
      sunkedShip: false,
    });

    computer.attack(enemyBoard);

    expect(computer.hasObjective).toBe(true);
  });

  test("stores the coordinates of the successful hit as the objective coordinates", () => {
    enemyBoard.receiveAttack.mockReturnValue({
      attackResult: "hit",
      sunkedShip: false,
    });

    computer.attack(enemyBoard);

    const attackedCoordinates = enemyBoard.receiveAttack.mock.calls[0];

    expect(computer.objectiveCoordinates).toEqual(attackedCoordinates);
  });

  test("clears the objective after sinking a ship", () => {
    computer.hasObjective = true;
    computer.objectiveCoordinates = [3, 4];

    enemyBoard.receiveAttack.mockReturnValue({
      attackResult: "hit",
      sunkedShip: true,
    });

    computer.attack(enemyBoard);

    expect(computer.hasObjective).toBe(false);
    expect(computer.objectiveCoordinates).toEqual(null);
  });

  describe.skip("updateObjective", () => {
    test("adds the hit coordinates to hitsByObjective", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "hit",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.hitsByObjective).toEqual(new Set(["0, 0"]));

      jest.restoreAllMocks();
    });

    test("keeps previous hits and adds the new hit to hitsByObjective", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.25);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 5];
      computer.hitsByObjective = new Set(["4, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn((x, y) => {
          if (x === 5 && y === 5) {
            return {
              attackResult: "hit",
              sunkedShip: false,
            };
          }

          return {
            attackResult: "miss",
            sunkedShip: false,
          };
        }),
      };

      computer.attack(enemyBoard);

      expect(computer.hitsByObjective).toEqual(new Set(["4, 5", "5, 5"]));

      jest.restoreAllMocks();
    });

    test("clears hitsByObjective after sinking a ship", () => {
      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 5];
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set(["3, 5"]);
      computer.attackDirection = "x";

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "hit",
          sunkedShip: true,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.hitsByObjective).toEqual(new Set());
    });

    test("clears pendingAttacks after sinking a ship", () => {
      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 5];
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set(["3, 5"]);
      computer.attackDirection = "x";

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "hit",
          sunkedShip: true,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.pendingAttacks).toEqual(new Set());
    });

    test("clears attackDirection after sinking a ship", () => {
      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 5];
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set(["3, 5"]);
      computer.attackDirection = "x";

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "hit",
          sunkedShip: true,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.attackDirection).toBeNull();
    });

    test("clears the objective after sinking a ship", () => {
      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 5];
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set(["3, 5"]);
      computer.attackDirection = "x";

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "hit",
          sunkedShip: true,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.hasObjective).toBe(false);
      expect(computer.objectiveCoordinates).toBeNull();
    });
  });

  describe.skip("Calculated coordinates", () => {
    test("uses a coordinate from pendingAttacks when available", () => {
      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.pendingAttacks = new Set(["3, 4"]);

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(3, 4);
    });

    test("removes the coordinate used from pendingAttacks", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.pendingAttacks = new Set(["3, 4", "5, 4"]);

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.pendingAttacks).toEqual(new Set(["5, 4"]));

      jest.restoreAllMocks();
    });
  });

  describe.skip("get adyacent coordinates", () => {
    test("calculates the coordinates adjacent to the objective", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 4];
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(3, 4);

      jest.restoreAllMocks();
    });

    test("does not consider coordinates outside the board", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [0, 0];
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      const [x, y] = enemyBoard.receiveAttack.mock.calls[0];

      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);

      jest.restoreAllMocks();
    });

    test("does not consider coordinates that have already been attacked", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [1, 1];
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set(["0, 1", "1, 0"])),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(2, 1);

      jest.restoreAllMocks();
    });

    test("selects one of the valid adjacent coordinates", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 4];
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      const [x, y] = enemyBoard.receiveAttack.mock.calls[0];

      const validCoordinates = [
        [3, 4],
        [5, 4],
        [4, 3],
        [4, 5],
      ];

      expect(validCoordinates).toContainEqual([x, y]);

      jest.restoreAllMocks();
    });

    test("stores the remaining valid adjacent coordinates in pendingAttacks", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.objectiveCoordinates = [4, 4];
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.pendingAttacks).toEqual(
        new Set(["5, 4", "4, 3", "4, 5"]),
      );

      jest.restoreAllMocks();
    });
  });

  describe.skip("getContinuousCoordinate", () => {
    test("detects a horizontal direction from multiple hits", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.attackDirection).toBe("x");

      jest.restoreAllMocks();
    });

    test("detects a vertical direction from multiple hits", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["5, 4", "5, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(computer.attackDirection).toBe("y");

      jest.restoreAllMocks();
    });

    test("generates only the possible endpoints in the attack direction", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(6, 5);

      jest.restoreAllMocks();
    });

    test("removes endpoints outside the board", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["8, 5", "9, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(7, 5);
      expect(enemyBoard.receiveAttack).not.toHaveBeenCalledWith(10, 5);

      jest.restoreAllMocks();
    });

    test("removes endpoints that have already been attacked", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set(["6, 5"])),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(3, 5);
      expect(enemyBoard.receiveAttack).not.toHaveBeenCalledWith(6, 5);

      jest.restoreAllMocks();
    });

    test("returns one valid endpoint and stores the other in pendingAttacks", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set()),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(6, 5);
      expect(computer.pendingAttacks).toEqual(new Set(["3, 5"]));

      jest.restoreAllMocks();
    });

    test("returns the only valid endpoint and does not add an invalid endpoint to pendingAttacks", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const computer = new Computer("CPU");

      computer.hasObjective = true;
      computer.hitsByObjective = new Set(["4, 5", "5, 5"]);
      computer.pendingAttacks = new Set();

      const enemyBoard = {
        getAttackedCells: jest.fn(() => new Set(["6, 5"])),
        receiveAttack: jest.fn(() => ({
          attackResult: "miss",
          sunkedShip: false,
        })),
      };

      computer.attack(enemyBoard);

      expect(enemyBoard.receiveAttack).toHaveBeenCalledWith(3, 5);
      expect(computer.pendingAttacks).toEqual(new Set());
    });
  });
});

describe.skip("Computer", () => {
  test("can be created with a Character", () => {
    const character = new Character("Computer Captain", "computer.png", {});

    const computer = new Computer("Computer", character);

    expect(computer.getCharacter()).toBe(character);
  });
});
