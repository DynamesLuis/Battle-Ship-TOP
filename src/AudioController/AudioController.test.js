import AudioController from "./AudioController";
import miss from "../assets/audios/miss.mp3";
import hit from "../assets/audios/hit.mp3";
import canon from "../assets/audios/canon.mp3";
import sunk from "../assets/audios/sunk.mp3";
import victory from "../assets/audios/victory.mp3";
import delay from "../helpers/delay";

jest.mock("../helpers/delay", () => jest.fn(() => Promise.resolve()));

global.Audio = jest.fn(() => ({
  play: jest.fn(),
}));

describe.skip("AudioController", () => {
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
