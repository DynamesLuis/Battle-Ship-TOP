import ShipPlacementController from "./ShipPlacementController";
import "@testing-library/jest-dom";

let mockAvailableShips;

jest.mock("../domSelector", () => ({
  get $availableShips() {
    return mockAvailableShips;
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
});
