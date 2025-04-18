// Board factory function
export { Board };

const Board = (dimensions, ships = []) => {
  /*
    Dimensions -- game board dimensions (dimensions x dimensions)
    Ships -- array of array of ship info [[ship1: shipObj, [shipCoords]], [ship2: shipObj, []], ...]
    Playeranme -- name of player 
  */
  let _board = [];
  let _ships = ships;
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
  };

  const renderShips = () => {
    ships.forEach((ship) => {
      // Initialize ships --> board[x][y] = [shipObj, hitStatus]
      ship[1].forEach((position) => {
        // TODO: implement error checking here for ship overlap
        _board[position[0]][position[1]] = [ship[0], 0];
      });
    });
  };

  const receiveAttack = (coord) => {
    // Changes value of hit tile to 1 (indicating hit) --> return tile
    // If ship is hit, reduce ship health and check win condition if sunk
    const x = coord[0];
    const y = coord[1];
    const target = _board[x][y];

    let returnValue = "";

    // Case 1 --> water
    if (!Array.isArray(target)) {
      _board[x][y] = 1;
      returnValue = "Miss";
    } else {
      // Case 2 --> ship
      _board[x][y][1] = 1;
      returnValue = target[0].hit();
      if (target[0].getSunk()) returnValue = checkWin(returnValue);
    }

    return returnValue;
  };

  const checkWin = (ret) => {
    // Checks each ship object to see if it is sunk
    let win = true;
    ships.forEach((ship) => {
      if (win) {
        win = ship[0].getSunk();
      }
    });

    return win ? "Game Over!" : ret;
  };

  const checkPlacement = (coords) => {
    // Check to make sure a ship isn't colliding with another ship
    let placementWorks = true;
    coords.forEach((coord) => {
      if (coord[0] < 0 || coord[1] < 0 || coord[0] > 9 || coord[1] > 9) {
        placementWorks = false;
      } else if (Array.isArray(_board[coord[0]][coord[1]])) {
        placementWorks = false;
      }
    });

    return placementWorks;
  };

  const addShip = (ship) => {
    _ships.push(ship);
  };

  initBoard();
  renderShips();

  return {
    initBoard,
    renderShips,
    receiveAttack,
    seeBoard: () => _board,
    addShip,
    checkPlacement,
    getDimensions: () => dimensions,
  };
};
