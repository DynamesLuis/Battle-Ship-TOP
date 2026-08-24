import GameBoard from "../../modules/GameBoard/GameBoard";
import UIController from "./UIController";
import "@testing-library/jest-dom";

let mockEnemyBoardContainer;
let mockMyBoardContainer;
let mockFinishedGameModal;
let mockCharacterImg;
let mockCharacterName;
let mockBattleMessage;
let mockCharacterImgGameOver;
let mockCharacterDialogueGameOver;
let mockPlayerNameGameOver;
let character1;
let character2;
let player1;
let player2;

jest.mock("../domSelector", () => ({
  get $enemyBoardContainer() {
    return mockEnemyBoardContainer;
  },

  get $myBoardContainer() {
    return mockMyBoardContainer;
  },

  get $finishedGameModal() {
    return mockFinishedGameModal;
  },

  get $characterImg() {
    return mockCharacterImg;
  },

  get $characterName() {
    return mockCharacterName;
  },

  get $battleMessage() {
    return mockBattleMessage;
  },

  get $characterDialogueGameOver() {
    return mockCharacterDialogueGameOver;
  },

  get $characterImgGameOver() {
    return mockCharacterImgGameOver;
  },

  get $playerNameGameOver() {
    return mockPlayerNameGameOver;
  },
}));

