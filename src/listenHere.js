// Litener file
export { initListeners };

const P1BOARD = document.querySelector(".player1");
const P2BOARD = document.querySelector(".player2");
const STATUS = document.querySelector(".turnReplayMsg");
const CURRTURN = document.querySelector(".display-turn");

const initListeners = (player1, player2) => {
  document.querySelector(".start-button").addEventListener("click", () => {
    clearBoard();
    fillBoard(player1.getBoard(), player2.getBoard());
  });
};

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

const fillBoard = (board1, board2) => {
  /*
    This function fills both boards with values from board1 and board 2

    Each tile is given click event listeners that signal hits
  */
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
        domReceiveAttack(one, board1, [i, j]);
      });

      two.addEventListener("click", () => {
        domReceiveAttack(two, board2, [i, j]);
      });

      P1BOARD.appendChild(one);
      P2BOARD.appendChild(two);
    }
  }
};

const domReceiveAttack = (tile, board, coords) => {
  /* 
    This function registers attacks on the dom, and connects hits to the backend
  */

  if (!tile.classList.contains("hit")) {
    // If the tile hasn't yet been hit
    // Change player turn
    tile.classList.add("hit");
    const shotResult = board.receiveAttack(coords);
    if (shotResult === "Game Over!") {
      P1BOARD.classList.add("no-click");
      P2BOARD.classList.add("no-click");
    }
    STATUS.textContent = shotResult;
  } else {
    // If the tile
    console.log("Already hit here");
  }
};
