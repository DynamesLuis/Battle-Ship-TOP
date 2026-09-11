import GameBoard from "../../modules/GameBoard/GameBoard";
import UIController from "./UIController";
import typeWriter from "../../helpers/typeWriter";
import delay from "../../helpers/delay";
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
let mockBattleReport;
let character1;
let character2;
let player1;
let player2;

jest.mock("../../helpers/delay", () => jest.fn(() => Promise.resolve()));

jest.mock("../../helpers/typeWriter", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(),
}));

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

  get $battleReport() {
    return mockBattleReport;
  },
}));

describe.skip("UIController", () => {
  let game;
  let boardRenderer;
  let uiController;
  const delay = 3100;

  beforeEach(() => {
    jest.useFakeTimers();
    typeWriter.mockResolvedValue();

    mockEnemyBoardContainer = document.createElement("div");
    mockFinishedGameModal = document.createElement("div");
    mockCharacterImg = document.createElement("img");
    mockCharacterName = document.createElement("p");
    mockBattleMessage = document.createElement("p");
    mockCharacterDialogueGameOver = document.createElement("p");
    mockPlayerNameGameOver = document.createElement("strong");
    mockCharacterImgGameOver = document.createElement("img");
    mockBattleReport = document.createElement("div");

    mockBattleMessage.textContent =
      "Your turn! Make your attack. Wait for the enemy to attack before attacking again.";

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

    uiController = new UIController(boardRenderer, game, player1);
    jest.spyOn(uiController, "initEvents");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe.skip("Functionallity", () => {
    test("can be created with Game and BoardRenderer dependencies", () => {
      expect(uiController).toBeDefined();
    });

    test("calls initEvents", () => {
      uiController.init();

      expect(uiController.initEvents).toHaveBeenCalled();
    });

    test("renders the player board", () => {
      uiController.init();

      expect(boardRenderer.renderMyBoard).toHaveBeenCalled();
    });

    test("renders the enemy board", () => {
      uiController.init();

      expect(boardRenderer.renderEnemyBoard).toHaveBeenCalled();
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

    test("does not allow a second attack while the current turn is processing", async () => {
      const cell = document.createElement("div");
      const cell2 = document.createElement("div");

      cell.classList.add("cell");
      cell2.classList.add("cell");
      cell.dataset.coordinate = "3, 0";
      cell2.dataset.coordinate = "4, 0";

      mockEnemyBoardContainer.appendChild(cell);
      mockEnemyBoardContainer.appendChild(cell2);

      uiController.handleEnemyBoardClick({ target: cell });

      uiController.handleEnemyBoardClick({ target: cell2 });

      expect(game.playRound).toHaveBeenCalledTimes(1);
    });

    test("allows another attack after the Computer turn has finished", async () => {
      const cell = document.createElement("div");
      const cell2 = document.createElement("div");

      cell.classList.add("cell");
      cell2.classList.add("cell");

      cell.dataset.coordinate = "3, 0";
      cell2.dataset.coordinate = "4, 0";

      mockEnemyBoardContainer.appendChild(cell);
      mockEnemyBoardContainer.appendChild(cell2);

      uiController.handleEnemyBoardClick({ target: cell });

      // Finish Player displayResults()
      jest.advanceTimersByTime(250);

      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();

      // Finish delay between Player and Computer
      jest.advanceTimersByTime(delay);

      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();

      // Finish Computer displayResults()
      jest.advanceTimersByTime(250);

      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();

      // The round should now be finished
      uiController.handleEnemyBoardClick({ target: cell2 });

      expect(game.playRound).toHaveBeenCalledTimes(2);
    });

    test("allows the first attack", () => {
      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.coordinate = "3, 0";

      mockEnemyBoardContainer.appendChild(cell);

      uiController.handleEnemyBoardClick({ target: cell });

      expect(game.playRound).toHaveBeenCalledTimes(1);
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
      // Finish displayResults()
      await jest.advanceTimersByTimeAsync(250);

      expect(finishGame).not.toHaveBeenCalled();
      // Finish the delay before finishGame()
      await jest.advanceTimersByTimeAsync(delay);
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

      // Finish player's displayResults()
      await jest.advanceTimersByTimeAsync(250);

      expect(finishGame).not.toHaveBeenCalled();

      // Delay between player and computer turns
      await jest.advanceTimersByTimeAsync(delay);

      expect(finishGame).not.toHaveBeenCalled();

      // Finish computer's displayResults()
      await jest.advanceTimersByTimeAsync(250);

      expect(finishGame).not.toHaveBeenCalled();

      // Delay before finishing the game
      await jest.advanceTimersByTimeAsync(delay);

      expect(finishGame).toHaveBeenCalledWith(winner);

      jest.useRealTimers();
    });

    test("gets the character from the player", () => {
      uiController.init();

      expect(player1.getCharacter).toHaveBeenCalled();
    });

    test("displays the initial character name", () => {
      uiController.init();

      expect(mockCharacterName.textContent).toBe("Player 1:");
    });

    test("displays the initial character image", () => {
      uiController.init();

      expect(mockCharacterImg.src).toContain("player1.png");
    });

    test("displays the initial battle instruction", () => {
      uiController.init();

      expect(mockBattleMessage.textContent).toBe(
        `Your turn! Make your attack. Wait for the enemy to attack before attacking again.`,
      );
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

      // The enemy board is rendered immediately after the player attack.
      expect(boardRenderer.renderEnemyBoard).toHaveBeenCalled();

      // Finish player's displayResults()
      await jest.advanceTimersByTimeAsync(250);

      // The computer turn starts after this delay.
      await jest.advanceTimersByTimeAsync(delay);

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
    test("displays the player hit result with the character dialogue", async () => {
      jest.useFakeTimers();

      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("Nice shot!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      const results = {
        attackResult: "hit",
        sunkedShip: false,
      };

      uiController.displayResults(results, player);

      expect(player.getCharacter).toHaveBeenCalled();

      expect(mockCharacterImg.src).not.toContain("captain.png");
      expect(mockCharacterName.textContent).toBe("");
      expect(mockBattleMessage.textContent).toBe(
        "Your turn! Make your attack. Wait for the enemy to attack before attacking again.",
      );

      await jest.advanceTimersByTimeAsync(250);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("hit");
      expect(mockCharacterImg.src).toContain("captain.png");
      expect(mockCharacterName.textContent).toBe("Captain:");
      expect(typeWriter).toHaveBeenCalledWith(mockBattleMessage, "Nice shot!");

      jest.useRealTimers();
    });

    test("gets a miss dialogue for a player miss", async () => {
      jest.useFakeTimers();

      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("You missed!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      const results = {
        attackResult: "miss",
        sunkedShip: false,
      };

      uiController.displayResults(results, player);

      expect(character.getRandomDialogue).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(250);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("miss");

      expect(typeWriter).toHaveBeenCalledWith(mockBattleMessage, "You missed!");

      jest.useRealTimers();
    });

    test("gets a sunk dialogue when the player sinks a ship", async () => {
      jest.useFakeTimers();

      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("You sank my ship!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      const results = {
        attackResult: "hit",
        sunkedShip: true,
      };

      uiController.displayResults(results, player);

      expect(character.getRandomDialogue).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(250);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("sunk");

      expect(typeWriter).toHaveBeenCalledWith(
        mockBattleMessage,
        "You sank my ship!",
      );

      jest.useRealTimers();
    });

    test("gets a win dialogue when the player wins", async () => {
      jest.useFakeTimers();

      const character = {
        getName: jest.fn().mockReturnValue("Captain"),
        getImg: jest.fn().mockReturnValue("captain.png"),
        getRandomDialogue: jest.fn().mockReturnValue("We won!"),
      };

      const player = {
        getCharacter: jest.fn().mockReturnValue(character),
      };

      const results = {
        attackResult: "hit",
        sunkedShip: true,
        winner: player,
      };

      uiController.displayResults(results, player);

      expect(character.getRandomDialogue).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(250);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("win");

      expect(typeWriter).toHaveBeenCalledWith(mockBattleMessage, "We won!");

      jest.useRealTimers();
    });

    test("displays the computer result with the computer character dialogue", async () => {
      jest.useFakeTimers();

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
      expect(character.getRandomDialogue).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(250);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("miss");

      expect(mockCharacterImg.src).toContain("computer.png");
      expect(mockCharacterName.textContent).toBe("Computer:");

      expect(typeWriter).toHaveBeenCalledWith(mockBattleMessage, "You missed!");

      jest.useRealTimers();
    });

    test("displays the computer win dialogue when computer wins", async () => {
      jest.useFakeTimers();

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

      expect(character.getRandomDialogue).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(250);

      expect(character.getRandomDialogue).toHaveBeenCalledWith("win");

      expect(mockCharacterImg.src).toContain("computer.png");
      expect(mockCharacterName.textContent).toBe("Computer:");

      expect(typeWriter).toHaveBeenCalledWith(mockBattleMessage, "I won!");

      jest.useRealTimers();
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

      // Player results are displayed immediately.
      expect(displayResults).toHaveBeenCalledTimes(1);
      expect(displayResults).toHaveBeenNthCalledWith(1, playerResults, player1);

      // Finish the player's displayResults() transition.
      await jest.advanceTimersByTimeAsync(250);

      // The computer results should not be displayed before the turn delay.
      expect(displayResults).toHaveBeenCalledTimes(1);

      // Finish the delay between turns.
      await jest.advanceTimersByTimeAsync(delay);

      expect(displayResults).toHaveBeenCalledTimes(2);
      expect(displayResults).toHaveBeenNthCalledWith(
        2,
        computerResults,
        player2,
      );

      jest.useRealTimers();
    });

    test("only displays player results when computerResults is null", async () => {
      jest.useFakeTimers();

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

      // Finish the player's displayResults() transition.
      await jest.advanceTimersByTimeAsync(250);

      // No computer results should be displayed.
      expect(displayResults).toHaveBeenCalledTimes(1);

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

      // Finish player's displayResults() transition.
      await jest.advanceTimersByTimeAsync(250);

      expect(finishGame).not.toHaveBeenCalled();

      // Finish the delay before ending the game.
      await jest.advanceTimersByTimeAsync(delay - 1);

      expect(finishGame).not.toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(1);

      expect(finishGame).toHaveBeenCalledWith(winner);

      jest.useRealTimers();
    });
  });

  describe("UIController - Audio", () => {
    test("plays the shot sound before playing a valid attack", async () => {
      const audioController = {
        playShot: jest.fn(),
        playHit: jest.fn(),
        playMiss: jest.fn(),
        playSunk: jest.fn(),
      };
      const player = {};
      const game = {
        playRound: jest.fn(() => ({
          playerResults: { attackResult: "miss", sunkedShip: false },
          computerResults: null,
          winner: null,
        })),
        getPlayer1: jest.fn().mockReturnValue(player1),
      };
      const boardRender = { renderEnemyBoard: jest.fn() };
      const uiController = new UIController(
        boardRender,
        game,
        player,
        audioController,
      );
      const $cell = document.createElement("div");
      $cell.classList.add("cell");
      $cell.dataset.coordinate = "3, 4";
      const event = { target: $cell };
      await uiController.handleEnemyBoardClick(event);
      expect(audioController.playShot).toHaveBeenCalledTimes(1);
      expect(game.playRound).toHaveBeenCalledTimes(1);
    });
    test("does not play the shot sound for an invalid click", async () => {
      const audioController = { playShot: jest.fn() };
      const player = {};
      const game = { playRound: jest.fn() };
      const boardRender = { renderEnemyBoard: jest.fn() };
      const uiController = new UIController(
        boardRender,
        game,
        player,
        audioController,
      );
      const $target = document.createElement("div");
      const event = { target: $target };
      await uiController.handleEnemyBoardClick(event);
      expect(audioController.playShot).not.toHaveBeenCalled();
      expect(game.playRound).not.toHaveBeenCalled();
    });
    test("plays the hit sound when the result is a hit", async () => {
      const audioController = { playHit: jest.fn() };
      const player = {
        getCharacter: jest.fn(() => ({
          getImg: jest.fn(),
          getName: jest.fn(() => "Character"),
          getRandomDialogue: jest.fn(() => "Hit!"),
        })),
      };
      const uiController = new UIController({}, {}, player, audioController);
      const results = { attackResult: "hit", sunkedShip: false };
      await uiController.displayResults(results, player);
      expect(audioController.playHit).toHaveBeenCalledTimes(1);
    });
    test("plays the miss sound when the result is a miss", async () => {
      const audioController = { playMiss: jest.fn() };
      const player = {
        getCharacter: jest.fn(() => ({
          getImg: jest.fn(),
          getName: jest.fn(() => "Character"),
          getRandomDialogue: jest.fn(() => "Miss!"),
        })),
      };
      const uiController = new UIController({}, {}, player, audioController);
      const results = { attackResult: "miss", sunkedShip: false };
      await uiController.displayResults(results, player);
      expect(audioController.playMiss).toHaveBeenCalledTimes(1);
    });
    test("plays the sunk sound when the result is a sunk ship", async () => {
      const audioController = { playSunk: jest.fn() };
      const player = {
        getCharacter: jest.fn(() => ({
          getImg: jest.fn(),
          getName: jest.fn(() => "Character"),
          getRandomDialogue: jest.fn(() => "Sunk!"),
        })),
      };
      const uiController = new UIController({}, {}, player, audioController);
      const results = { attackResult: "hit", sunkedShip: true };
      await uiController.displayResults(results, player);
      expect(audioController.playSunk).toHaveBeenCalledTimes(1);
    });
    test("plays the result sound after the shot sound", async () => {
      const callOrder = [];
      const audioController = {
        playShot: jest.fn(() => {
          callOrder.push("shot");
        }),
        playHit: jest.fn(() => {
          callOrder.push("hit");
        }),
      };
      const player = {
        getCharacter: jest.fn(() => ({
          getImg: jest.fn(),
          getName: jest.fn(() => "Character"),
          getRandomDialogue: jest.fn(() => "Hit!"),
        })),
      };
      const game = {
        playRound: jest.fn(() => ({
          playerResults: { attackResult: "hit", sunkedShip: false },
          computerResults: null,
          winner: null,
        })),
        getPlayer1: jest.fn(() => player),
      };
      const boardRender = { renderEnemyBoard: jest.fn() };
      const uiController = new UIController(
        boardRender,
        game,
        player,
        audioController,
      );
      const $cell = document.createElement("div");
      $cell.classList.add("cell");
      $cell.dataset.coordinate = "3, 4";
      const event = { target: $cell };
      await uiController.handleEnemyBoardClick(event);
      expect(callOrder).toEqual(["shot", "hit"]);
    });
    test("plays the corresponding sound for the computer result", async () => {
      const audioController = {
        playHit: jest.fn(),
        playMiss: jest.fn(),
        playSunk: jest.fn(),
      };
      const player = {
        getCharacter: jest.fn(() => ({
          getImg: jest.fn(),
          getName: jest.fn(() => "Character"),
          getRandomDialogue: jest.fn(() => "Hit!"),
        })),
      };
      const uiController = new UIController({}, {}, player, audioController);
      const computerResults = { attackResult: "hit", sunkedShip: false };
      await uiController.displayResults(computerResults, player);
      expect(audioController.playHit).toHaveBeenCalledTimes(1);
      expect(audioController.playMiss).not.toHaveBeenCalled();
      expect(audioController.playSunk).not.toHaveBeenCalled();
    });
    test("plays the victory sound when the game is finished", () => {
      const audioController = { playVictory: jest.fn(), stopMusic: jest.fn() };
      const player = {};
      const uiController = new UIController({}, {}, player, audioController);
      const winner = player1;
      uiController.finishGame(winner);
      expect(audioController.playVictory).toHaveBeenCalledTimes(1);
    });
    test("stops the music when the game is finished", () => {
      const audioController = {
        stopMusic: jest.fn(),
        playVictory: jest.fn(),
      };

      const player = {};

      const uiController = new UIController({}, {}, player, audioController);

      const winner = player1;

      uiController.finishGame(winner);

      expect(audioController.stopMusic).toHaveBeenCalledTimes(1);
    });

    test("stops the music before playing the victory sound", () => {
      const audioController = {
        stopMusic: jest.fn(),
        playVictory: jest.fn(),
      };

      const player = {};

      const uiController = new UIController({}, {}, player, audioController);

      const winner = player1;

      uiController.finishGame(winner);

      expect(
        audioController.stopMusic.mock.invocationCallOrder[0],
      ).toBeLessThan(audioController.playVictory.mock.invocationCallOrder[0]);
    });
  });
});
