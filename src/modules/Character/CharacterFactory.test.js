import createCharacter from "../Character/CharacterFactory";
import Character from "./Character";
import charactersData from "../../gameData/charactersData";

describe.skip("createCharacter", () => {
  test("creates a Character from the alliance faction", () => {
    const character = createCharacter("Anduin Wrynn", "alliance");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Anduin Wrynn");
  });

  test("creates a Character from the horde faction", () => {
    const character = createCharacter("Thrall", "horde");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Thrall");
  });

  test("uses alliance as the default faction", () => {
    const character = createCharacter("Anduin Wrynn");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Anduin Wrynn");
  });

  test("creates the Character using its predefined data", () => {
    const characterName = "Anduin Wrynn";
    const character = createCharacter("Anduin Wrynn", "alliance");
    const charecerData = charactersData["alliance"].find(char => char.name === characterName);

    expect(character.getName()).toBe("Anduin Wrynn");
    expect(character.getImg()).toBe(charecerData.img);
    expect(character.getDialogues()).toEqual(
      charecerData.dialogues,
    );
  });
});
