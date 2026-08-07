import Ship from "../Ship/Ship";

export default class GameBoard {
  constructor() {
    this.ships = [];
    this.attackedCells = new Set();
    this.occupiedCells = new Map();
  }

  getAttackedCells() {
    return this.attackedCells;
  }

  getOccupiedCells() {
    return this.occupiedCells;
  }

  receiveAttack(xCoordinate, yCoordinate) {
    const ship = this.occupiedCells.get(`${xCoordinate}, ${yCoordinate}`);
    if (ship) {
      ship.hit();
    }
    this.attackedCells.add(`${xCoordinate}, ${yCoordinate}`);
  }

  placeShip(xStartCoordinate, yStartCoordinate, direction, length) {
    const newShip = new Ship(length);
    this.ships.push(newShip);

    const coordinatesLenght = this.#calculateCoordinatesLenght(
      newShip,
      xStartCoordinate,
      yStartCoordinate,
      direction,
    );

    coordinatesLenght.forEach((coordinate) =>
      this.occupiedCells.set(coordinate, newShip),
    );
  }

  allShipsSunk() {
    if (this.ships.length === 0) return false;
    return this.ships.every((ship) => ship.isSunk());
  }

  #calculateCoordinatesLenght(
    ship,
    xStartCoordinate,
    yStartCoordinate,
    direction,
  ) {
    const coordinates = [];
    for (let index = 0; index < ship.getLength(); index++) {
      if (direction === "x") {
        coordinates.push(`${xStartCoordinate + index}, ${yStartCoordinate}`);
      } else {
        coordinates.push(`${xStartCoordinate}, ${yStartCoordinate + index}`);
      }
    }

    return coordinates;
  }
}
