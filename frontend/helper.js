export const transpose = (matrix) => {
    for(let i = 0; i < matrix.length; i++) {
      for(let j = i; j < matrix[0].length; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
    matrix.map((row) => row.reverse());
    return matrix;
};

export const bang = (piece, board) => {
  for(let x = 0; x < piece.piece.length; x++) {
    for(let y = 0; y < piece.piece[0].length; y++) {
      if (piece.piece[y][x] !== 0 && (board[y + piece.y/30]
        && board[y + piece.y/30][x + piece.x/30]) !== 0) {
          return true;
        }
    }
  }
  return false;
};
