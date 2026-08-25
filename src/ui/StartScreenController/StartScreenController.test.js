import StartScreenController from "./StartScreenController";

let mockPlayerNameInput;
let mockStartAppBtn;

jest.mock("../domSelector", () => ({
  get $playerNameInput() {
    return mockPlayerNameInput;
  },

  get $startAppBtn() {
    return mockStartAppBtn;
  },
}));

describe.skip("StartScreenController", () => {
  let startScreenController;
  let onStart;

  beforeEach(() => {
    mockStartAppBtn = document.createElement("button");
    mockPlayerNameInput = document.createElement("input");

    onStart = jest.fn();

    startScreenController = new StartScreenController(onStart);
  });

  test("can be created", () => {
    expect(startScreenController).toBeDefined();
  });

  test("initEvents registers a click event on the start button", () => {
    const addEventListener = jest.spyOn(mockStartAppBtn, "addEventListener");

    startScreenController.initEvents();

    expect(addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
  });

  test("calls onStart with the entered name", () => {
    mockPlayerNameInput.value = "Luis";

    startScreenController.initEvents();

    mockStartAppBtn.click();

    expect(onStart).toHaveBeenCalledWith("Luis");
  });
});
