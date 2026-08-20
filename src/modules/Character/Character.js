export default class Character {
  constructor(name, dialogues, img) {
    this.name = name;
    this.dialogues = dialogues;
    this.img = img;
  }

  getName() {
    return this.name;
  }

  getImg() {
    return this.img;
  }

  getDialogues() {
    return this.dialogues;
  }

  getRandomDialogue(action) {
    const dialogues = this.dialogues[action];
    const index = this.#getRandomIndex(dialogues);
    return dialogues[index];
  }

  #getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}
