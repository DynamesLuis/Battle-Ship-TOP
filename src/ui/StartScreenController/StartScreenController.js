import { $playerNameInput, $startAppBtn } from "../domSelector";

export default class StartScreenController {
  constructor(onStart) {
    this.onStart = onStart;
  }

  initEvents() {
    $startAppBtn.addEventListener("click", () => this.handleStartClick());
  }

  handleStartClick() {
    const playerName = $playerNameInput.value;
    if (playerName) {
      this.onStart(playerName);
    }
  }
}
