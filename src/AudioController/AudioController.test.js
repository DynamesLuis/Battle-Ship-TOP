import AudioController from "./AudioController";
import miss from "../assets/audios/miss.mp3";
import hit from "../assets/audios/hit.mp3";
import canon from "../assets/audios/canon.mp3";
import sunk from "../assets/audios/sunk.mp3";
import victory from "../assets/audios/victory.mp3";
import delay from "../helpers/delay";

jest.mock("../helpers/delay", () => jest.fn(() => Promise.resolve()));

global.Audio = jest.fn(function () {
  this.play = jest.fn();
  this.pause = jest.fn();
  this.loop = false;
});

describe.skip("AudioController", () => {
  let audioController;
  beforeEach(() => {
    audioController = new AudioController();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.skip("AudioController - effects", () => {
    test("can be created", () => {
      const audioController = new AudioController();
      expect(audioController).toBeDefined();
    });

    test("can play a sound", () => {
      const audioController = new AudioController();
      const sound = "sound.mp3";
      audioController.playSound(sound);
      expect(global.Audio).toHaveBeenCalledWith(sound);
    });

    test("playShot() calls playSound() with the shot sound", () => {
      const audioController = new AudioController();
      jest.spyOn(audioController, "playSound");
      audioController.playShot();
      expect(audioController.playSound).toHaveBeenCalledWith(canon);
    });

    test("playHit() calls playSound() with the hit sound", async () => {
      const audioController = new AudioController();
      jest.spyOn(audioController, "playSound");
      await audioController.playHit();
      expect(audioController.playSound).toHaveBeenCalledWith(hit);
    });

    test("playMiss() calls playSound() with the miss sound", async () => {
      const audioController = new AudioController();
      jest.spyOn(audioController, "playSound");
      await audioController.playMiss();
      expect(audioController.playSound).toHaveBeenCalledWith(miss);
    });

    test("playSunk() calls playSound() with the sunk sound", async () => {
      const audioController = new AudioController();
      jest.spyOn(audioController, "playSound");
      await audioController.playSunk();
      expect(audioController.playSound).toHaveBeenCalledWith(sunk);
    });

    test("playVictory() calls playSound() with the victory sound", () => {
      const audioController = new AudioController();
      jest.spyOn(audioController, "playSound");
      audioController.playVictory();
      expect(audioController.playSound).toHaveBeenCalledWith(victory);
    });
  });

  describe.skip("AudioController - Music", () => {
    let audioController;

    beforeEach(() => {
      audioController = new AudioController();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("can start menu music", () => {
      audioController.playMenuMusic();
      expect(Audio).toHaveBeenCalledTimes(1);
      expect(Audio.mock.instances[0].play).toHaveBeenCalledTimes(1);
    });

    test("plays one of the available menu songs", () => {
      audioController.playMenuMusic();
      const playedMusic = Audio.mock.calls[0][0];
      expect(audioController.menuMusic).toContain(playedMusic);
    });

    test("menu music is configured to loop", () => {
      audioController.playMenuMusic();
      const music = Audio.mock.instances[0];
      expect(music.loop).toBe(true);
    });

    test("does not restart menu music if menu music is already playing", () => {
      audioController.playMenuMusic();
      audioController.playMenuMusic();
      expect(Audio).toHaveBeenCalledTimes(1);
      expect(Audio.mock.instances[0].play).toHaveBeenCalledTimes(1);
    });

    test("playBattleMusic stops the current music and starts battle music", () => {
      audioController.playMenuMusic();
      const menuMusic = Audio.mock.instances[0];
      audioController.playBattleMusic();
      expect(menuMusic.pause).toHaveBeenCalledTimes(1);
      expect(Audio).toHaveBeenCalledTimes(2);
      expect(Audio.mock.instances[1].play).toHaveBeenCalledTimes(1);
    });

    test("plays one of the available battle songs", () => {
      audioController.playBattleMusic();
      const playedMusic = Audio.mock.calls[0][0];
      expect(audioController.battleMusic).toContain(playedMusic);
    });

    test("battle music is configured to loop", () => {
      audioController.playBattleMusic();
      const music = Audio.mock.instances[0];
      expect(music.loop).toBe(true);
    });

    test("stopMusic stops the current music", () => {
      audioController.playMenuMusic();
      const music = Audio.mock.instances[0];
      audioController.stopMusic();
      expect(music.pause).toHaveBeenCalledTimes(1);
    });

    test("playMenuMusic starts menu music after battle music", () => {
      audioController.playBattleMusic();
      const battleMusic = Audio.mock.instances[0];
      audioController.playMenuMusic();
      expect(battleMusic.pause).toHaveBeenCalledTimes(1);
      expect(Audio).toHaveBeenCalledTimes(2);
      expect(Audio.mock.instances[1].play).toHaveBeenCalledTimes(1);
    });
  });
});
