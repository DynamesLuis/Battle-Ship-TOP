import shipsData from "../../gameData/shipsData";

export default function computerShipPlacer(gameBoard) {
  for (const ship of shipsData) {
    while (true) {
      const direction = getRandomDirection();
      const [xStart, yStart] = getRandomStartingCoordinates();
      const isPlaced = gameBoard.placeShip(
        xStart,
        yStart,
        direction,
        ship.length,
        ship.name
      );

      if (isPlaced) {
        break;
      }
    }
  }

  function getRandomDirection() {
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    return randomNumber === 1 ? "x" : "y";
  }
  function getRandomStartingCoordinates() {
    const randomX = Math.floor(Math.random() * gameBoard.getLength());
    const randomY = Math.floor(Math.random() * gameBoard.getHeight());
    return [randomX, randomY];
  }
}
