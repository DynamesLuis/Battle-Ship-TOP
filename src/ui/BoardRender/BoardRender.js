export default class BoardRender {
  constructor(myBoard, enemyBoard) {
    this.myBoard = myBoard;
    this.enemyBoard = enemyBoard;
  }

  renderMyBoard($container) {
    $container.innerHTML = "";
    const occupiedCells = this.myBoard.getOccupiedCells(); //Map
    const attackedCells = this.myBoard.getAttackedCells(); //set

    for (let col = 0; col < this.myBoard.getLength(); col++) {
      for (let row = 0; row < this.myBoard.getHeight(); row++) {
        const cell = document.createElement("div");

        cell.dataset.coordinate = `${row}, ${col}`;

        cell.classList.add("cell");

        if (occupiedCells.has(`${row}, ${col}`)) {
          cell.classList.add("occupied");
        }

        if (attackedCells.has(`${row}, ${col}`)) {
          cell.classList.add("attacked");
        }

        $container.append(cell);
      }
    }
  }

  renderEnemyBoard($container) {
    $container.innerHTML = "";
    const attackedCells = this.enemyBoard.getAttackedCells();
    const occupiedCells = this.enemyBoard.getOccupiedCells(); //set

    for (let col = 0; col < this.enemyBoard.getLength(); col++) {
      for (let row = 0; row < this.enemyBoard.getHeight(); row++) {
        const cell = document.createElement("div");

        cell.dataset.coordinate = `${row}, ${col}`;

        cell.classList.add("cell");

        if (attackedCells.has(`${row}, ${col}`)) {
          cell.classList.add("attacked");
        }

        if (
          attackedCells.has(`${row}, ${col}`) &&
          occupiedCells.has(`${row}, ${col}`)
        ) {
          cell.classList.add("occupied");
        }

        $container.append(cell);
      }
    }
  }
}
