/**
 * @var {Array} board - an array of arrays representing a sudoku board
 */
let board = [
  [0, 9, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 9, 0, 8],
  [6, 0, 8, 0, 0, 0, 7, 1, 0],
  [0, 0, 0, 0, 8, 0, 0, 7, 0],
  [3, 8, 0, 5, 6, 0, 0, 0, 0],
  [2, 0, 9, 1, 0, 0, 0, 0, 5],
  [0, 0, 0, 0, 2, 3, 0, 6, 0],
  [4, 6, 2, 0, 5, 1, 8, 0, 3],
  [8, 1, 0, 0, 4, 9, 5, 2, 7],
];

/**
 * nextEmptySpot()
 * Finds the first empty spot or 0
 * @param   {Array} board - Sudoku board
 * @returns {Array} - an array of the next empty spot, if none available returns
 */
const nextEmptySpot = (board) => {
  for (const foo of board.keys()) {
    for (const bar of board.keys()) {
      if (board[foo][bar] === 0) {
        return [foo, bar];
      }
    }
  }
  return [-1, -1];
};

/**
 * checkRow()
 * Function to validate row, it takes in the board, the row we want to check, and new val we want to add to this row, iterates over passed in row and returns false if contains passed in value
 * @param {Array} board - Sudoku board
 * @param {Array} row   - Row want to check
 * @param {Int}   value - Value want to add to the row
 * @returns {Boolean} - If row contains value wanted to add false else true
 */
const checkRow = (board, row, value) => {
  for (const i of board[row].keys()) {
    if (board[row][i] === value) {
      return false;
    }
  }
  return true;
};

/**
 * checkColumn()
 * Function to validate column, it takes in the board, the column we want to check, and new val we want to add to this column, iterates over passed in column and returns false if contains passed in value
 * @param {Array} board - Sudoku board
 * @param {Array} column   - column want to check
 * @param {Int}   value - Value want to add to the column
 * @returns {Boolean} - If row contains value wanted to add false else true
 */
const checkColumn = (board, column, value) => {
  for (const i of board.keys()) {
    if (board[i][column] === value) {
      return false;
    }
  }
  return true;
};

/**
 * checkSquare()
 * Creates 3x3 square and iterates checking for existing val returns false if yes else true
 * @param   {Array} board   - Sudoku board
 * @param   {Array} row     - The row to check
 * @param   {Array} column  - The col to check
 * @param   {Int}   value   - The value to check against the previous params
 * @returns {Bool}  - if existing val false else true
 */
const checkSquare = (board, row, column, value) => {
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) {
        return false;
      }
    }
  }
  return true;
};

/**
 * checkValues()
 * Helper function that calls calls the checkRow, checkColumn and checkSquare
 * @param   {Array} board   - Sudoku board
 * @param   {Array} row     - The row to check
 * @param   {Array} column  - The col to check
 * @param   {Int}   value   - The value to check against the previous params
 * @returns {Bool} - returns true if checkRow, checkColumn and checkSquare return true else false
 */
const checkValues = (board, row, column, value) => {
  if (
    checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
};

/**
 * solvePuzzle()
 * Function that solves the board passed in, it checks all values and makes a recursive function call to recheck, thereby using the Backtracking algorithm
 * @see https://en.wikipedia.org/wiki/Backtracking
 * @param {Array} board - Sudoku board
 * @returns {Array} - an array of the solved sudoku puzzle
 */
const solvePuzzle = (board) => {
  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  //no empty inputs/places exist
  if (row === -1) {
    return board;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValues(board, row, col, num)) {
      board[row][col] = num;
      solvePuzzle(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) {
    board[row][col] = 0;
  }

  return board;
};

//answer
console.log(solvePuzzle(board));
