import GameBoard from "../GameBoard/GameBoard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }

  attack(enemyBoard, xCoordinate, yCoordinate) {
    return enemyBoard.receiveAttack(xCoordinate, yCoordinate);
  }

  getName() {
    return this.name;
  }

  getGameBoard() {
    return this.gameBoard;
  }
}
