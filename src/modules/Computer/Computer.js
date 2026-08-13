import Player from "../Player/Player";

export default class Computer extends Player {
  attack(enemyBoard) {
    const [xCoordinate, yCoordinate] = this.#getRandomCoordinates(enemyBoard);
    return enemyBoard.receiveAttack(xCoordinate, yCoordinate);
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
