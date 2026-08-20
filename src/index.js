import "./styles.css";
import Player from "./modules/Player/Player";
import Computer from "./modules/Computer/Computer";
import BoardRender from "./ui/BoardRender/BoardRender";
import { $enemyBoardContainer, $myBoardContainer } from "./ui/domSelector";
import UIController from "./ui/UIController/UIController";
import Game from "./modules/Game/Game";

const player1 = new Player("Dynames");
const player2 = new Computer("Exia");
const myBoard = player1.getGameBoard();
const enemyBoard = player2.getGameBoard();
myBoard.placeShip(0, 0, "x", 2);
enemyBoard.placeShip(1, 1, "x", 2);
enemyBoard.receiveAttack(2, 1);
enemyBoard.receiveAttack(0, 1);
myBoard.receiveAttack(0, 0);
myBoard.receiveAttack(0, 1);
const game = new Game(player1, player2);
const boardRender = new BoardRender(myBoard, enemyBoard);
const uiController = new UIController(boardRender, game);

boardRender.renderMyBoard($myBoardContainer);
boardRender.renderEnemyBoard($enemyBoardContainer);
uiController.initEvents();
