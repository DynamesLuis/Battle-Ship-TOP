import Ship from "../Ship/Ship";

export default class GameBoard {
  constructor() {
    this.ships = [];
    this.attackedCells = new Set();
    this.occupiedCells = new Map();
    this.length = 10;
    this.height = 10;
  }

  getLength() {
    return this.length;
  }

  getHeight() {
    return this.height;
  }

  getAttackedCells() {
    return new Set(this.attackedCells);
  }

  getOccupiedCells() {
    return new Map(this.occupiedCells);
  }

  getShips() {
    return this.ships;
  }

  receiveAttack(xCoordinate, yCoordinate) {
    const ship = this.occupiedCells.get(`${xCoordinate}, ${yCoordinate}`);
    let isHit = "miss";
    if (ship) {
      ship.hit();
      isHit = "hit";
    }
    this.attackedCells.add(`${xCoordinate}, ${yCoordinate}`);
    return {
      attackResult: isHit,
      sunkedShip: ship ? ship.isSunk() : false,
    };
  }

  placeShip(xStartCoordinate, yStartCoordinate, direction, length, name) {
    const canPlaceShip = this.canPlaceShip(
      xStartCoordinate,
      yStartCoordinate,
      direction,
      length,
    );
    if (!canPlaceShip) {
      return canPlaceShip;
    }

    const newShip = new Ship(length, name);
    this.ships.push(newShip);

    const coordinatesLenght = this.#calculateCoordinatesLenght(
      newShip.length,
      xStartCoordinate,
      yStartCoordinate,
      direction,
    );

    coordinatesLenght.forEach((coordinate) =>
      this.occupiedCells.set(coordinate, newShip),
    );

    return true;
  }

  canPlaceShip(xStartCoordinate, yStartCoordinate, direction, length) {
    const coordinates = this.#calculateCoordinatesLenght(
      length,
      xStartCoordinate,
      yStartCoordinate,
      direction,
    );
    for (const coordinate of coordinates) {
      const ship = this.occupiedCells.get(coordinate);

      if (ship) {
        return false;
      }
    }

    if (direction === "x") {
      if (xStartCoordinate + length > this.length) {
        return false;
      }
    } else {
      if (yStartCoordinate + length > this.height) {
        return false;
      }
    }

    return true;
  }

  allShipsSunk() {
    if (this.ships.length === 0) return false;
    return this.ships.every((ship) => ship.isSunk());
  }

  #calculateCoordinatesLenght(
    length,
    xStartCoordinate,
    yStartCoordinate,
    direction,
  ) {
    const coordinates = [];
    for (let index = 0; index < length; index++) {
      if (direction === "x") {
        coordinates.push(`${xStartCoordinate + index}, ${yStartCoordinate}`);
      } else {
        coordinates.push(`${xStartCoordinate}, ${yStartCoordinate + index}`);
      }
    }

    return coordinates;
  }
}
