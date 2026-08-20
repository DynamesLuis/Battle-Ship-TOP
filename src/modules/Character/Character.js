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
}