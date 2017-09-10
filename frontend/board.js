class Board {
  constructor() {
    this.board = this.createMatrix();
    this.merge = this.merge.bind(this);
    this.score = 0;
  }

  merge(piece) {
    for(let x = 0; x < piece.piece.length; x++) {
      for(let y = 0; y < piece.piece[0].length; y++) {
        if (piece.piece[y][x] !== 0) {
          this.board[y + piece.y/30][x + piece.x/30] = piece.piece[y][x];
        }
      }
    }
  }

  createMatrix() {
    const matrix = [];
    for (let i = 0; i < 20; i++) {
      matrix.push(new Array(10).fill(0));
    }
    return matrix;
  }

  linetest() {
    row: for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] === 0) {
          continue row;
        }
      }
      this.board.splice(i, 1);
      this.score += 100;
      this.board.unshift(new Array(10).fill(0));
    }
  }

  gameover() {
    for(let i = 0; i < this.board[0].length; i++) {
      if (this.board[3][i] !== 0 ) {
        return true;
      }
    }
    return false;
  }

}

export default Board;
