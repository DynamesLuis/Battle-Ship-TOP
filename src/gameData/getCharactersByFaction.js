import charactersData from "./charactersData";

export default function getCharactersByFaction(faction) {
  return charactersData[faction];
}
