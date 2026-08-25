import AppState from "./AppState";

describe("AppState", () => {
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
