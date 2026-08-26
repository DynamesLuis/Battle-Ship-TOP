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

const appState = new AppState();
const screenController = new ScreenController(
  $startScreen,
  $characterSelection,
  $shipPlacement,
  $game,
);
const appController = new AppController(appState, screenController);
const startScreenController = new StartScreenController(
  appController.startGame.bind(appController),
);

startScreenController.initEvents();
appController.startApp();
