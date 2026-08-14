export default class BoardRender {
  renderMyBoard(gameBoard, $container) {
    $container.innerHTML = "";
    const occupiedCells = gameBoard.getOccupiedCells(); //Map
    const attackedCells = gameBoard.getAttackedCells(); //set

    for (let col = 0; col < gameBoard.getLength(); col++) {
      for (let row = 0; row < gameBoard.getHeight(); row++) {
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

  renderEnemyBoard(gameBoard, $container) {
    $container.innerHTML = "";
    const attackedCells = gameBoard.getAttackedCells();
    const occupiedCells = gameBoard.getOccupiedCells();//set

    for (let col = 0; col < gameBoard.getLength(); col++) {
      for (let row = 0; row < gameBoard.getHeight(); row++) {
        const cell = document.createElement("div");

        cell.dataset.coordinate = `${row}, ${col}`;

        cell.classList.add("cell");

        if (attackedCells.has(`${row}, ${col}`)) {
          cell.classList.add("attacked");
        }

        if (attackedCells.has(`${row}, ${col}`) && occupiedCells.has(`${row}, ${col}`)) {
          cell.classList.add("occupied");
        }

        $container.append(cell);
      }
    }
  }
}

