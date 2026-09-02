import { $myBoardPlacement } from "../domSelector";

export default class ShipPlacementRenderer {
  constructor(playerBoard) {
    this.playerBoard = playerBoard;
  }

  renderBoard() {
    $myBoardPlacement.innerHTML = "";
    const occupiedCells = this.playerBoard.getOccupiedCells(); //Map

    for (let col = 0; col < this.playerBoard.getLength(); col++) {
      for (let row = 0; row < this.playerBoard.getHeight(); row++) {
        const cell = document.createElement("div");

        cell.dataset.coordinate = `${row}, ${col}`;

        cell.classList.add("cell");

        if (occupiedCells.has(`${row}, ${col}`)) {
          cell.classList.add("occupied");
        }
        $myBoardPlacement.append(cell);
      }
    }
  }

  renderPreview(coordinates, isValid) {
    const className = isValid ? "preview-valid" : "preview-invalid";
    for (const coordinate of coordinates) {
      const $cell = $myBoardPlacement.querySelector(
        `[data-coordinate="${coordinate[0]}, ${coordinate[1]}"]`,
      );
      $cell.classList.add(className);
    }
  }

  clearPreview() {
    const $cells = $myBoardPlacement.querySelectorAll(
      ".preview-valid, .preview-invalid",
    );
    $cells.forEach(($cell) => {
      $cell.classList.remove("preview-valid", "preview-invalid");
    });
  }
}
