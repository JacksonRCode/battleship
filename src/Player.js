// Player factory function

export default Player = (username = "Player1", realPlayer = false) => {
  const _realPlayer = realPlayer;
  const _username = username;
  let _board = [];

  return {
    getName: () => _username,
    checkBot: () => !_realPlayer,
    assignBoard: (board) => {
      _board = board;
    },
    getBoard: () => _board,
  };
};
