import miss from "../assets/audios/effects/miss.mp3";
import hit from "../assets/audios/effects/hit.mp3";
import canon from "../assets/audios/effects/canon.mp3";
import sunk from "../assets/audios/effects/sunk.mp3";
import victory from "../assets/audios/effects/victory.mp3";
import menu1 from "../assets/audios/music/backgroundmusicmaster-fantasy-craft-loop-431346.mp3";
import menu2 from "../assets/audios/music/blendertimer-medieval-kingdoms-598387.mp3";
import battle1 from "../assets/audios/music/hitslab-battle-fighting-warrior-drums-372078.mp3";
import battle2 from "../assets/audios/music/thefealdoproject-the-battle-of-coalitions-115596.mp3";
import delay from "../helpers/delay";

export default class AudioController {
  constructor() {
    this.delay = 500;
    this.currentMusic = null;
    this.typeMusic = null;
    this.menuMusic = [menu1, menu2];
    this.battleMusic = [battle1, battle2];
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

  playMenuMusic() {
    if (this.typeMusic === "menu") return;
    const music = new Audio(this.#getRandomMusic("menu"));
    this.stopMusic();
    this.currentMusic = music;
    music.play();
    music.loop = true;
    this.typeMusic = "menu";
  }

  playBattleMusic() {
    if (this.typeMusic === "battle") return;
    const music = new Audio(this.#getRandomMusic("battle"));
    this.stopMusic();
    this.currentMusic = music;
    music.play();
    music.loop = true;
    this.typeMusic = "battle";
  }

  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.loop = false;
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;     
    }
  }

  #getRandomMusic(type) {
    let music = null;
    if (type === "menu") {
      music = this.menuMusic[Math.floor(Math.random() * this.menuMusic.length)];
    } else {
      music =
        this.battleMusic[Math.floor(Math.random() * this.battleMusic.length)];
    }
    return music;
  }
}
