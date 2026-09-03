import ShipPlacementRenderer from "../ShipPlacementRenderer/ShipPlacementRenderer";
import {
  $availableShips,
  $directionBtnContainer,
  $myBoardPlacement,
} from "../domSelector";
import shipsData from "../../gameData/shipsData";
import getShipInfoById from "../../gameData/getShipById";

export default class ShipPlacementController {
  constructor(appState) {
    this.shipDirection = "x";
    this.selectedShip = null;
    this.appState = appState;
    this.shipPlacementRenderer = null;
  }
  init() {
    this.initEvents();
    this.renderShips();
    this.shipPlacementRenderer = new ShipPlacementRenderer(
      this.appState.getPlayer1().getGameBoard(),
    );
  }
  initEvents() {
    $availableShips.addEventListener("click", (e) =>
      this.handleShipSelection(e),
    );
    $directionBtnContainer.addEventListener("click", (e) => {
      this.handleDirectionSelection(e);
    });
    $myBoardPlacement.addEventListener("mouseenter", (e) => {
      this.handleCellMouseEnter(e);
    });
    $myBoardPlacement.addEventListener("mouseleave", () =>
      this.handleCellMouseLeave(),
    );
  }
  renderShips() {
    shipsData.forEach((ship) => {
      const $shipCard = document.createElement("div");
      $shipCard.classList.add("ship-card");
      $shipCard.dataset.id = ship.id;

      $availableShips.appendChild($shipCard);
    });
  }
  handleShipSelection(e) {
    const $shipCard = e.target.closest(".ship-card");
    if (!$shipCard) return;

    const ship = $shipCard.dataset.id;
    this.selectedShip = ship;
    this.#selectCard($availableShips, $shipCard);
  }

  handleDirectionSelection(e) {
    const $button = e.target.closest(".direction-btn");
    if (!$button) return;

    const direction = $button.dataset.direction;
    this.shipDirection = direction;
    this.#selectButton($directionBtnContainer, $button);
  }

  calculateCoordinates(xStartCoordinate, yStartCoordinate, direction, length) {
    const coordinates = [];
    for (let index = 0; index < length; index++) {
      if (direction === "x") {
        coordinates.push([xStartCoordinate + index, yStartCoordinate]);
      } else {
        coordinates.push([xStartCoordinate, yStartCoordinate + index]);
      }
    }

    return coordinates;
  }

  handleCellMouseEnter(e) {
    const $cell = e.target.closest(".cell");
    if (!$cell) return;
    if (!this.selectedShip) return;

    const [xStartCoordinate, yStartCoordinate] = $cell.dataset.coordinate
      .split(", ")
      .map(Number);

    const shipData = getShipInfoById(this.selectedShip);
    const playerBoard = this.appState.getPlayer1().getGameBoard();

    const isValid = playerBoard.canPlaceShip(
      xStartCoordinate,
      yStartCoordinate,
      this.shipDirection,
      shipData.length,
    );
    const coordinates = this.calculateCoordinates(
      xStartCoordinate,
      yStartCoordinate,
      this.shipDirection,
      shipData.length,
    );
    this.shipPlacementRenderer.renderPreview(coordinates, isValid);
  }

  handleCellMouseLeave() {
    this.shipPlacementRenderer.clearPreview();
  }

  #selectButton($container, $button) {
    const $buttons = $container.querySelectorAll(".direction-btn");
    $buttons.forEach(($button) => $button.classList.remove("selected"));
    $button.classList.add("selected");
  }

  #selectCard($container, $card) {
    const $cards = $container.querySelectorAll(".ship-card");
    $cards.forEach(($card) => $card.classList.remove("selected"));
    $card.classList.add("selected");
  }
}
