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

describe.skip("getRandomDialogue", () => {
  let character;
  let dialogues;

  beforeEach(() => {
    dialogues = {
      hit: ["Nice shot!", "Got you!"],
      miss: ["You missed!", "Try again!"],
      sunk: ["You sank my ship!", "That's one down!"],
      win: ["We won!", "Victory!"],
    };

    character = new Character("Captain", dialogues, "captain.png");
  });

  test("returns a random dialogue from hit dialogues", () => {
    const result = character.getRandomDialogue("hit");

    expect(dialogues.hit).toContain(result);
  });

  test("returns a random dialogue from miss dialogues", () => {
    const result = character.getRandomDialogue("miss");

    expect(dialogues.miss).toContain(result);
  });

  test("returns a random dialogue from sunk dialogues", () => {
    const result = character.getRandomDialogue("sunk");

    expect(dialogues.sunk).toContain(result);
  });

  test("returns a random dialogue from win dialogues", () => {
    const result = character.getRandomDialogue("win");

    expect(dialogues.win).toContain(result);
  });
});
