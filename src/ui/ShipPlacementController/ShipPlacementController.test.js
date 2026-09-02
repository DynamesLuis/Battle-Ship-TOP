import ShipPlacementController from "./ShipPlacementController";
import "@testing-library/jest-dom";

let mockAvailableShips;
let mockDirectionBtnContainer;

jest.mock("../domSelector", () => ({
  get $availableShips() {
    return mockAvailableShips;
  },

  get $directionBtnContainer() {
    return mockDirectionBtnContainer;
  },
}));

describe("ShipPlacementController", () => {
  let shipPlacementController;
  let appState;
  let boardRenderer;
  let onNext;

  beforeEach(() => {
    mockAvailableShips = document.createElement("div");
    mockAvailableShips.innerHTML = `
      <div class="ship-card" data-id="1"></div>
      <div class="ship-card" data-id="2"></div>
    `;

    mockDirectionBtnContainer = document.createElement("div");

    appState = {
      getPlayer1: jest.fn(),
    };

    boardRenderer = {
      renderMyBoard: jest.fn(),
    };

    onNext = jest.fn();

    shipPlacementController = new ShipPlacementController(
      appState,
      boardRenderer,
      onNext,
    );
  });

  test("can be created", () => {
    expect(shipPlacementController).toBeDefined();
  });

  test("init renders ships and initializes events", () => {
    const renderShips = jest.spyOn(shipPlacementController, "renderShips");

    const initEvents = jest.spyOn(shipPlacementController, "initEvents");

    shipPlacementController.init();

    expect(renderShips).toHaveBeenCalled();
    expect(initEvents).toHaveBeenCalled();
  });

  test("renders the available ships", () => {
    shipPlacementController.renderShips();

    expect(mockAvailableShips.querySelector('[data-id="1"]')).toBeTruthy();

    expect(mockAvailableShips.querySelector('[data-id="2"]')).toBeTruthy();

    expect(mockAvailableShips.querySelector('[data-id="3"]')).toBeTruthy();

    expect(mockAvailableShips.querySelector('[data-id="4"]')).toBeTruthy();

    expect(mockAvailableShips.querySelector('[data-id="5"]')).toBeTruthy();
  });

  test("selects a ship when its card is clicked", () => {
    shipPlacementController.initEvents();

    const ship = mockAvailableShips.querySelector('[data-id="1"]');

    ship.click();

    expect(shipPlacementController.selectedShip).toBe("1");
  });

  test("selecting another ship replaces the previous selection", () => {
    shipPlacementController.initEvents();

    const ship = mockAvailableShips.querySelector('[data-id="1"]');
    const ship2 = mockAvailableShips.querySelector('[data-id="2"]');

    ship.click();
    ship2.click();

    expect(shipPlacementController.selectedShip).toBe("2");
  });

  test("selected ship is visually marked", () => {
    const carrier = document.createElement("div");
    carrier.classList.add("ship-card");
    carrier.dataset.ship = "1";

    const cruiser = document.createElement("div");
    cruiser.classList.add("ship-card");
    cruiser.dataset.ship = "2";

    mockAvailableShips.append(carrier, cruiser);

    shipPlacementController.initEvents();

    carrier.click();

    expect(carrier).toHaveClass("selected");

    cruiser.click();

    expect(cruiser).toHaveClass("selected");
    expect(carrier).not.toHaveClass("selected");
  });

  //direction
  test("initEvents registers a click event on the direction button container", () => {
    const addEventListener = jest.spyOn(
      mockDirectionBtnContainer,
      "addEventListener",
    );

    shipPlacementController.initEvents();

    expect(addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
  });

  test("selects horizontal direction", () => {
    const horizontalButton = document.createElement("button");
    horizontalButton.classList.add("direction-btn");
    horizontalButton.dataset.direction = "x";

    mockDirectionBtnContainer.appendChild(horizontalButton);

    shipPlacementController.initEvents();

    horizontalButton.click();

    expect(shipPlacementController.shipDirection).toBe("x");
  });

  test("selects vertical direction", () => {
    const verticalButton = document.createElement("button");
    verticalButton.classList.add("direction-btn");
    verticalButton.dataset.direction = "y";

    mockDirectionBtnContainer.appendChild(verticalButton);

    shipPlacementController.initEvents();

    verticalButton.click();

    expect(shipPlacementController.shipDirection).toBe("y");
  });

  test("selecting another direction replaces the previous selection", () => {
    const horizontalButton = document.createElement("button");
    horizontalButton.dataset.direction = "x";

    const verticalButton = document.createElement("button");
    verticalButton.dataset.direction = "y";

    horizontalButton.classList.add("direction-btn");
    verticalButton.classList.add("direction-btn");

    mockDirectionBtnContainer.append(horizontalButton, verticalButton);

    shipPlacementController.initEvents();

    horizontalButton.click();
    verticalButton.click();

    expect(shipPlacementController.shipDirection).toBe("y");
  });

  test("selected direction is visually marked", () => {
    const horizontalButton = document.createElement("button");
    horizontalButton.classList.add("direction-btn");
    horizontalButton.dataset.direction = "x";

    const verticalButton = document.createElement("button");
    verticalButton.classList.add("direction-btn");
    verticalButton.dataset.direction = "y";

    mockDirectionBtnContainer.append(horizontalButton, verticalButton);

    shipPlacementController.initEvents();

    horizontalButton.click();

    expect(horizontalButton).toHaveClass("selected");
    expect(verticalButton).not.toHaveClass("selected");

    verticalButton.click();

    expect(verticalButton).toHaveClass("selected");
    expect(horizontalButton).not.toHaveClass("selected");
  });


  //calculateCoordinates
  test("calculates coordinates horizontally", () => {
    const coordinates = shipPlacementController.calculateCoordinates(
      2,
      3,
      "x",
      3,
    );

    expect(coordinates).toEqual([
      [2, 3],
      [3, 3],
      [4, 3],
    ]);
  });

  test("calculates coordinates vertically", () => {
    const coordinates = shipPlacementController.calculateCoordinates(
      2,
      3,
      "y",
      3,
    );

    expect(coordinates).toEqual([
      [2, 3],
      [2, 4],
      [2, 5],
    ]);
  });

  test("includes the initial coordinate", () => {
    const coordinates = shipPlacementController.calculateCoordinates(
      2,
      3,
      "x",
      3,
    );

    expect(coordinates[0]).toEqual([2, 3]);
  });

  test("returns as many coordinates as length", () => {
    const length = 4;

    const coordinates = shipPlacementController.calculateCoordinates(
      2,
      3,
      "x",
      length,
    );

    expect(coordinates).toHaveLength(length);
  });

  test("returns one coordinate when length is 1", () => {
    const coordinates = shipPlacementController.calculateCoordinates(
      2,
      3,
      "x",
      1,
    );

    expect(coordinates).toEqual([[2, 3]]);
  });

  test("can return coordinates outside the board", () => {
    const coordinates = shipPlacementController.calculateCoordinates(
      8,
      3,
      "x",
      4,
    );

    expect(coordinates).toEqual([
      [8, 3],
      [9, 3],
      [10, 3],
      [11, 3],
    ]);
  });
});