describe("UIController", () => {
  let game;
  let boardRenderer;
  let uiController;

  beforeEach(() => {
    mockEnemyBoardContainer = document.createElement("div");
    mockFinishedGameModal = document.createElement("div");
    mockCharacterImg = document.createElement("img");
    mockCharacterName = document.createElement("p");
    mockBattleMessage = document.createElement("p");
    mockCharacterDialogueGameOver = document.createElement("p");
    mockPlayerNameGameOver = document.createElement("strong");
    mockCharacterImgGameOver = document.createElement("img");

    character1 = {
      getName: jest.fn().mockReturnValue("Player 1"),
      getImg: jest.fn().mockReturnValue("player1.png"),
      getRandomDialogue: jest.fn().mockReturnValue("Nice shot!"),
    };

    character2 = {
      getName: jest.fn().mockReturnValue("Player 2"),
      getImg: jest.fn().mockReturnValue("player2.png"),
      getRandomDialogue: jest.fn().mockReturnValue("You missed!"),
    };

    player1 = {
      getName: jest.fn().mockReturnValue("Player 1"),
      getCharacter: jest.fn().mockReturnValue(character1),
    };

    player2 = {
      getName: jest.fn().mockReturnValue("Player 2"),
      getCharacter: jest.fn().mockReturnValue(character2),
    };

    game = {
      playRound: jest.fn().mockReturnValue({
        playerResults: {
          attackResult: "hit",
          sunkedShip: false,
        },
        computerResults: {
          attackResult: "miss",
          sunkedShip: false,
        },
        winner: null,
      }),
      getPlayer1: jest.fn().mockReturnValue(player1),
      getPlayer2: jest.fn().mockReturnValue(player2),
    };

    boardRenderer = {
      myBoard: new GameBoard(),
      enemyBoard: new GameBoard(),
      renderMyBoard: jest.fn(),
      renderEnemyBoard: jest.fn(),
    };

    uiController = new UIController(boardRenderer, game);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe.skip("Functionallity", () => {
    test("can be created with Game and BoardRenderer dependencies", () => {
      expect(uiController).toBeDefined();
    });

    test("initEvents registers a click event on the enemy board", () => {
      const addEventListener = jest.spyOn(
        mockEnemyBoardContainer,
        "addEventListener",
      );

      uiController.initEvents();

      expect(addEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
      );
    });

    test("clicking a cell calls game.playRound with its coordinates", () => {
      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(game.playRound).toHaveBeenCalledWith(3, 0);
    });

    test("clicking outside a cell does not start a turn", () => {
      uiController.initEvents();

      mockEnemyBoardContainer.click();

      expect(game.playRound).not.toHaveBeenCalled();
    });

    test("receives the player and computer results from playRound", () => {
      const playerResults = {
        attackResult: "hit",
        sunkedShip: false,
      };

      const computerResults = {
        attackResult: "miss",
        sunkedShip: false,
      };

      const roundResults = {
        playerResults,
        computerResults,
        winner: null,
      };

      game.playRound.mockReturnValue(roundResults);

      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(game.playRound).toHaveReturnedWith(roundResults);
    });

    test("finishes the game when the player wins", async () => {
      jest.useFakeTimers();

      const winner = player1;

      const playerResults = {
        attackResult: "hit",
        sunkedShip: true,
      };

      const roundResults = {
        playerResults,
        computerResults: null,
        winner,
      };

      game.playRound.mockReturnValue(roundResults);

      const finishGame = jest.spyOn(uiController, "finishGame");

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();
      expect(finishGame).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(2000);

      expect(finishGame).toHaveBeenCalledWith(winner);

      jest.useRealTimers();
    });

    test("does not finish the game when there is no winner", () => {
      const roundResults = {
        playerResults: {
          attackResult: "hit",
          sunkedShip: false,
        },

        computerResults: {
          attackResult: "miss",
          sunkedShip: false,
        },

        winner: null,
      };

      game.playRound.mockReturnValue(roundResults);

      const finishGame = jest.spyOn(uiController, "finishGame");

      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(finishGame).not.toHaveBeenCalled();
    });

    test("finishes the game when the computer wins", async () => {
      jest.useFakeTimers();

      const winner = player2;
      const playerResults = {
        attackResult: "miss",
        sunkedShip: false,
      };

      const computerResults = {
        attackResult: "hit",
        sunkedShip: true,
      };

      const roundResults = {
        playerResults,
        computerResults,
        winner,
      };

      game.playRound.mockReturnValue(roundResults);

      const finishGame = jest.spyOn(uiController, "finishGame");

      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(finishGame).not.toHaveBeenCalled();
      //await 2000 to show computer results and 2000 to finishGame
      await jest.advanceTimersByTimeAsync(4000);

      expect(finishGame).toHaveBeenCalledWith(winner);

      jest.useRealTimers();
    });
  });

  describe.skip("Board renders", () => {
    test("renders both boards after a complete round", async () => {
      jest.useFakeTimers();
      game.playRound.mockReturnValue({
        playerResults: {
          attackResult: "hit",
          sunkedShip: false,
        },
        computerResults: {
          attackResult: "miss",
          sunkedShip: false,
        },
        winner: null,
      });

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(boardRenderer.renderEnemyBoard).toHaveBeenCalled();
      await jest.advanceTimersByTimeAsync(2000);
      expect(boardRenderer.renderMyBoard).toHaveBeenCalled();
      jest.useRealTimers();
    });

    test("does not render myBoard when computer did not play", () => {
      game.playRound.mockReturnValue({
        playerResults: {
          attackResult: "hit",
          sunkedShip: true,
        },
        computerResults: null,
        winner: {},
      });

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(boardRenderer.renderEnemyBoard).toHaveBeenCalled();

      expect(boardRenderer.renderMyBoard).not.toHaveBeenCalled();
    });
  });

  describe.skip("display Results", () => {
    test("displays the player hit result with the character dialogue", () => {
      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("Nice shot!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      uiController.game.player1 = player;

      const results = {
        attackResult: "hit",
        sunkedShip: false,
      };

      uiController.displayResults(results, player);

      expect(player.getCharacter).toHaveBeenCalled();

      expect(character.getRandomDialogue).toHaveBeenCalledWith("hit");

      expect(mockCharacterImg.src).toContain("captain.png");

      expect(mockCharacterName.textContent).toBe("Captain");

      expect(mockBattleMessage.textContent).toBe("Nice shot!");
    });

    test("gets a miss dialogue for a player miss", () => {
      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("You missed!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      uiController.game.player1 = player;

      const results = {
        attackResult: "miss",
        sunkedShip: false,
      };

      uiController.displayResults(results, player);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("miss");
    });

    test("gets a sunk dialogue when the player sinks a ship", () => {
      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("You sank my ship!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      uiController.game.player1 = player;

      const results = {
        attackResult: "hit",
        sunkedShip: true,
      };

      uiController.displayResults(results, player);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("sunk");
    });

    test("gets a win dialogue when the player wins", () => {
      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("We won!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      uiController.game.player1 = player;

      const results = {
        attackResult: "hit",
        sunkedShip: true,
        winner: player,
      };

      uiController.displayResults(results, player);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("win");

      expect(mockBattleMessage.textContent).toBe("We won!");
    });

    test("displays the computer result with the computer character dialogue", () => {
      const character = {
        getName: jest.fn().mockReturnValue("Computer"),
        getImg: jest.fn().mockReturnValue("computer.png"),
        getRandomDialogue: jest.fn().mockReturnValue("You missed!"),
      };

      const computer = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      const results = {
        attackResult: "miss",
        sunkedShip: false,
      };

      uiController.displayResults(results, computer);

      expect(computer.getCharacter).toHaveBeenCalled();

      expect(character.getRandomDialogue).toHaveBeenCalledWith("miss");

      expect(mockCharacterImg.src).toContain("computer.png");

      expect(mockCharacterName.textContent).toBe("Computer");

      expect(mockBattleMessage.textContent).toBe("You missed!");
    });

    test("displays the computer win dialogue when computer wins", () => {
      const character = {
        getName: jest.fn().mockReturnValue("Computer"),
        getImg: jest.fn().mockReturnValue("computer.png"),
        getRandomDialogue: jest.fn().mockReturnValue("I won!"),
      };

      const computer = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      const results = {
        attackResult: "hit",
        sunkedShip: true,
        winner: computer,
      };

      uiController.displayResults(results, computer);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("win");

      expect(mockBattleMessage.textContent).toBe("I won!");
    });
  });

  describe.skip("display results with delay", () => {
    test("displays player results first and computer results after", async () => {
      jest.useFakeTimers();

      const playerResults = {
        attackResult: "hit",
        sunkedShip: false,
      };

      const computerResults = {
        attackResult: "miss",
        sunkedShip: false,
      };

      game.playRound.mockReturnValue({
        playerResults,
        computerResults,
        winner: null,
      });

      const displayResults = jest.spyOn(uiController, "displayResults");

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(displayResults).toHaveBeenNthCalledWith(1, playerResults, player1);

      await jest.advanceTimersByTimeAsync(2000);

      expect(displayResults).toHaveBeenNthCalledWith(
        2,
        computerResults,
        player2,
      );

      jest.useRealTimers();
    });

    test("only displays player results when computerResults is null", () => {
      const playerResults = {
        attackResult: "hit",
        sunkedShip: true,
      };

      game.playRound.mockReturnValue({
        playerResults,
        computerResults: null,
        winner: player1,
      });

      const displayResults = jest.spyOn(uiController, "displayResults");

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(displayResults).toHaveBeenCalledTimes(1);

      expect(displayResults).toHaveBeenCalledWith(playerResults, player1);
    });

    test("displays computer results after a delay", async () => {
      jest.useFakeTimers();

      const playerResults = {
        attackResult: "hit",
        sunkedShip: false,
      };

      const computerResults = {
        attackResult: "miss",
        sunkedShip: false,
      };

      game.playRound.mockReturnValue({
        playerResults,
        computerResults,
        winner: null,
      });

      const displayResults = jest.spyOn(uiController, "displayResults");

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(displayResults).toHaveBeenCalledTimes(1);

      expect(displayResults).toHaveBeenNthCalledWith(1, playerResults, player1);

      await jest.advanceTimersByTimeAsync(1999);

      expect(displayResults).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(1);

      expect(displayResults).toHaveBeenCalledTimes(2);

      expect(displayResults).toHaveBeenNthCalledWith(
        2,
        computerResults,
        player2,
      );

      jest.useRealTimers();
    });
  });

  describe.skip("display game over modal with delay", () => {
    test("calls displayModal with the winner", () => {
      const winner = player1;

      const displayModal = jest.spyOn(uiController, "displayModal");

      uiController.finishGame(winner);

      expect(displayModal).toHaveBeenCalledWith(winner);
    });

    test("gets the winner character", () => {
      const winner = player1;

      uiController.displayModal(winner);

      expect(player1.getCharacter).toHaveBeenCalled();
    });

    test("gets the winner name, image and win dialogue", () => {
      const winner = player1;

      uiController.displayModal(winner);

      expect(winner.getName).toHaveBeenCalled();
      expect(character1.getImg).toHaveBeenCalled();
      expect(character1.getRandomDialogue).toHaveBeenCalledWith("win");
    });

    test("displays the winner character information in the modal", () => {
      const winner = player1;

      uiController.displayModal(winner);

      expect(mockCharacterImgGameOver.src).toContain("player1.png");

      expect(mockPlayerNameGameOver.textContent).toBe("Player 1");

      expect(mockCharacterDialogueGameOver.textContent).toBe("Nice shot!");
    });

    test("finishes the game after a delay when there is a winner", async () => {
      jest.useFakeTimers();

      const winner = player1;

      game.playRound.mockReturnValue({
        playerResults: {
          attackResult: "hit",
          sunkedShip: true,
        },
        computerResults: null,
        winner,
      });

      const finishGame = jest.spyOn(uiController, "finishGame");

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.initEvents();

      cell.click();

      expect(finishGame).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(1999);

      expect(finishGame).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(1);

      expect(finishGame).toHaveBeenCalledWith(winner);

      jest.useRealTimers();
    });
  });
});
