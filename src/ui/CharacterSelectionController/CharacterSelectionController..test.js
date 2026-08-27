import CharacterSelectionController from "./CharacterSelectionController";
import "@testing-library/jest-dom";

let mockPlayerCharacters;
let mockEnemyCharacters;
let mockNextBtn;
let mockGetCharactersByFaction;

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

jest.mock("../../gameData/getCharactersByFaction", () => ({
  __esModule: true,
  default: (...args) => mockGetCharactersByFaction(...args),
}));

describe.skip("CharacterSelectionController", () => {
  let characterSelectionController;
  let onNext;
  let appState;
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

    appState = {
      getPlayerFaction: jest.fn(),
    };

    mockGetCharactersByFaction = jest.fn();

    characterSelectionController = new CharacterSelectionController(
      onNext,
      appState,
    );
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

    const character = mockPlayerCharacters.querySelector('[data-id="1"]');

    character.click();

    expect(characterSelectionController.playerSelection).toBe("1");
  });

  test("can select a character for the Opponent", () => {
    characterSelectionController.initEvents();

    const character = mockEnemyCharacters.querySelector('[data-id="6"]');

    character.click();

    expect(characterSelectionController.enemySelection).toBe("6");
  });

  test("changing a Player selection replaces the previous one", () => {
    characterSelectionController.initEvents();

    const character1 = mockPlayerCharacters.querySelector('[data-id="1"]');

    const character2 = mockPlayerCharacters.querySelector('[data-id="2"]');

    character1.click();
    character2.click();

    expect(characterSelectionController.playerSelection).toBe("2");
  });

  test("changing an Opponent selection replaces the previous one", () => {
    characterSelectionController.initEvents();

    const character1 = mockEnemyCharacters.querySelector('[data-id="6"]');

    const character2 = mockEnemyCharacters.querySelector('[data-id="7"]');

    character1.click();
    character2.click();

    expect(characterSelectionController.enemySelection).toBe("7");
  });

  test("calls onNext when both characters are selected", () => {
    characterSelectionController.initEvents();

    const playerCharacter = mockPlayerCharacters.querySelector('[data-id="1"]');

    const enemyCharacter = mockEnemyCharacters.querySelector('[data-id="6"]');

    playerCharacter.click();
    enemyCharacter.click();

    mockNextBtn.click();

    expect(onNext).toHaveBeenCalledTimes(1);

    expect(onNext).toHaveBeenCalledWith("1", "6");
  });

  test("does not call onNext when Player has not selected a character", () => {
    characterSelectionController.initEvents();

    const enemyCharacter = mockEnemyCharacters.querySelector('[data-id="6"]');

    enemyCharacter.click();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });

  test("does not call onNext when Opponent has not selected a character", () => {
    characterSelectionController.initEvents();

    const playerCharacter = mockPlayerCharacters.querySelector('[data-id="1"]');

    playerCharacter.click();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });

  test("does not call onNext when neither character is selected", () => {
    characterSelectionController.initEvents();

    mockNextBtn.click();

    expect(onNext).not.toHaveBeenCalled();
  });

  //renderCharacters
  test("renders player faction characters in player container", () => {
    const hordeCharacters = [
      {
        name: "Thrall",
        id: "1",
        img: "thrall.png",
        dialogues: {},
      },
      {
        name: "Sylvanas Windrunner",
        id: "2",
        img: "sylvanas.png",
        dialogues: {},
      },
    ];

    appState.getPlayerFaction.mockReturnValue("horde");

    mockGetCharactersByFaction.mockReturnValue(hordeCharacters);

    characterSelectionController.renderCharacterSelection();

    expect(mockGetCharactersByFaction).toHaveBeenCalledWith("horde");

    expect(mockPlayerCharacters.querySelector('[data-id="1"]')).toBeTruthy();

    expect(mockPlayerCharacters.querySelector('[data-id="2"]')).toBeTruthy();
  });

  test("renders opposing faction characters in enemy container", () => {
    const allianceCharacters = [
      {
        name: "Anduin Wrynn",
        id: "3",
        img: "anduin.png",
        dialogues: {},
      },
      {
        name: "Jaina Proudmoore",
        id: "4",
        img: "jaina.png",
        dialogues: {},
      },
    ];

    appState.getPlayerFaction.mockReturnValue("horde");

    mockGetCharactersByFaction.mockImplementation((faction) => {
      if (faction === "alliance") {
        return allianceCharacters;
      }

      return [];
    });

    characterSelectionController.renderCharacterSelection();

    expect(mockGetCharactersByFaction).toHaveBeenCalledWith("alliance");

    expect(mockEnemyCharacters.querySelector('[data-id="3"]')).toBeTruthy();

    expect(mockEnemyCharacters.querySelector('[data-id="4"]')).toBeTruthy();
  });

  test("renders Alliance characters for the player when player faction is Alliance", () => {
    const allianceCharacters = [
      {
        name: "Anduin Wrynn",
        id: "3",
        img: "anduin.png",
        dialogues: {},
      },
    ];

    appState.getPlayerFaction.mockReturnValue("alliance");

    mockGetCharactersByFaction.mockReturnValue(allianceCharacters);

    characterSelectionController.renderCharacterSelection();

    expect(mockGetCharactersByFaction).toHaveBeenCalledWith("alliance");

    expect(mockPlayerCharacters.querySelector('[data-id="3"]')).toBeTruthy();
  });

  test("renders Horde characters for the enemy when player faction is Alliance", () => {
    const hordeCharacters = [
      {
        name: "Thrall",
        id: "1",
        img: "thrall.png",
        dialogues: {},
      },
    ];

    appState.getPlayerFaction.mockReturnValue("alliance");

    mockGetCharactersByFaction.mockImplementation((faction) => {
      if (faction === "horde") {
        return hordeCharacters;
      }

      return [];
    });

    characterSelectionController.renderCharacterSelection();

    expect(mockGetCharactersByFaction).toHaveBeenCalledWith("horde");

    expect(mockEnemyCharacters.querySelector('[data-id="1"]')).toBeTruthy();
  });

  test("renders character card with id, name and image", () => {
    const character = {
      name: "Anduin Wrynn",
      id: "1",
      img: "anduin.png",
      dialogues: {},
    };

    appState.getPlayerFaction.mockReturnValue("alliance");

    mockGetCharactersByFaction.mockReturnValue([character]);

    characterSelectionController.renderCharacterSelection();

    const card = mockPlayerCharacters.querySelector(".character-card");

    expect(card).toBeTruthy();

    expect(card.dataset.id).toBe("1");

    expect(card.querySelector("h3").textContent).toBe("Anduin Wrynn");

    expect(card.querySelector("img").src).toContain("anduin.png");

    expect(card.querySelector("img").alt).toBe("Anduin Wrynn");
  });

  test("player container only contains characters from player faction", () => {
    mockPlayerCharacters.innerHTML = "";
    const hordeCharacters = [
      {
        name: "Thrall",
        id: "1",
        img: "thrall.png",
        dialogues: {},
      },
    ];

    const allianceCharacters = [
      {
        name: "Anduin Wrynn",
        id: "2",
        img: "anduin.png",
        dialogues: {},
      },
    ];

    appState.getPlayerFaction.mockReturnValue("horde");

    mockGetCharactersByFaction.mockImplementation((faction) => {
      return faction === "horde" ? hordeCharacters : allianceCharacters;
    });

    characterSelectionController.renderCharacterSelection();

    expect(mockPlayerCharacters.querySelector('[data-id="1"]')).toBeTruthy();

    expect(mockPlayerCharacters.querySelector('[data-id="2"]')).toBeNull();
  });

  test("enemy container only contains characters from opposing faction", () => {
    mockEnemyCharacters.innerHTML = "";
    const hordeCharacters = [
      {
        name: "Thrall",
        id: "1",
        img: "thrall.png",
        dialogues: {},
      },
    ];

    const allianceCharacters = [
      {
        name: "Anduin Wrynn",
        id: "2",
        img: "anduin.png",
        dialogues: {},
      },
    ];

    appState.getPlayerFaction.mockReturnValue("horde");

    mockGetCharactersByFaction.mockImplementation((faction) => {
      return faction === "horde" ? hordeCharacters : allianceCharacters;
    });

    characterSelectionController.renderCharacterSelection();

    expect(mockEnemyCharacters.querySelector('[data-id="2"]')).toBeTruthy();

    expect(mockEnemyCharacters.querySelector('[data-id="1"]')).toBeNull();
  });

  //selected card
  test("adds selected class to the clicked card", () => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    mockPlayerCharacters.appendChild(card);

    characterSelectionController.selectCard(mockPlayerCharacters, card);

    expect(card).toHaveClass("selected");
  });

  test("removes selected class from other cards", () => {
    const selectedCard = document.createElement("div");
    selectedCard.classList.add("character-card", "selected");

    const otherCard = document.createElement("div");
    otherCard.classList.add("character-card");

    mockPlayerCharacters.append(selectedCard, otherCard);

    characterSelectionController.selectCard(mockPlayerCharacters, otherCard);

    expect(selectedCard).not.toHaveClass("selected");
    expect(otherCard).toHaveClass("selected");
  });

  test("keeps only the passed card selected", () => {
    const card1 = document.createElement("div");
    const card2 = document.createElement("div");
    const card3 = document.createElement("div");

    card1.classList.add("character-card", "selected");
    card2.classList.add("character-card", "selected");
    card3.classList.add("character-card");

    mockPlayerCharacters.append(card1, card2, card3);

    characterSelectionController.selectCard(mockPlayerCharacters, card3);

    expect(card1).not.toHaveClass("selected");
    expect(card2).not.toHaveClass("selected");
    expect(card3).toHaveClass("selected");
  });
});
