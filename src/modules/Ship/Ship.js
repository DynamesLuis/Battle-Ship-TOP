export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunked = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunked = true;
    }

    return this.sunked;
  }

  getLength() {
    return this.length;
  }
}
