import Game from "./Game";
import Player from "../Player/Player";
import Computer from "../Computer/Computer";

describe.skip("Game", () => {
  test("starts with Player 1 as attacker and Player 2 as defender", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    const game = new Game(player1, player2);

    expect(game.attacker).toBe(player1);
    expect(game.defender).toBe(player2);
  });

  test("attacker attacks the defender at the given coordinates", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    const enemyBoard = player2.getGameBoard();
    const receiveAttack = jest.spyOn(enemyBoard, "receiveAttack");

    const game = new Game(player1, player2);

    game.playTurn(3, 4);

    expect(receiveAttack).toHaveBeenCalledWith(3, 4);
  });

  test("changes attacker and defender after a turn without a winner", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    const game = new Game(player1, player2);

    game.playTurn(3, 4);

    expect(game.attacker).toBe(player2);
    expect(game.defender).toBe(player1);
  });

  test("does not change attacker and defender after a winning attack", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player2.getGameBoard().placeShip(0, 0, "x", 1);

    const game = new Game(player1, player2);

    game.playTurn(0, 0);

    expect(game.attacker).toBe(player1);
    expect(game.defender).toBe(player2);
  });

  test("Computer can play a turn without receiving coordinates", () => {
    const computer = new Computer("Computer");
    const player = new Player("Player");

    const enemyBoard = player.getGameBoard();
    const receiveAttack = jest.spyOn(enemyBoard, "receiveAttack");

    const game = new Game(computer, player);

    game.playTurn();

    expect(receiveAttack).toHaveBeenCalledTimes(1);
  });

  test("changes attacker and defender after Computer's turn", () => {
    const computer = new Computer("Computer");
    const player = new Player("Player");

    const game = new Game(computer, player);

    game.playTurn();

    expect(game.attacker).toBe(player);
    expect(game.defender).toBe(computer);
  });

  test("checkWinner returns the attacker when the defender has lost", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player2.getGameBoard().placeShip(0, 0, "x", 1);

    const game = new Game(player1, player2);

    player1.attack(player2.getGameBoard(), 0, 0);

    expect(game.checkWinner()).toBe(player1);
  });

  test("checkWinner returns null when the defender still has ships", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player2.getGameBoard().placeShip(0, 0, "x", 2);

    const game = new Game(player1, player2);

    player1.attack(player2.getGameBoard(), 0, 0);

    expect(game.checkWinner()).toBeNull();
  });

  test("playTurn returns the result of a missed attack", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    const game = new Game(player1, player2);

    const result = game.playTurn(3, 4);

    expect(result).toEqual({
      winner: null,
      attackResult: "miss",
      sunkedShip: false,
    });
  });

  test("playTurn returns hit when an attack hits a ship without sinking it", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player2.getGameBoard().placeShip(0, 0, "x", 2);

    const game = new Game(player1, player2);

    const result = game.playTurn(0, 0);

    expect(result).toEqual({
      winner: null,
      attackResult: "hit",
      sunkedShip: false,
    });
  });

  test("playTurn returns the winner and sunked ship when the attack wins the game", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player2.getGameBoard().placeShip(0, 0, "x", 1);

    const game = new Game(player1, player2);

    const result = game.playTurn(0, 0);

    expect(result).toEqual({
      winner: player1,
      attackResult: "hit",
      sunkedShip: true,
    });
  });

  test("playTurn returns sunkedShip true when a ship is sunk but the game continues", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player2.getGameBoard().placeShip(0, 0, "x", 1);
    player2.getGameBoard().placeShip(5, 5, "x", 2);

    const game = new Game(player1, player2);

    const result = game.playTurn(0, 0);

    expect(result).toEqual({
      winner: null,
      attackResult: "hit",
      sunkedShip: true,
    });
  });
});
