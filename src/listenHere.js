// Litener file
export { initListeners, clearBoard, fillBoard };

const P1BOARD = document.querySelector(".player1");
const P2BOARD = document.querySelector(".player2");

const initListeners = () => {
  document.querySelector(".start-button").addEventListener("click", () => {
    clearBoard();
  });
};

const clearBoard = () => {
  while ([...P1BOARD.children.length] > 0) {
    P1BOARD.removeChild(P1BOARD.firstChild);
  }
  while ([...P2BOARD.children.length] > 0) {
    P2BOARD.removeChild(P2BOARD.firstChild);
  }
};

const fillBoard = () => {
  const DIM = 10;

  for (let i = 0; i < DIM ** 2; i++) {
    const one = document.createElement("div");
    const two = document.createElement("div");
    one.classList = "tile";
    two.classList = "tile";
    P1BOARD.appendChild(one);
    P2BOARD.appendChild(two);
  }
};
