import ShipPlacementController from "./ShipPlacementController";
import ShipPlacementRenderer from "../ShipPlacementRenderer/ShipPlacementRenderer";
import getShipInfoById from "../../gameData/getShipById";
import "@testing-library/jest-dom";

//corregir mock
let mockAvailableShips;
let mockDirectionBtnContainer;
let mockMyBoardPlacement;
let mockShipPlacementRenderer;

jest.mock("../../gameData/getShipById", () => jest.fn());

jest.mock("../ShipPlacementRenderer/ShipPlacementRenderer", () => ({
  __esModule: true,
  default: jest.fn(() => mockShipPlacementRenderer),
}));

jest.mock("../domSelector", () => ({
  get $availableShips() {
    return mockAvailableShips;
  },

  get $directionBtnContainer() {
    return mockDirectionBtnContainer;
  },

  get $myBoardPlacement() {
    return mockMyBoardPlacement;
  },
}));

describe("ShipPlacementController", () => {
  let shipPlacementController;
  let appState;
  let playerBoard;
  let player;
  let cell;
  let shipCard;

  beforeEach(() => {
    mockShipPlacementRenderer = {
      renderBoard: jest.fn(),
      renderPreview: jest.fn(),
      clearPreview: jest.fn(),
    };

    mockAvailableShips = document.createElement("div");
    mockAvailableShips.innerHTML = `
      <div class="ship-card" data-id="1"></div>
      <div class="ship-card" data-id="2"></div>
    `;

    mockDirectionBtnContainer = document.createElement("div");
    mockMyBoardPlacement = document.createElement("div");

    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.coordinate = "2, 3";
    mockMyBoardPlacement.appendChild(cell);

    shipCard = mockAvailableShips.querySelector('[data-id="1"]');

    playerBoard = {
      canPlaceShip: jest.fn(),
      placeShip: jest.fn(),
    };

    player = {
      getGameBoard: jest.fn().mockReturnValue(playerBoard),
    };

    appState = {
      getPlayer1: jest.fn().mockReturnValue(player),
    };

    shipPlacementController = new ShipPlacementController(appState);

    shipPlacementController.selectedShip = "1";
    shipPlacementController.shipPlacementRenderer = mockShipPlacementRenderer;

    getShipInfoById.mockReturnValue({
      id: "1",
      name: "Flagship",
      length: 5,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("can be created", () => {
    expect(shipPlacementController).toBeDefined();
  });

  test("creates ShipPlacementRenderer with the player's GameBoard", () => {
    const playerBoard = {};
    const player = {
      getGameBoard: jest.fn().mockReturnValue(playerBoard),
    };

    appState.getPlayer1 = jest.fn().mockReturnValue(player);

    shipPlacementController.init();

    expect(ShipPlacementRenderer).toHaveBeenCalledWith(playerBoard);
  });

  test("init renders ships and initializes events", () => {
    const playerBoard = {};
    const player = {
      getGameBoard: jest.fn().mockReturnValue(playerBoard),
    };

    appState.getPlayer1 = jest.fn().mockReturnValue(player);
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

  // //mouseEnter
  test("gets the coordinate when entering a cell", () => {
    const calculateCoordinates = jest
      .spyOn(shipPlacementController, "calculateCoordinates")
      .mockReturnValue([
        [2, 3],
        [3, 3],
        [4, 3],
      ]);

    shipPlacementController.handleCellMouseEnter({
      target: cell,
    });

    expect(calculateCoordinates).toHaveBeenCalledWith(2, 3, "x", 5);
  });

  test("calculates the coordinates of the selected ship", () => {
    const calculateCoordinates = jest
      .spyOn(shipPlacementController, "calculateCoordinates")
      .mockReturnValue([
        [2, 3],
        [3, 3],
        [4, 3],
      ]);

    shipPlacementController.handleCellMouseEnter({
      target: cell,
    });

    expect(calculateCoordinates).toHaveBeenCalledWith(2, 3, "x", 5);
  });

  test("checks if the ship can be placed at the selected position", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    jest
      .spyOn(shipPlacementController, "calculateCoordinates")
      .mockReturnValue(coordinates);

    playerBoard.canPlaceShip.mockReturnValue(true);

    shipPlacementController.handleCellMouseEnter({
      target: cell,
    });

    expect(playerBoard.canPlaceShip).toHaveBeenCalledWith(2, 3, "x", 5);
  });

  test("renders a valid preview when the ship can be placed", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    jest
      .spyOn(shipPlacementController, "calculateCoordinates")
      .mockReturnValue(coordinates);

    playerBoard.canPlaceShip.mockReturnValue(true);

    shipPlacementController.handleCellMouseEnter({
      target: cell,
    });

    expect(mockShipPlacementRenderer.renderPreview).toHaveBeenCalledWith(
      coordinates,
      true,
    );
  });

  test("renders an invalid preview when the ship cannot be placed", () => {
    const coordinates = [
      [2, 3],
      [3, 3],
      [4, 3],
    ];

    jest
      .spyOn(shipPlacementController, "calculateCoordinates")
      .mockReturnValue(coordinates);

    playerBoard.canPlaceShip.mockReturnValue(false);

    shipPlacementController.handleCellMouseEnter({
      target: cell,
    });

    expect(mockShipPlacementRenderer.renderPreview).toHaveBeenCalledWith(
      coordinates,
      false,
    );
  });

  test("does not render a preview when no ship is selected", () => {
    shipPlacementController.selectedShip = null;

    shipPlacementController.handleCellMouseEnter({
      target: cell,
    });

    expect(mockShipPlacementRenderer.renderPreview).not.toHaveBeenCalled();
    expect(playerBoard.canPlaceShip).not.toHaveBeenCalled();
  });

  test("clears the preview when leaving a cell", () => {
    shipPlacementController.handleCellMouseLeave();

    expect(mockShipPlacementRenderer.clearPreview).toHaveBeenCalled();
  });

  //handleCellClick

  test("does not attempt to place a ship when no ship is selected", () => {
    shipPlacementController.selectedShip = null;
    shipPlacementController.selectedDirection = "x";

    shipPlacementController.handleCellClick({ target: cell });

    expect(playerBoard.placeShip).not.toHaveBeenCalled();
  });

  test("does not attempt to place a ship when no direction is selected", () => {
    shipPlacementController.selectedShip = "1";
    shipPlacementController.shipDirection = null;

    shipPlacementController.handleCellClick({ target: cell });

    expect(playerBoard.placeShip).not.toHaveBeenCalled();
  });

  test("attempts to place the selected ship with the correct data", () => {
    shipPlacementController.selectedShip = "1";
    shipPlacementController.selectedDirection = "x";

    shipPlacementController.handleCellClick({ target: cell });

    cell.click();

    expect(playerBoard.placeShip).toHaveBeenCalledWith(2, 3, "x", 5);
  });

  describe("when the placement is valid", () => {
    beforeEach(() => {
      shipPlacementController.selectedShip = "1";
      shipPlacementController.selectedDirection = "x";

      playerBoard.placeShip.mockReturnValue(true);

      shipPlacementController.handleCellClick({ target: cell });
    });

    test("registers the ship as placed", () => {
      expect(shipPlacementController.placedShips).toContain("1");
    });

    test("marks the ship card as placed", () => {
      expect(shipCard).toHaveClass("placed");
    });

    test("clears the selected ship", () => {
      expect(shipPlacementController.selectedShip).toBeNull();
    });

    test("renders the board again", () => {
      expect(mockShipPlacementRenderer.renderBoard).toHaveBeenCalled();
    });
  });

  describe("when the placement is invalid", () => {
    beforeEach(() => {
      shipPlacementController.selectedShip = "1";
      shipPlacementController.selectedDirection = "x";

      playerBoard.placeShip.mockReturnValue(false);

      cell.click();
    });

    test("does not register the ship as placed", () => {
      expect(shipPlacementController.placedShips).not.toContain("1");
    });

    test("does not mark the ship card as placed", () => {
      expect(shipCard).not.toHaveClass("placed");
    });

    test("keeps the selected ship", () => {
      expect(shipPlacementController.selectedShip).toBe("1");
    });

    test("does not render the board", () => {
      expect(mockShipPlacementRenderer.renderBoard).not.toHaveBeenCalled();
    });
  });
});
