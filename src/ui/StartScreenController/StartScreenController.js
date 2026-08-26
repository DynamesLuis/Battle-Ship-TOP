import { $factionInputs, $playerNameInput, $startAppBtn } from "../domSelector";

export default class StartScreenController {
  constructor(onStart) {
    this.onStart = onStart;
  }

  initEvents() {
    $startAppBtn.addEventListener("click", () => this.handleStartClick());
  }

  handleStartClick() {
    const playerName = $playerNameInput.value;
    let selectedFaction = null;
    const $inputChecked = Array.from($factionInputs).find(
      (input) => input.checked,
    );

    if ($inputChecked) {
      selectedFaction = $inputChecked.value;
    }

    if (playerName && selectedFaction) {
      this.onStart(playerName, selectedFaction);
    }
  }
}
