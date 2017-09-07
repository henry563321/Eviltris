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

class Piece {
  constructor() {
    this.piece = {x: 135, y: 0, piece: this.randomPiece()};
  }
  randomPiece() {
    return pieces[Math.floor(Math.random()*pieces.length)];
  }

}

export default Piece;
