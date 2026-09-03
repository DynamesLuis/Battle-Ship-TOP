import shipsData from "./shipsData";

export default function getShipInfoById(id) {
  return shipsData[id];
}
