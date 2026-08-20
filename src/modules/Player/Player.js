import GameBoard from "../GameBoard/GameBoard";

export default class Player {
  constructor(name, character) {
    this.name = name;
    this.gameBoard = new GameBoard();
    this.character = character;
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

  getCharacter() {
    return this.character;
  }
}
