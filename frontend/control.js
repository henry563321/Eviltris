import Piece from './pieces.js';
import Board from './board.js';

class Controller {
  constructor(canvas) {
    this.counter = 0;
    this.canvas = canvas;
    this.piece = new Piece();
    this.board = new Board();
    this.keyboard = this.keyboard.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.keyboard();
    const drop = setInterval(this.dropdown, 10);
  }

  dropdown() {
    this.counter += 10;
    if (this.counter === 500) {
      this.counter = 0;
      let nextPiece = Object.assign({},this.piece.piece);
      nextPiece.y += 15;
      if (this.bang(nextPiece, this.board.board)) {
        this.removeBoard(this.board.board);
        this.removeItems(this.piece.piece);
        this.board.merge(this.piece.piece);
        this.board.linetest();
        this.displayBoard(this.board.board);
        this.piece = new Piece();
        this.counter = 0;
      }
      this.removeItems(this.piece.piece);
      this.piece.piece.y += 15;
      this.displayItems(this.piece.piece);
    }
  }

  bang(piece, board) {
    for(let x = 0; x < piece.piece.length; x++) {
      for(let y = 0; y < piece.piece[0].length; y++) {
        if (piece.piece[y][x] !== 0 && (board[y + piece.y/15]
          && board[y + piece.y/15][x + piece.x/15]) !== 0) {
            return true;
          }
      }
    }
    return false;
  }

  removeBoard(board) {
    board.forEach( (row, posx) => {
      row.forEach((item, posy) => {
        if(item !== 0) {
          var pieceOb = this.canvas.getContext('2d');
          pieceOb.clearRect(15 * posy, 15 * posx, 15, 15);
        }
      });
    });
  }



  displayBoard(board) {
    board.forEach( (row, posx) => {
      row.forEach((item, posy) => {
        if(item !== 0) {
          var pieceOb = this.canvas.getContext('2d');
          pieceOb.fillStyle = "red";
          pieceOb.fillRect(15 * posy, 15 * posx, 15, 15);
        }
      });
    });
  }


  removeItems(items) {
    items.piece.forEach( (row, posx) => {
      row.forEach((item, posy) => {
        if(item !== 0) {
          var pieceOb = this.canvas.getContext('2d');
          pieceOb.clearRect(items.x + 15 * posy, items.y + 15 * posx, 15, 15);
        }
      });
    });
  }



  displayItems(items) {
    items.piece.forEach( (row, posx) => {
      row.forEach((item, posy) => {
        if(item !== 0) {
          var pieceOb = this.canvas.getContext('2d');
          pieceOb.fillStyle = "red";
          pieceOb.fillRect(items.x + 15 * posy, items.y + 15 * posx, 15, 15);
        }
      });
    });
  }

  moveitem(dir) {
    let nextPiece = Object.assign({},this.piece.piece);
    nextPiece.x += dir;
    if (!this.bang(nextPiece, this.board.board)) {
      this.removeItems(this.piece.piece);
      this.piece.piece.x += dir;
      this.displayItems(this.piece.piece);
    }
  }

  dropitem() {
    let nextPiece = Object.assign({},this.piece.piece);
    nextPiece.y += 15;
    if (!this.bang(nextPiece, this.board.board)) {
      this.removeItems(this.piece.piece);
      this.piece.piece.y += 15;
      this.displayItems(this.piece.piece);
    }
  }

  transposeitem() {
    let nextPiece = Object.assign({},this.piece.piece);
    let clone = [];
    for (let i = 0; i < this.piece.piece.piece.length; i++) {
      let clonearray = [];
      for (let j = 0; j < this.piece.piece.piece.length; j++) {
        clonearray.push(this.piece.piece.piece[i][j]);
      }
      clone.push(clonearray);
    }
    this.transpose(clone);
    nextPiece.piece = clone;
    if (!this.bang(nextPiece, this.board.board)) {
      this.removeItems(this.piece.piece);
      this.piece.piece.piece = this.transpose(this.piece.piece.piece);
      this.displayItems(this.piece.piece);
    }
  }

  transpose(matrix) {
    for(let i = 0; i < matrix.length; i++) {
      for(let j = i; j < matrix[0].length; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
    matrix.map((row) => row.reverse());
    return matrix;
  }

  keyboard() {
    document.addEventListener('keydown', (event) => {
        //left
      if(event.keyCode === 37) {
        this.moveitem(-15);
      }
      //top
      else if(event.keyCode === 38) {
          this.transposeitem();
      }
      //right
      else if(event.keyCode === 39) {
          this.moveitem(+15);
      }
      //bottom
      else if(event.keyCode === 40) {
          this.dropitem();
      }
    });
  }
}

export default Controller;
