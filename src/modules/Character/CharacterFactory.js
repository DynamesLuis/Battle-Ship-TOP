import charactersData from "../../gameData/charactersData";
import Character from "./Character";

export default function createCharacter(name, faction = "alliance") {
  const characterData = charactersData[faction].find(char => char.name === name);
  return new Character(characterData.name, characterData.dialogues, characterData.img);
}
