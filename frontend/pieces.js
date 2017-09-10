import {bang, transpose} from './helper';

const pieceI = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];
const pieceJ = [
  [0, 2, 0],
  [0, 2, 0],
  [2, 2, 0]
];
const pieceL = [
  [0, 3, 0],
  [0, 3, 0],
  [0, 3, 3]
];

const pieceS = [
  [0, 4, 4],
  [4, 4, 0],
  [0, 0, 0]
];
const pieceT = [
  [0, 0, 0],
  [5, 5, 5],
  [0, 5, 0]
];
const pieceO = [
  [6, 6],
  [6, 6]
];
const pieceZ = [
  [7, 7, 0],
  [0, 7, 7],
  [0, 0, 0]
];

const pieces = [pieceI, pieceJ, pieceL, pieceS, pieceT, pieceO, pieceZ];

class Piece {
  constructor(board = []) {
    this.piece = {x: 120, y: 0, piece: this.randomPiece()};
    this.board = board;
    this.score = new Array(7).fill(0);
  }
  randomPiece() {
    return pieces[Math.floor(Math.random()*pieces.length)];
  }

  nextPiece() {
    let piecescore = [p]
    for(let x = 0; x < this.board[0].length; x++) {
      const y = this.search(this.board, x);
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) {

        }
      }
      const piecepos = this.piecepos(y, this.board)
    }
  }

  search(board, x) {
    for(let y = 0; y < this.board.length; x++) {
      if (board[x][y] !== 0) {
        return y;
      }
    }
    return 19;
  }

  piecepos(y, ) {

  }

  linetest(x, board) {
    row: for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] === 0) {
          continue row;
        }
      }
      this.score += 100;
      this.board.unshift(new Array(10).fill(0));
    }
  }



}

export default Piece;
