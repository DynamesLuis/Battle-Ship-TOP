import Character from "./Character";

describe.skip("Character", () => {
  let character;
  let dialogues;

  beforeEach(() => {
    dialogues = {
      hit: ["Nice shot!"],
      miss: ["You missed!"],
      sunk: ["You sank my ship!"],
      victory: ["We won!"],
    };

    character = new Character("Captain", dialogues, "captain.png");
  });

  test("creates a character with name, image and dialogues", () => {
    expect(character.getName()).toBe("Captain");
    expect(character.getImg()).toBe("captain.png");
    expect(character.getDialogues()).toEqual(dialogues);
  });

  test("returns the character name", () => {
    expect(character.getName()).toBe("Captain");
  });

  test("returns the character image", () => {
    expect(character.getImg()).toBe("captain.png");
  });

  test("returns the character dialogues", () => {
    expect(character.getDialogues()).toEqual(dialogues);
  });
});
