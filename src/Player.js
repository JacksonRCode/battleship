// Player factory function

export default Player = (username = "Player1", realPlayer = false) => {
  const _realPlayer = realPlayer;
  const _userName = username;
  let _board = [];

  return {
    getName: () => _userName,
    checkBot: () => !_realPlayer,
    assignBoard: (board) => {
      _board = board;
    },
  };
};
