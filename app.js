let grid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
//think x and y axis are mixed up
/**
 * isPossible()
 *
 * @param   {int}   y - The y axis or vertical column wanting to check
 * @param   {int}   x - The x axis or horizontal row wanting to check
 * @param   {int}   n - The number to check against
 * @returns {Bool}  true/false if number passed in will work in the cell
 */
const isPossible = (y, x, n) => {
  //y axis
  /*for (const i of grid.keys()) {
    if (grid[y][i] == n) {
      return false;
    }
  }*/
  if (grid[y].includes(n)) return false;

  //x axis
  for (const j of grid.keys()) {
    if (grid[j][x] == n) {
      return false;
    }
  }
  gridRow = Math.floor(x / 3) * 3;
  gridCol = Math.floor(y / 3) * 3;

  //check the square
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[gridCol + r][gridRow + c] === n) {
        return false;
      }
    }
  }
  return true;
};

/**
 * solvePuzzle()
 * Iterates the y axis, then the x axis to get array position, iterates a for loop
 * as n "1-9" to see if isPossible() and sets grid array position to n. finally it uses the
 * backtrack algorithm by calling solvePuzzle() recursively
 * @returns  {Array} - prints solved grid as array to the console
 */
const solvePuzzle = () => {
  for (let y of grid.keys()) {
    for (let x of grid.keys()) {
      if (grid[y][x] == 0) {
        for (let n = 1; n < 10; n++) {
          if (isPossible(y, x, n)) {
            grid[y][x] = n; //set empty arr element or cell to n
            solvePuzzle(); //recursive
            grid[y][x] = 0;
          }
        }
        return;
      }
    }
  }
  console.log(grid);
};

solvePuzzle();
