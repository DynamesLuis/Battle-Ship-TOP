export default class AppState {
  constructor() {
    this.name = null;
    this.character1 = null;
    this.character2 = null;
    this.player1 = null;
    this.player2 = null;
  }

  getName() {
    return this.name;
  }

  getCharacter1() {
    return this.character1;
  }

  getCharacter2() {
    return this.character2;
  }

  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }

  setName(name) {
    this.name = name;
  }

  setCharacter1(character1) {
    this.character1 = character1;
  }

  setCharacter2(character2) {
    this.character2 = character2;
  }

  setPlayer1(player1) {
    this.player1 = player1;
  }

  setPlayer2(player2) {
    this.player2 = player2;
  }
}
