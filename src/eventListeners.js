// Litener file
export { initListeners };
import {
  fillBoard,
  initShipSelection,
  resetShipPlacementOption,
  startGame,
} from "./control.js";
import { Board } from "./Board.js";
import { Player } from "./Player.js";

const P1BOARD = document.querySelector(".player1");
const P2BOARD = document.querySelector(".player2");
const SHIPUI = document.querySelector(".place-ships");

const initListeners = () => {
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

  // This exits out of player creation screen
  document
    .querySelector(".go-to-ship-selection")
    .addEventListener("click", () => {
      // Make previous page invisible:
      document.querySelector(".create-players").classList.add("invisible");

      // Check to see if there are 1 or 2 players
      const twoPlayer = document.getElementById("check-two-player").checked;

      // Get player 1's username
      let p1Name = document.getElementById("p1-input").value;
      p1Name = p1Name === "" ? "Player 1" : p1Name;

      // Get player 2's username if there are 2 players
      let p2Name = "Boat Robot";
      if (twoPlayer) {
        p2Name = document.getElementById("p2-input").value;
      }

      // Create players
      const p1 = Player(p1Name, true);
      const p2 = Player(p2Name, twoPlayer);

      // Create new board and begin ship selection with it
      const p1Board = Board(10);
      initShipSelection(p1Board);
      p1.assignBoard(p1Board);

      // Make ship selection visible
      SHIPUI.classList.remove("invisible");

      // Initialize other event listeners now that players have been created
      playerDependentListeners(p1, p2);
    });
};

const playerDependentListeners = (player1, player2) => {
  const selectionNextButton = document.querySelector(".p2-board-selection");
  selectionNextButton.addEventListener("click", () => {
    // Check whether or not there is a second player:
    resetShipPlacementOption();
    startBtnListeners();

    const twoPlayer = document.getElementById("check-two-player").checked;
    const p2Board = Board(10);
    if (twoPlayer) {
      // This is the default state right now
      // initShipSelection(p2Board);
    }
    // Else --> auto select board
    initShipSelection(p2Board);
    player2.assignBoard(p2Board);
  });

  const startBtnListeners = () => {
    document.querySelector(".start-button").addEventListener("click", () => {
      console.log("Start");
      fillBoard(player1, P1BOARD, false, false);
      fillBoard(player2, P2BOARD, false, false);

      SHIPUI.classList.add("invisible");

      document.querySelector(".board-container").classList.remove("invisible");
      document.querySelector(".game-control").classList.remove("invisible");

      startGame(player1, player2);
    });
  };
};
