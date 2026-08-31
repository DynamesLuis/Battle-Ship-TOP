import { $enemyCharacters, $nextBtn, $playerCharacters } from "../domSelector";
import getCharactersByFaction from "../../gameData/getCharactersByFaction";

export default class CharacterSelectionController {
  constructor(onNext, appState) {
    this.playerSelection = null;
    this.enemySelection = null;
    this.onNext = onNext;
    this.appState = appState;
  }

  init() {
    this.initEvents();
    this.renderCharacterSelection();
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
    const $card = e.target.closest(".character-card");
    if (!$card) return;

    const character = $card.dataset.id;
    this.enemySelection = character;
    this.#selectCard($enemyCharacters, $card);
  }

  handlePlayerCharacterClick(e) {
    const $card = e.target.closest(".character-card");
    if (!$card) return;

    const character = $card.dataset.id;
    this.playerSelection = character;
    this.#selectCard($playerCharacters, $card);
  }

  #selectCard($container, $card) {
    const $cards = $container.querySelectorAll(".character-card");
    $cards.forEach(($card) => $card.classList.remove("selected"));
    $card.classList.add("selected");
  }

  handleNextClick() {
    if (this.enemySelection && this.playerSelection) {
      this.onNext(this.playerSelection, this.enemySelection);
    }
  }

  renderCharacterSelection() {
    const playerFaction = this.appState.getPlayerFaction();
    const enemyFaction = playerFaction === "horde" ? "alliance" : "horde";
    const playerCharacters = getCharactersByFaction(playerFaction);
    const enemyCharacters = getCharactersByFaction(enemyFaction);
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
