import createCharacter from "../Character/CharacterFactory";
import Character from "./Character";
import charactersData from "../../gameData/charactersData";

describe.skip("createCharacter", () => {
  test("creates a Character from the alliance faction", () => {
    const character = createCharacter("1", "alliance");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Anduin Wrynn");
  });

  test("creates a Character from the horde faction", () => {
    const character = createCharacter("6", "horde");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Thrall");
  });

  test("uses alliance as the default faction", () => {
    const character = createCharacter("1");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Anduin Wrynn");
  });

  test("creates the Character using its predefined data", () => {
    const character = createCharacter("1", "alliance");
    const charecerData = charactersData["alliance"].find(
      (char) => char.id === "1",
    );

    expect(character.getName()).toBe("Anduin Wrynn");
    expect(character.getImg()).toBe(charecerData.img);
    expect(character.getDialogues()).toEqual(charecerData.dialogues);
  });
});
