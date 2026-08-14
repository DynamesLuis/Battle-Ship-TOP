import "./styles.css";
import GameBoard from "./modules/GameBoard/GameBoard";
import BoardRender from "./ui/BoardRender/BoardRender";

const myBoardContainer = document.querySelector("#my-board");
const enemyBoardContainer = document.querySelector("#enemy-board");
const myBoard = new GameBoard();
const enemyBoard = new GameBoard();
myBoard.placeShip(0, 0, "x", 2);
enemyBoard.placeShip(1, 1, "x", 2);
enemyBoard.receiveAttack(2, 1);
enemyBoard.receiveAttack(0, 1);
myBoard.receiveAttack(0, 0);
myBoard.receiveAttack(0, 1);
const boardRender = new BoardRender();

boardRender.renderMyBoard(myBoard, myBoardContainer);
boardRender.renderEnemyBoard(enemyBoard, enemyBoardContainer);
