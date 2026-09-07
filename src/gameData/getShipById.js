import shipsData from "./shipsData";

export default function getShipInfoById(id) {
  return shipsData.find((ship) => ship.id === id);
}
