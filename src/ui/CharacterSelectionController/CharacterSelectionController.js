import { $enemyCharacters, $nextBtn, $playerCharacters } from "../domSelector";
import getCharactersByFaction from "../../gameData/getCharactersByFaction";

export default class CharacterSelectionController {
  constructor(onNext, appState) {
    this.playerSelection = null;
    this.enemySelection = null;
    this.onNext = onNext;
    this.appState = appState;
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

    const character = $target.dataset.id;
    this.enemySelection = character;
  }

  handlePlayerCharacterClick(e) {
    const $target = e.target;
    if (!$target.classList.contains("character")) {
      return;
    }

    const character = $target.dataset.id;
    this.playerSelection = character;
  }

  handleNextClick() {
    if (this.enemySelection && this.playerSelection) {
      this.onNext(this.playerSelection, this.enemySelection);
    }
  }

  renderCharacterSelection() {
    //obtener la facción de player y la facción de enemy
    const playerFaction = this.appState.getPlayerFaction();
    const enemyFaction = playerFaction === "horde" ? "alliance" : "horde";
    //obtener character from cada faction
    const playerCharacters = getCharactersByFaction(playerFaction);
    const enemyCharacters = getCharactersByFaction(enemyFaction);
    //renderizarlos en sus containers
    playerCharacters.forEach((character) => {
      const $characterCard = document.createElement("div");
      $characterCard.classList.add("character-card");
      $characterCard.dataset.id = character.id;

      $characterCard.innerHTML = `
        <div class="character-image">
          <img src="${character.img}" alt="${character.name}" />
        </div>

        <h3>${character.name}</h3>
      `;

      $playerCharacters.appendChild($characterCard);
    });

    enemyCharacters.forEach((character) => {
      const $characterCard = document.createElement("div");
      $characterCard.classList.add("character-card");
      $characterCard.dataset.id = character.id;

      $characterCard.innerHTML = `
        <div class="character-image">
          <img src="${character.img}" alt="${character.name}" />
        </div>

        <h3>${character.name}</h3>
      `;

      $enemyCharacters.appendChild($characterCard);
    });
  }
}
