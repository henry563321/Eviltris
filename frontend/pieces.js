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
    this.board = board;
    if (board.length === 0) {
      this.piece = {x: 120, y: 0, piece: this.randomPiece()};
    } else {
      this.piece = {x: 120, y: 0, piece: this.nextPiece()};
    }
    this.score = new Array(7).fill(0);
  }
  randomPiece() {
    return pieces[Math.floor(Math.random()*pieces.length)];
  }

  nextPiece() {
    let piecescore = [{piece: pieces[0], score: 0},
    {piece: pieces[1], score: 0},
    {piece: pieces[2], score: 0},
    {piece: pieces[3], score: 0},
    {piece: pieces[4], score: 0},
    {piece: pieces[5], score: 0},
    {piece: pieces[6], score: 0}];
    for(let x = 0; x < this.board[0].length; x++) {
      const y = this.search(this.board, x);
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.score(x, y, this.board, piecescore[i].piece) > piecescore[i].score) {
            piecescore[i].score = this.score(x, y, this.board, piecescore[i].piece);
          }
          piecescore[i].piece = transpose(piecescore[i].piece);
        }
      }
    }
    piecescore.sort((a,b) => {return a.score - b.score;});
    return piecescore[Math.floor(Math.random()*(piecescore.length - 1))].piece;
  }

  search(board, x) {
    for(let y = 0; y < board.length; y++) {
      if (board[y][x] !== 0) {
        return y;
      }
    }
    return 19;
  }

  score(x, y, board, piece) {
    const validy = this.piecepos(x, y, board, piece);
    let cloneboard = [];
    for (let i = 0; i < board.length; i++) {
      let clonearray = [];
      for (let j = 0; j < board[0].length; j++) {
        clonearray.push(board[i][j]);
      }
      cloneboard.push(clonearray);
    }
    cloneboard = this.merge(cloneboard, x, validy, piece);
    return this.linetest(cloneboard);
  }

  piecepos(x, y, board, piece) {
    while(y > 3 && bang({x: 30 * x, y: 30 * y, piece: piece}, board)) {
      y--;
    }
    return y;
  }

  merge(board, posx, posy, piece) {
    for(let x = 0; x < piece.length; x++) {
      for(let y = 0; y < piece[0].length; y++) {
        if (piece[y][x] !== 0) {
          board[y + posy][x + posx] = piece[y][x];
        }
      }
    }
    return board;
  }

  linetest(board) {
    let score = 0;
    row: for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === 0) {
          continue row;
        }
      }
      board.splice(i, 1);
      score += 100;
      board.unshift(new Array(10).fill(0));
    }
    return score;
  }



}

export default Piece;
