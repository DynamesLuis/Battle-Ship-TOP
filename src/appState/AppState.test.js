import AppState from "./AppState";

describe.skip("AppState", () => {
  let appState;

  beforeEach(() => {
    appState = new AppState();
  });

  test("stores and returns the name", () => {
    appState.setName("Battle of the Seas");

    expect(appState.getName()).toBe("Battle of the Seas");
  });

  test("stores and returns character 1", () => {
    const character1 = {};

    appState.setCharacter1(character1);

    expect(appState.getCharacter1()).toBe(character1);
  });

  test("stores and returns character 2", () => {
    const character2 = {};

    appState.setCharacter2(character2);

    expect(appState.getCharacter2()).toBe(character2);
  });

  test("stores and returns player 1", () => {
    const player1 = {};

    appState.setPlayer1(player1);

    expect(appState.getPlayer1()).toBe(player1);
  });

  test("stores and returns player 2", () => {
    const player2 = {};

    appState.setPlayer2(player2);

    expect(appState.getPlayer2()).toBe(player2);
  });
});

describe.skip("AppState - reset", () => {
  let appState;
  let player1;
  let player2;
  let character1;
  let character2;
  let game;

  beforeEach(() => {
    appState = new AppState();
    player1 = {};
    player2 = {};
    character1 = {};
    character2 = {};
    game = {};
  });

  test("clears the player", () => {
    appState.player1 = player1;

    appState.reset();

    expect(appState.player1).toBeNull();
  });

  test("clears the computer", () => {
    appState.player2 = player2;

    appState.reset();

    expect(appState.player2).toBeNull();
  });

  test("clears the game", () => {
    appState.game = game;

    appState.reset();

    expect(appState.game).toBeNull();
  });

  test("clears the game configuration", () => {
    appState.name = "Arthas";
    appState.playerFaction = "alliance";
    appState.character1 = character1;
    appState.character2 = character2;

    appState.reset();

    expect(appState.name).toBeNull();
    expect(appState.playerFaction).toBeNull();
    expect(appState.character1).toBeNull();
    expect(appState.character2).toBeNull();
  });

  test("returns AppState to its initial state", () => {
    appState.player1 = player1;
    appState.player2 = player2;
    appState.game = game;
    appState.name = "Arthas";
    appState.playerFaction = "alliance";
    appState.character1 = character1;
    appState.character2 = character2;

    appState.reset();

    expect(appState).toEqual({
      player1: null,
      player2: null,
      game: null,
      name: null,
      playerFaction: null,
      character1: null,
      character2: null,
    });
  });

  test("does not preserve references to the previous game state", () => {
    appState.player1 = player1;
    appState.player2 = player2;
    appState.game = game;
    appState.name = "Arthas";
    appState.playerFaction = "alliance";
    appState.character1 = character1;
    appState.character2 = character2;

    appState.reset();

    expect(appState.player1).not.toBe(player1);
    expect(appState.player2).not.toBe(player2);
    expect(appState.game).not.toBe(game);
    expect(appState.character1).not.toBe(character1);
    expect(appState.character2).not.toBe(character2);
  });
});
