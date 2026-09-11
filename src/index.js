import "./styles.css";
import AppController from "./appController/AppController";
import ScreenController from "./ui/ScreenController/ScreenController";
import StartScreenController from "./ui/StartScreenController/StartScreenController";
import AppState from "./appState/AppState";
import {
  $characterSelection,
  $game,
  $shipPlacement,
  $startScreen,
} from "./ui/domSelector";
import CharacterSelectionController from "./ui/CharacterSelectionController/CharacterSelectionController";
import AudioController from "./AudioController/AudioController";

const appState = new AppState();
const audioController = new AudioController();
const screenController = new ScreenController(
  $startScreen,
  $characterSelection,
  $shipPlacement,
  $game,
  audioController,
);
const appController = new AppController(appState, screenController);
const startScreenController = new StartScreenController(
  appController.startGame.bind(appController),
);
const characterSelectionController = new CharacterSelectionController(
  appController.startPlaceShips.bind(appController),
  appState,
);

startScreenController.initEvents();
appController.setCharacterSelectionController(characterSelectionController);
appController.startApp();
