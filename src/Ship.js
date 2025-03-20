// Ship factory function

export default Ship = (length, type = "BATTLESHIP") => {
  let _health = length;
  const _shipType = type;
  let _sunk = false;

  const hit = () => {
    /*
      This function reduces the ships hp and then checks if it has been sunk
    */
    _health -= 1;
    checkSunk();
    if (_sunk) return "SUNK!";
    return "HIT!";
  };

  const checkSunk = () => {
    if (!_health) _sunk = true;
  };

  return {
    hit,
  };
};
