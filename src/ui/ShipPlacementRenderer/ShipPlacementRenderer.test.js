import GameBoard from "../../modules/GameBoard/GameBoard";
import ShipPlacementRenderer from "./ShipPlacementRenderer";
import "@testing-library/jest-dom";

let mockMyBoardPlacement;

jest.mock("../domSelector", () => ({
  get $myBoardPlacement() {
    return mockMyBoardPlacement;
  },
}));

describe("ShipPlacementRenderer", () => {
  let playerBoard;
  let renderer;

  beforeEach(() => {
    playerBoard = new GameBoard();
    renderer = new ShipPlacementRenderer(playerBoard);

    mockMyBoardPlacement = document.createElement("div");

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.coordinate = `${x}, ${y}`;

        mockMyBoardPlacement.appendChild(cell);
      }
    }
  });

  test("can be instantiated with a playerBoard", () => {
    expect(renderer).toBeInstanceOf(ShipPlacementRenderer);
  });

  test("renders the player board", () => {
    renderer.renderBoard();

    expect(mockMyBoardPlacement.children.length).toBeGreaterThan(0);
  });

  test("renders the correct board size", () => {
    renderer.renderBoard();

    expect(mockMyBoardPlacement.children).toHaveLength(100);
  });

  test("renders occupied cells correctly", () => {
    playerBoard.placeShip(1, 2, "x", 3);

    renderer.renderBoard();

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="1, 2"]'),
    ).toHaveClass("occupied");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="2, 2"]'),
    ).toHaveClass("occupied");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="3, 2"]'),
    ).toHaveClass("occupied");
  });

  //preview
  test("renders received coordinates as a valid preview", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    renderer.renderPreview(coordinates, true);

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="2, 3"]'),
    ).toHaveClass("preview-valid");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="3, 3"]'),
    ).toHaveClass("preview-valid");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="4, 3"]'),
    ).toHaveClass("preview-valid");
  });

  test("renders received coordinates as an invalid preview", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    renderer.renderPreview(coordinates, false);

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="2, 3"]'),
    ).toHaveClass("preview-invalid");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="3, 3"]'),
    ).toHaveClass("preview-invalid");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="4, 3"]'),
    ).toHaveClass("preview-invalid");
  });

  test("does not affect cells outside the preview", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    renderer.renderPreview(coordinates, true);

    const cell = mockMyBoardPlacement.querySelector('[data-coordinate="5, 3"]');

    expect(cell).not.toHaveClass("preview-valid");
    expect(cell).not.toHaveClass("preview-invalid");
  });

  //clear preview
  test("removes an existing preview", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    renderer.renderPreview(coordinates, true);

    renderer.clearPreview();

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="2, 3"]'),
    ).not.toHaveClass("preview-valid");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="3, 3"]'),
    ).not.toHaveClass("preview-valid");

    expect(
      mockMyBoardPlacement.querySelector('[data-coordinate="4, 3"]'),
    ).not.toHaveClass("preview-valid");
  });

  test("does not remove other board states", () => {
    playerBoard.placeShip(2, 3, "x", 3);

    // Volvemos a renderizar para representar el estado actualizado.
    renderer.renderBoard();

    renderer.renderPreview(
      [
        [2, 3],
        [3, 3],
        [4, 3],
      ],
      true,
    );

    renderer.clearPreview();

    const cell = mockMyBoardPlacement.querySelector('[data-coordinate="2, 3"]');

    expect(cell).toHaveClass("occupied");
    expect(cell).not.toHaveClass("preview-valid");
    expect(cell).not.toHaveClass("preview-invalid");
  });

  //integrity
  test("rendering and clearing preview do not modify the playerBoard", () => {
    const occupiedCellsBefore = new Map(playerBoard.getOccupiedCells());

    renderer.renderPreview(
      [
        [5, 5],
        [6, 5],
      ],
      true,
    );

    renderer.clearPreview();

    expect(playerBoard.getOccupiedCells()).toEqual(occupiedCellsBefore);
  });
});
