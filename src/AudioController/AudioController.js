import miss from "../assets/audios/miss.mp3";
import hit from "../assets/audios/hit.mp3";
import canon from "../assets/audios/canon.mp3";
import sunk from "../assets/audios/sunk.mp3";
import victory from "../assets/audios/victory.mp3";
import delay from "../helpers/delay";

export default class AudioController {
  constructor() {
    this.delay = 500;
  }

  playSound(sound) {
    const audio = new Audio(sound);
    audio.play();
  }

  playShot() {
    this.playSound(canon);
  }

  async playHit() {
    await delay(this.delay);
    this.playSound(hit);
  }

  async playMiss() {
    await delay(this.delay);
    this.playSound(miss);
  }

  async playSunk() {
    await delay(this.delay);
    this.playSound(sunk);
  }

  playVictory() {
    this.playSound(victory);
  }
}
