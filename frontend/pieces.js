import {bang, transpose} from './helper';

const pieceI = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];
const pieceJ = [
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 0]
];
const pieceL = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 1]
];

const pieceS = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0]
];
const pieceT = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];
const pieceO = [
  [1, 1],
  [1, 1]
];
const pieceZ = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0]
];

const pieces = [pieceZ, pieceO, pieceS, pieceT, pieceI, pieceJ, pieceL];
const piecescolor = [pieceZ, pieceO, pieceS, pieceT, pieceI, pieceJ, pieceL];

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
    for(let x = 0; x < this.board[0].length; x++) {
      const y = this.search(this.board, x);
    }
  }

  search(board, x) {
    for(let y = 0; y < this.board.length; x++) {
      if (board[x][y] === 1) {
        return y;
      }
    }
    return 19;
  }

  linetest(x, board) {
    
  }

}

export default Piece;
