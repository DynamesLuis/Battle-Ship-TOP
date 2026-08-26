import { $enemyCharacters, $nextBtn, $playerCharacters } from "../domSelector";

export default class CharacterSelectionController {
  constructor(onNext) {
    this.playerSelection = null;
    this.enemySelection = null;
    this.onNext = onNext;
  }

  initEvents() {
    $enemyCharacters.addEventListener("click", (e) =>
      this.handleEnemyCharacterClick(e),
    );
    $playerCharacters.addEventListener("click", (e) =>
      this.handlePlayerCharacterClick(e),
    );
    $nextBtn.addEventListener("click", () => this.handleNextClick());
  }

  handleEnemyCharacterClick(e) {
    const $target = e.target;
    if (!$target.classList.contains("character")) {
      return;
    }

    const character = $target.dataset.character;
    this.enemySelection = character;
  }

  handlePlayerCharacterClick(e) {
    const $target = e.target;
    if (!$target.classList.contains("character")) {
      return;
    }

    const character = $target.dataset.character;
    this.playerSelection = character;
  }

  handleNextClick() {
    if (this.enemySelection && this.playerSelection) {
      this.onNext(this.playerSelection, this.enemySelection);
    }
  }
}
