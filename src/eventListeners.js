// Litener file
export { initListeners };
import {
  clearBoard,
  fillBoard,
  initShipSelection,
  resetShipPlacementOption,
  domReceiveAttack,
  switchTurn,
  endGame,
} from "./control.js";
import { Board } from "./Board.js";

const P1BOARD = document.querySelector(".player1");
const P2BOARD = document.querySelector(".player2");

const initListeners = (player1, player2) => {
  document.querySelector(".start-button").addEventListener("click", () => {
    fillBoard(player1, P1BOARD);
    fillBoard(player2, P2BOARD);
  });

  const playerTwoInput = document.querySelector(".p2-input-container");
  document.querySelector("#check-two-player").addEventListener("click", () => {
    // Checks to see if one or two players are playing
    if (playerTwoInput.classList.contains("invisible")) {
      playerTwoInput.classList.remove("invisible");
      document.querySelector("#p2-input").value = "";
    } else {
      playerTwoInput.classList.add("invisible");
    }
  });

  document
    .querySelector(".go-to-ship-selection")
    .addEventListener("click", () => {
      // Make previous page invisible:
      document.querySelector(".create-players").classList.add("invisible");

      // // Track whether player two is going to start
      // const p2Start = document.getElementById("check-p2-start").checked;

      // Create new board and begin ship selection with it
      const p1Board = Board(10);
      initShipSelection(p1Board);
      player1.assignBoard(p1Board);

      // Make ship selection visible
      const shipUI = document.querySelector(".place-ships");
      shipUI.classList.remove("invisible");
    });

  document
    .querySelector(".p2-board-selection")
    .addEventListener("click", () => {
      // Check whether or not there is a second player:
      resetShipPlacementOption();
      const twoPlayer = document.getElementById("check-two-player").checked;
      const p2Board = Board(10);
      if (twoPlayer) {
        // initShipSelection(p2Board);
      }
      // Else --> auto select board
      initShipSelection(p2Board);
      player2.assignBoard(p2Board);
    });
};
