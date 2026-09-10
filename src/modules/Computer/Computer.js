import Player from "../Player/Player";

export default class Computer extends Player {
  constructor(name, character) {
    super(name, character);

    this.hasObjective = false;
    this.objectiveCoordinates = null; //[x,y]
    this.hitsByObjective = new Set(); //"1, 2"
    this.pendingAttacks = new Set(); //"1, 2"
    this.attackDirection = null;
  }

  attack(enemyBoard) {
    let coordinate;

    if (this.hasObjective) {
      coordinate = this.#getCalculatedCoordinates(enemyBoard);
    } else {
      coordinate = this.#getRandomCoordinates(enemyBoard);
    }
    const [xCoordinate, yCoordinate] = coordinate;

    const results = enemyBoard.receiveAttack(xCoordinate, yCoordinate);
    this.#updateObjetive(results, xCoordinate, yCoordinate);

    return results;
  }

  #updateObjetive(results, xCoordinate, yCoordinate) {
    if (results.sunkedShip) {
      this.hasObjective = false;
      this.objectiveCoordinates = null;
      this.hitsByObjective = new Set();
      this.pendingAttacks = new Set();
      this.attackDirection = null;
    } else if (results.attackResult === "hit") {
      this.hasObjective = true;
      this.hitsByObjective.add(`${xCoordinate}, ${yCoordinate}`);
      if (!this.objectiveCoordinates) {
        this.objectiveCoordinates = [xCoordinate, yCoordinate];
      }
      if (this.hitsByObjective.size > 1) {
        this.pendingAttacks = new Set();
      }
    }
  }

  #getCalculatedCoordinates(enemyBoard) {
    let coordinate;

    if (this.pendingAttacks.size > 0) {
      coordinate = this.#getOnePendingCoordinate();
    } else {
      if (this.hitsByObjective.size > 1) {
        if (!this.attackDirection) {
          this.attackDirection = this.#calculateDirection();
        }
        coordinate = this.#getContinuousCoordinate(enemyBoard);
      } else {
        coordinate = this.#getAdyacentCoordinate(enemyBoard);
      }
    }

    return coordinate;
  }

  #getContinuousCoordinate(enemyBoard) {
    let coordinates;
    const coordinate1 = this.hitsByObjective.values().next().value;
    const coordinate2 = [...this.hitsByObjective].at(-1);
    const [x, y] = coordinate1.split(", ").map(Number);
    const [x2, y2] = coordinate2.split(", ").map(Number);
    if (this.attackDirection === "x") {
      const mayor = Math.max(x, x2);
      const menor = Math.min(x, x2);
      coordinates = [
        [mayor + 1, y],
        [menor - 1, y],
      ];
    } else {
      const mayor = Math.max(y, y2);
      const menor = Math.min(y, y2);
      coordinates = [
        [x, mayor + 1],
        [x, menor - 1],
      ];
    }

    coordinates = this.#getValidCoordinates(coordinates, enemyBoard);
    const coordinate = this.#getOneCoordinate(coordinates);
    return coordinate;
  }

  #getOneCoordinate(coordinates) {
    const randomIndex = Math.floor(Math.random() * coordinates.length);
    const selectedCoordinate = coordinates[randomIndex];
    coordinates.forEach((coordinate, index) => {
      if (index !== randomIndex) {
        this.pendingAttacks.add(`${coordinate[0]}, ${coordinate[1]}`);
      }
    });
    return selectedCoordinate;
  }

  #getAdyacentCoordinate(enemyBoard) {
    let coordinates = [];
    const [x, y] = this.objectiveCoordinates;
    coordinates.push([x - 1, y]);
    coordinates.push([x + 1, y]);
    coordinates.push([x, y - 1]);
    coordinates.push([x, y + 1]);

    coordinates = this.#getValidCoordinates(coordinates, enemyBoard);
    const coordinate = this.#getOneCoordinate(coordinates);
    return coordinate;
  }

  #getOnePendingCoordinate() {
    const attacks = [...this.pendingAttacks];

    const randomIndex = Math.floor(Math.random() * attacks.length);

    const selectedAttack = attacks[randomIndex];
    const [x, y] = selectedAttack.split(", ").map(Number);
    this.pendingAttacks.delete(selectedAttack);

    return [x, y];
  }

  #getValidCoordinates(coordinates, enemyBoard) {
    const attackedCells = enemyBoard.getAttackedCells();
    const availableCoordinates = coordinates.filter(([x, y]) => {
      const coordinate = `${x}, ${y}`;
      return (
        !attackedCells.has(coordinate) && x >= 0 && x <= 9 && y >= 0 && y <= 9
      );
    });
    return availableCoordinates;
  }

  #calculateDirection() {
    let direction = null;
    const [coordinate1, coordinate2] = this.hitsByObjective;

    const [x, y] = coordinate1.split(", ").map(Number);
    const [x2, y2] = coordinate2.split(", ").map(Number);

    const xDif = Math.abs(x - x2);
    const yDif = Math.abs(y - y2);

    if (xDif > 0) {
      direction = "x";
    }

    if (yDif > 0) {
      direction = "y";
    }
    return direction;
  }

  #getRandomCoordinates(enemyBoard) {
    const attackedCells = enemyBoard.getAttackedCells();
    let x;
    let y;

    if (attackedCells.size === 100) {
      throw new Error("No quedan coordenadas disponibles.");
    }

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (attackedCells.has(`${x},${y}`));

    return [x, y];
  }
}
