import StartScreenController from "./StartScreenController";

let mockPlayerNameInput;
let mockStartAppBtn;
let mockFactionInputs;

jest.mock("../domSelector", () => ({
  get $playerNameInput() {
    return mockPlayerNameInput;
  },

  get $startAppBtn() {
    return mockStartAppBtn;
  },

  get $factionInputs() {
    return mockFactionInputs;
  },
}));

describe.skip("StartScreenController", () => {
  let startScreenController;
  let onStart;

  beforeEach(() => {
    mockStartAppBtn = document.createElement("button");
    mockPlayerNameInput = document.createElement("input");

    onStart = jest.fn();

    mockFactionInputs = [
      Object.assign(document.createElement("input"), {
        type: "radio",
        name: "faction",
        value: "horde",
      }),
      Object.assign(document.createElement("input"), {
        type: "radio",
        name: "faction",
        value: "alliance",
      }),
    ];

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

  test("calls onStart with the entered name and selected faction", () => {
    mockPlayerNameInput.value = "Luis";

    mockFactionInputs[0].checked = true;

    startScreenController.initEvents();

    mockStartAppBtn.click();

    expect(onStart).toHaveBeenCalledWith("Luis", "horde");
  });

  test("calls onStart with the selected alliance faction", () => {
    mockPlayerNameInput.value = "Luis";

    mockFactionInputs[1].checked = true;

    startScreenController.initEvents();

    mockStartAppBtn.click();

    expect(onStart).toHaveBeenCalledWith("Luis", "alliance");
  });
});
