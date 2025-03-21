// Board factory function

export default Board = (dimensions, ships = [], playerName = "Joe") => {
  /*
    Dimensions -- game board dimensions (dimensions x dimensions)
    Ships -- array of array of ship info [[ship1: shipObj, [shipCoords]], [ship2: shipObj, []], ...]
    Playeranme -- name of player 
  */
  let _board = [];
  /*
    Board labeling:
      - 0 = fresh water
      - 1 = hit water
      - array = water with ship on it --> array = [shipObj, ship tile hit status]
  */

  const initBoard = () => {
    // Initializes board to specified dimensions and adds ships to the board.
    for (let i = 0; i < dimensions; i++) {
      _board.push([]);
      for (let j = 0; j < dimensions; j++) {
        _board[i].push(0);
      }
    }

    ships.forEach((ship) => {
      // Initialize ships --> board[x][y] = [shipObj, hitStatus]
      ship[1].forEach((position) => {
        // TODO: implement error checking here for ship overlap
        _board[position[0]][position[1]] = [ship[0], 0];
      });
    });

    return _board;
  };

  const receiveAttack = (coord) => {
    // Changes value of hit tile to 1 (indicating hit) --> return tile
    // If ship is hit, reduce ship health and check win condition if sunk
    const x = coord[0];
    const y = coord[1];
    const target = _board[x][y];

    // Case 1 --> water
    if (!Array.isArray(target)) {
      _board[x][y] = 1;
    } else {
      // Case 2 --> ship
      _board[x][y][1] = 1;
      target[0].hit();
      if (target[0].getSunk()) return checkWin();
    }

    return _board[x][y];
  };

  const checkWin = () => {
    // Checks each ship object to see if it is sunk
    let win = true;
    ships.forEach((ship) => {
      if (win) {
        win = ship[0].getSunk();
      }
    });

    return win;
  };

  return {
    initBoard,
    receiveAttack,
    getBoard: () => _board,
  };
};

// let isHit = "miss";

//     _location.forEach((tile) => {
//       if (checkAlreadyHit(tile)) isHit = "repetition";
//       if (
//         coord[0] === tile[0] &&
//         coord[1] === tile[1] &&
//         isHit !== "repetition"
//       ) {
//         _health -= 1;
//         _hits.push(tile);
//         isHit = "hit";
//       }
//     });

//     return isHit;
//   };

//   const checkAlreadyHit = (tile) => {
//     let deadTile = false;
//     _hits.forEach((hit) => {
//       if (hit[0] === tile[0] && hit[1] === tile[1]) {
//         deadTile = true;
//       }
//     });

//     if (deadTile) {
//       return true;
//     } else return false;
//   };
