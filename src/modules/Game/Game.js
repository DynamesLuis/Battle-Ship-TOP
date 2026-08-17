export default class Game {
  constructor(player1, player2) {
    this.attacker = player1;
    this.defender = player2;
  }

  playTurn(xCoordinate, yCoordinate) {
    let results = null;
    if (arguments.length > 0) {
      results = this.attacker.attack(
        this.defender.getGameBoard(),
        xCoordinate,
        yCoordinate,
      );
    } else {
      results = this.attacker.attack(this.defender.getGameBoard());
    }

    if (!this.checkWinner()) {
      this.changeTurn();
    }

    return {
      ...results,
      winner: this.checkWinner(),
    };
  }

  changeTurn() {
    const formerAttacker = this.attacker;
    this.attacker = this.defender;
    this.defender = formerAttacker;
  }

  checkWinner() {
    if (this.defender.getGameBoard().allShipsSunk()) {
      return this.attacker;
    }

    return null;
  }
}
