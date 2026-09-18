import createCharacter from "../Character/CharacterFactory";
import Character from "./Character";
import charactersData from "../../gameData/charactersData";

describe.skip("createCharacter", () => {
  test("creates a Character from the alliance faction", () => {
    const character = createCharacter("1", "valedorn");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Aldren Veyr");
  });

  test("creates a Character from the horde faction", () => {
    const character = createCharacter("7", "ashes");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Korga Rompehuesos");
  });

  test("uses alliance as the default faction", () => {
    const character = createCharacter("1");

    expect(character).toBeInstanceOf(Character);
    expect(character.getName()).toBe("Aldren Veyr");
  });

  test("creates the Character using its predefined data", () => {
    const character = createCharacter("1", "valedorn");
    const charecerData = charactersData["valedorn"].find(
      (char) => char.id === "1",
    );

    expect(character.getName()).toBe("Aldren Veyr");
    expect(character.getImg()).toBe(charecerData.img);
    expect(character.getDialogues()).toEqual(charecerData.dialogues);
  });
});
