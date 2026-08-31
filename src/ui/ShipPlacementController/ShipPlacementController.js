import { $availableShips } from "../domSelector";
import shipsData from "../../gameData/shipsData";

export default class ShipPlacementController {
  constructor() {
    this.shipDirection = "x";
    this.selectedShip = null;
  }
  init() {
    this.initEvents();
    this.renderShips();
  }
  initEvents() {
    $availableShips.addEventListener("click", (e) =>
      this.handleShipSelection(e),
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
  handleDirectionSelection() {}

  #selectCard($container, $card) {
    const $cards = $container.querySelectorAll(".ship-card");
    $cards.forEach(($card) => $card.classList.remove("selected"));
    $card.classList.add("selected");
  }
}
