import "./styles/baseStyles.css";
import "./styles/styles.css";
import { Player } from "./Player.js";
import { Ship } from "./Ship.js";
import { Board } from "./Board.js";
import { initListeners, clearBoard, fillBoard } from "./listenHere.js";

const BOARD_DIMENSIONS = 10;

const player1 = Player("Jackson", true);
const playerBot = Player("Optimus", false);

// ships = [[ship object, ship coordinates],[],[]]

// Create Player ships
const pShip1 = Ship(3, "Battleship");
const pShip1Coords = [
  [0, 0],
  [0, 1],
  [0, 2],
];
const pShip2 = Ship(2, "Little Ship");
const pShip2Coords = [
  [1, 0],
  [1, 1],
];
const pShip3 = Ship(4, "Big Boat!");
const pShip3Coords = [
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
];
const pShips = [
  [pShip1, pShip1Coords],
  [pShip2, pShip2Coords],
  [pShip3, pShip3Coords],
];

// Create Player Board
const pBoard = Board(BOARD_DIMENSIONS, pShips);

// Add Board to Player
player1.assignBoard(pBoard);

// Create Bot Ships
const bShip1 = Ship(3, "Battleship");
const bShip2 = Ship(2, "Little Ship");
const bShip3 = Ship(4, "Big Boat!");
const bShips = [
  [bShip1, pShip1Coords],
  [bShip2, pShip2Coords],
  [bShip3, pShip3Coords],
];

// Create Bot Board
const bBoard = Board(BOARD_DIMENSIONS, bShips);

// Add Board to Bot
playerBot.assignBoard(bBoard);

const fullBoardPlayer = player1.getBoard().seeBoard();
// console.log(fullBoardPlayer);

const fullBoardBot = playerBot.getBoard().seeBoard();
// console.log(fullBoardBot);

fillBoard();
