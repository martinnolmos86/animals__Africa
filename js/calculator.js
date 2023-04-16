const CROSS = 'X';
const CIRCLE = 'O';
const EMPTY = ' ';

let board;
let currentPlayer;
let gameStatus;

const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart-button');

startGame();

function startGame() {
  board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ];
  currentPlayer = CROSS;
  gameStatus = false;
  message.textContent = `It's ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = EMPTY;
    cell.addEventListener('click', handleCellClick, { once: true });
  });

  restartButton.addEventListener('click', startGame);
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const column = parseInt(event.target.dataset.column);

  if (board[row][column] !== EMPTY || gameStatus) {
    return;
  }

  board[row][column] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `${currentPlayer} wins!`;
    gameStatus = true;
    return;
  }

  if (checkTie()) {
    message.textContent = `It's a tie!`;
    gameStatus = true;
    return;
  }

  currentPlayer = currentPlayer === CROSS ? CIRCLE : CROSS;
  message.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === currentPlayer &&
      board[i][1] === currentPlayer &&
      board[i][2] === currentPlayer
    ) {
      return true;
    }

    if (
      board[0][i] === currentPlayer &&
      board[1][i] === currentPlayer &&
      board[2][i] === currentPlayer
    ) {
      return true;
    }
  }

  if (
    board[0][0] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][2] === currentPlayer
  ) {
    return true;
  }

  if (
    board[0][2] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    return true;
  }

  return false;
}

function checkTie() {
  return board.every(row => {
    return row.every(cell => {
      return cell !== EMPTY;
    });
  });
}
