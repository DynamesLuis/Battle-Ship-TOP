import charactersData from "../../gameData/charactersData";
import Character from "./Character";

export default function createCharacter(id, faction = "alliance") {
  const characterData = charactersData[faction].find(char => char.id === id);
  return new Character(characterData.name, characterData.dialogues, characterData.img);
}
