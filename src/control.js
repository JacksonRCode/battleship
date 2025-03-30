/* 
  This file has functions that control the flow of the game
  This flow includes:
    - game initiation
    - game flow control
    - ship placement selection
    - gameboard rendering and clearing
    - game ending
    - etc
  Ships are created here
*/

import { Ship } from "./Ship.js";

export {
  clearBoard,
  fillBoard,
  initShipSelection,
  domReceiveAttack,
  switchTurn,
  endGame,
};

const P1BOARD = document.querySelector(".player1");
const P2BOARD = document.querySelector(".player2");
const STATUS = document.querySelector(".turnReplayMsg");
const CURRTURN = document.querySelector(".display-turn");

const clearBoard = () => {
  P1BOARD.classList.remove("no-click");
  P2BOARD.classList.remove("no-click");
  while (P1BOARD.children.length > 0) {
    P1BOARD.removeChild(P1BOARD.firstChild);
  }
  while (P2BOARD.children.length > 0) {
    P2BOARD.removeChild(P2BOARD.firstChild);
  }
};

const fillBoard = (player1, player2) => {
  /*
    This function fills both boards with values from board1 and board 2

    Each tile is given click event listeners that signal hits
  */
  const board1 = player1.getBoard();
  const board2 = player2.getBoard();

  const boardData1 = board1.seeBoard();
  const boardData2 = board2.seeBoard();
  const DIM = boardData1.length;

  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      const target1 = boardData1[i][j];
      const target2 = boardData2[i][j];

      const one = document.createElement("div");
      const two = document.createElement("div");
      one.classList = "tile";
      two.classList = "tile";

      if (Array.isArray(target1)) one.classList = "ship tile";
      if (Array.isArray(target2)) two.classList = "ship tile";

      one.addEventListener("click", () => {
        domReceiveAttack(one, board1, [i, j], player1);
      });

      two.addEventListener("click", () => {
        domReceiveAttack(two, board2, [i, j], player2);
      });

      P1BOARD.appendChild(one);
      P2BOARD.appendChild(two);
    }
  }
};

const initShipSelection = (board) => {
  // Create the board that players will use to select their ship location
  const DIM = board.getDimensions();
  let current = "option-1";

  const shipOptions = [...document.querySelector(".ship-options").children];

  shipOptions.forEach((obj) => {
    obj.addEventListener("click", () => {
      current = obj.classList[1];
    });
  });

  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      const tile = document.createElement("div");
      tile.classList = "tile";

      tile.addEventListener("click", () => {
        placeShip([i, j], current, board);
      });

      document.querySelector(".selection-board").appendChild(tile);
    }
  }
};

const placeShip = (coords, selection, board) => {
  const shipTypes = {
    // [length, type]
    "option-1": [3, "Battleship"],
    "option-2": [4, "Aircraft Carrier"],
    "option-3": [3, "Submarine"],
    "option-4": [2, "Cruiser"],
    "option-5": [1, "Soldier"],
  };

  const shipType = shipTypes[selection];

  const fullCoords = [coords];
  let tab = 1;

  for (let i = 1; i < shipType[0]; i++) {
    fullCoords.push([coords[0] + tab, coords[1]]);
    if (tab === -1) tab = 2;
    else tab *= -1;
  }
  console.log(fullCoords);
  console.log(board.checkPlacement(fullCoords));
};

const domReceiveAttack = (tile, board, coords, player) => {
  /* 
    This function registers attacks on the dom, and connects hits to the backend
  */

  if (!tile.classList.contains("hit")) {
    // If the tile hasn't yet been hit
    // Change player turn
    tile.classList.add("hit");
    const shotResult = board.receiveAttack(coords);
    if (shotResult === "Game Over!") {
      endGame();
    }
    STATUS.textContent = shotResult;
  } else {
    // If the tile
    STATUS.textContent = "You've already shot there you fool";
  }

  switchTurn();
  CURRTURN.textContent = player.getName() + "'s turn";
};

const switchTurn = () => {
  if (P1BOARD.classList.contains("no-click")) {
    P1BOARD.classList.remove("no-click");
    P2BOARD.classList.add("no-click");
  } else {
    P2BOARD.classList.remove("no-click");
    P1BOARD.classList.add("no-click");
  }
};

const endGame = () => {
  P1BOARD.classList.add("no-click");
  P2BOARD.classList.add("no-click");
};
