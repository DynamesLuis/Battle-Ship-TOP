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

describe.skip("CharacterSelectionController", () => {
  let characterSelectionController;
  let onNext;
  beforeEach(() => {
    onNext = jest.fn();
    mockPlayerCharacters = document.createElement("div");
    mockEnemyCharacters = document.createElement("div");
    mockPlayerCharacters.innerHTML = `
      <div class="character" data-id="1"></div>
      <div class="character" data-id="2"></div>
    `;

    mockEnemyCharacters.innerHTML = `
      <div class="character" data-id="6"></div>
      <div class="character" data-id="7"></div>
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
      '[data-id="1"]',
    );

    character.click();

    expect(characterSelectionController.playerSelection).toBe("1");
  });

  test("can select a character for the Opponent", () => {
    characterSelectionController.initEvents();

    const character = mockEnemyCharacters.querySelector(
      '[data-id="6"]',
    );

    character.click();

    expect(characterSelectionController.enemySelection).toBe("6");
  });

  test("changing a Player selection replaces the previous one", () => {
    characterSelectionController.initEvents();

    const character1 = mockPlayerCharacters.querySelector(
      '[data-id="1"]',
    );

    const character2 = mockPlayerCharacters.querySelector(
      '[data-id="2"]',
    );

    character1.click();
    character2.click();

    expect(characterSelectionController.playerSelection).toBe("2");
  });

  test("changing an Opponent selection replaces the previous one", () => {
    characterSelectionController.initEvents();

    const character1 = mockEnemyCharacters.querySelector(
      '[data-id="6"]',
    );

    const character2 = mockEnemyCharacters.querySelector(
      '[data-id="7"]',
    );

    character1.click();
    character2.click();

    expect(characterSelectionController.enemySelection).toBe("7");
  });

  test("calls onNext when both characters are selected", () => {
    characterSelectionController.initEvents();

    const playerCharacter = mockPlayerCharacters.querySelector(
      '[data-id="1"]',
    );

    const enemyCharacter = mockEnemyCharacters.querySelector(
      '[data-id="6"]',
    );

    playerCharacter.click();
    enemyCharacter.click();

    mockNextBtn.click();

    expect(onNext).toHaveBeenCalledTimes(1);

    expect(onNext).toHaveBeenCalledWith("1", "6");
  });

  test("does not call onNext when Player has not selected a character", () => {
    characterSelectionController.initEvents();

    const enemyCharacter = mockEnemyCharacters.querySelector(
      '[data-id="6"]',
    );

    enemyCharacter.click();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });

  test("does not call onNext when Opponent has not selected a character", () => {
    characterSelectionController.initEvents();

    const playerCharacter = mockPlayerCharacters.querySelector(
      '[data-id="1"]',
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
