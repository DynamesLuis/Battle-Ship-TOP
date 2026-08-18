export default class Game {
  constructor(player1, player2) {
    this.attacker = player1;
    this.defender = player2;
  }

  playRound(xCoordinate, yCoordinate) {
    let playerResults = null;
    let computerResults = null;
    let winner = null;

    playerResults = this.playTurn(xCoordinate, yCoordinate);

    if (!playerResults.winner) {
      computerResults = this.playTurn();
    }

    if (playerResults.winner) {
      winner = playerResults.winner;
    } else if (computerResults.winner) {
      winner = computerResults.winner;
    }

    return {
      playerResults,
      computerResults,
      winner,
    };
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
