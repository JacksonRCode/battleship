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
  resetShipPlacementOption,
};

const P1BOARD = document.querySelector(".player1");
const P2BOARD = document.querySelector(".player2");
const STATUS = document.querySelector(".turnReplayMsg");
const CURRTURN = document.querySelector(".display-turn");

const clearBoard = (location) => {
  // P1BOARD.classList.remove("no-click");
  // P2BOARD.classList.remove("no-click");
  location.classList.remove("no-click");
  // while (P1BOARD.children.length > 0) {
  //   P1BOARD.removeChild(P1BOARD.firstChild);
  // }
  // while (P2BOARD.children.length > 0) {
  //   P2BOARD.removeChild(P2BOARD.firstChild);
  while (location.children.length > 0) {
    location.removeChild(location.firstChild);
  }
};

// const fillBoard = (player1, player2) => {
//   /*
//     This function fills both boards with values from board1 and board 2

//     Each tile is given click event listeners that signal hits
//   */
//   const board1 = player1.getBoard();
//   const board2 = player2.getBoard();

//   const boardData1 = board1.seeBoard();
//   const boardData2 = board2.seeBoard();
//   const DIM = boardData1.length;

//   for (let i = 0; i < DIM; i++) {
//     for (let j = 0; j < DIM; j++) {
//       const target1 = boardData1[i][j];
//       const target2 = boardData2[i][j];

//       const one = document.createElement("div");
//       const two = document.createElement("div");
//       one.classList = "tile";
//       two.classList = "tile";

//       if (Array.isArray(target1)) one.classList = "ship tile";
//       if (Array.isArray(target2)) two.classList = "ship tile";

//       one.addEventListener("click", () => {
//         domReceiveAttack(one, board1, [i, j], player1);
//       });

//       two.addEventListener("click", () => {
//         domReceiveAttack(two, board2, [i, j], player2);
//       });

//       P1BOARD.appendChild(one);
//       P2BOARD.appendChild(two);
//     }
//   }
// };

const fillBoard = (player = false, dest, selection = false, selectionBoard) => {
  /*
    This function fills both boards with values from board1 and board 2

    Each tile is given click event listeners that signal hits
  */
  // If player object received get board from player. If not get other board
  clearBoard(dest);
  const board = player === false ? selectionBoard : player.getBoard();

  const boardData = board.seeBoard();
  const DIM = boardData.length;

  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      const tile = document.createElement("div");
      const target = boardData[i][j];
      const isShipTile = Array.isArray(target);

      if (selection && isShipTile) {
        tile.classList = "ship tile";
      } else {
        tile.classList = "tile";
      }

      tile.addEventListener("click", () => {
        // If this is a hit
        if (!selection) {
          if (isShipTile) tile.classList = "ship tile";
          domReceiveAttack(tile, board, [i, j], player);
        } else {
          // If this is selecting where to put a ship
          let current = null;
          // Figure out which ship is being selected
          [...document.querySelector(".ship-options").children].forEach(
            (obj) => {
              if ([...obj.children].length === 3) current = obj.classList[1];
            }
          );
          if (current) {
            // Place ship on tile
            if (placeShip([i, j], current, board)) {
              board.renderShips();
              fillBoard(player, dest, selection, selectionBoard);
              removeShipPlacementOption();
            } else {
              alert("Cannot place ship there");
            }
          } else {
            console.log("No ship selected");
          }
        }
      });

      dest.appendChild(tile);
    }
  }
};

const resetShipPlacementOption = () => {
  const parent = document.querySelector(".ship-options");
  const children = [...parent.children];
  children.forEach((child) => {
    if (child.classList.contains("invisible")) {
      child.classList.remove("invisible");
    } else {
      child.classList.add("invisible");
    }
  });
};

const initShipSelection = (board) => {
  // Create the board that players will use to select their ship location
  let current = null;

  const shipOptions = [...document.querySelector(".ship-options").children];

  shipOptions.forEach((obj) => {
    if (!obj.classList.contains("invisible")) {
      obj.addEventListener("click", () => {
        if (current !== obj.classList[1]) {
          shipOptions.forEach((obj2) => {
            if ([...obj2.children].length === 3) {
              obj2.removeChild(obj2.lastChild);
              obj2.classList.remove("selected-ship");
            }
          });
          current = obj.classList[1];
          obj.classList.add("selected-ship");
          const pElement = document.createElement("p");
          pElement.textContent = "Selected";
          pElement.id = "selected";
          obj.appendChild(pElement);
        }
      });
    }
  });
  const boardDest = document.querySelector(".selection-board");
  clearBoard(boardDest);
  fillBoard(false, boardDest, true, board);
};

const placeShip = (coords, selection, board) => {
  /*
    Returns true if ship can be placed there
  */
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
  if (board.checkPlacement(fullCoords)) {
    const ship = Ship(shipType[0], shipType[1]);
    board.addShip([ship, fullCoords]);
    return true;
  }
  return false;
};

const removeShipPlacementOption = () => {
  const parent = document.querySelector(".ship-options");
  const child = parent.querySelector(".selected-ship");
  child.classList.add("invisible");

  // Check if last ship has been placed
  const children = [...parent.children];
  let done = true;
  children.forEach((child) => {
    if (!child.classList.contains("invisible")) {
      done = false;
    }
  });
  if (done) {
    parent.children[5].classList.remove("invisible");
  }
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
