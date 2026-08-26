import CharacterSelectionController from "./CharacterSelectionController";

let mockPlayerCharacters;
let mockEnemyCharacters;
let mockNextBtn;

jest.mock("../domSelector", () => ({
  get $playerCharacters() {
    return mockPlayerCharacters;
  },

  get $enemyCharacters() {
    return mockEnemyCharacters;
  },

  get $nextBtn() {
    return mockNextBtn;
  },
}));

describe("CharacterSelectionController", () => {
  let characterSelectionController;
  let onNext;
  beforeEach(() => {
    onNext = jest.fn();
    mockPlayerCharacters = document.createElement("div");
    mockEnemyCharacters = document.createElement("div");
    mockPlayerCharacters.innerHTML = `
      <div class="character" data-character="character1"></div>
      <div class="character" data-character="character2"></div>
    `;

    mockEnemyCharacters.innerHTML = `
      <div class="character" data-character="character1"></div>
      <div class="character" data-character="character2"></div>
    `;
    mockNextBtn = document.createElement("button");
    characterSelectionController = new CharacterSelectionController(onNext);
  });

  test("can be created", () => {
    expect(characterSelectionController).toBeDefined();
  });

  test("registers selection events", () => {
    const playerListener = jest.spyOn(mockPlayerCharacters, "addEventListener");

    const enemyListener = jest.spyOn(mockEnemyCharacters, "addEventListener");

    characterSelectionController.initEvents();

    expect(playerListener).toHaveBeenCalledWith("click", expect.any(Function));

    expect(enemyListener).toHaveBeenCalledWith("click", expect.any(Function));
  });

  test("can select a character for the Player", () => {
    characterSelectionController.initEvents();

    const character = mockPlayerCharacters.querySelector(
      '[data-character="character1"]',
    );

    character.click();

    expect(characterSelectionController.playerSelection).toBe("character1");
  });

  test("can select a character for the Opponent", () => {
    characterSelectionController.initEvents();

    const character = mockEnemyCharacters.querySelector(
      '[data-character="character2"]',
    );

    character.click();

    expect(characterSelectionController.enemySelection).toBe("character2");
  });

  test("changing a Player selection replaces the previous one", () => {
    characterSelectionController.initEvents();

    const character1 = mockPlayerCharacters.querySelector(
      '[data-character="character1"]',
    );

    const character2 = mockPlayerCharacters.querySelector(
      '[data-character="character2"]',
    );

    character1.click();
    character2.click();

    expect(characterSelectionController.playerSelection).toBe("character2");
  });

  test("changing an Opponent selection replaces the previous one", () => {
    characterSelectionController.initEvents();

    const character1 = mockEnemyCharacters.querySelector(
      '[data-character="character1"]',
    );

    const character2 = mockEnemyCharacters.querySelector(
      '[data-character="character2"]',
    );

    character1.click();
    character2.click();

    expect(characterSelectionController.enemySelection).toBe("character2");
  });

  test("calls onNext when both characters are selected", () => {
    characterSelectionController.initEvents();

    const playerCharacter = mockPlayerCharacters.querySelector(
      '[data-character="character1"]',
    );

    const enemyCharacter = mockEnemyCharacters.querySelector(
      '[data-character="character2"]',
    );

    playerCharacter.click();
    enemyCharacter.click();

    mockNextBtn.click();

    expect(onNext).toHaveBeenCalledTimes(1);

    expect(onNext).toHaveBeenCalledWith("character1", "character2");
  });

  test("does not call onNext when Player has not selected a character", () => {
    characterSelectionController.initEvents();

    const enemyCharacter = mockEnemyCharacters.querySelector(
      '[data-character="character2"]',
    );

    enemyCharacter.click();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });

  test("does not call onNext when Opponent has not selected a character", () => {
    characterSelectionController.initEvents();

    const playerCharacter = mockPlayerCharacters.querySelector(
      '[data-character="character1"]',
    );

    playerCharacter.click();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });

  test("does not call onNext when neither character is selected", () => {
    characterSelectionController.initEvents();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });
});
