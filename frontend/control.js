import Piece from './pieces.js';
import Board from './board.js';
import {bang, transpose} from './helper.js';

class Controller {
  constructor(canvas) {
    this.counter = 0;
    this.canvas = canvas;
    this.piece = new Piece();
    this.board = new Board();
    this.score = 0;
    this.showscore();
    this.keyboard = this.keyboard.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.keyboard();
    const drop = setInterval(this.dropdown, 10);
  }

  showscore() {
    const scoreboard = document.getElementById('scoreboard');
    var ctx = scoreboard.getContext("2d");
    ctx.font = "30px Arial";
    ctx.clearRect(0,0,200,200);
    ctx.fillText(`score: ${this.board.score}`,10,50);
  }

  dropdown() {
    this.counter += 10;
    if (this.counter === 500) {
      this.counter = 0;
      let nextPiece = Object.assign({},this.piece.piece);
      nextPiece.y += 30;
      if (bang(nextPiece, this.board.board)) {
        this.removeBoard(this.board.board);
        this.removeItems(this.piece.piece);
        this.board.merge(this.piece.piece);
        this.board.linetest();
        this.showscore();
        this.score = this.board.score;
        if (this.board.gameover()) {
          this.board = new Board();
          this.piece = new Piece();
          this.piece.y -= 30;
          this.showscore();
        } else {
        this.piece = new Piece(this.board.board);
        this.counter = 0;
        }
        this.displayBoard(this.board.board);
      }
      this.removeItems(this.piece.piece);
      this.piece.piece.y += 30;
      this.displayItems(this.piece.piece);
    }
  }



  removeBoard(board) {
    board.forEach( (row, posx) => {
      row.forEach((item, posy) => {
        if(item !== 0) {
          var pieceOb = this.canvas.getContext('2d');
          pieceOb.clearRect(30 * posy, 30 * posx, 30, 30);
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
          pieceOb.fillRect(30 * posy, 30 * posx, 30, 30);
        }
      });
    });
  }


  removeItems(items) {
    items.piece.forEach( (row, posx) => {
      row.forEach((item, posy) => {
        if(item !== 0) {
          var pieceOb = this.canvas.getContext('2d');
          pieceOb.clearRect(items.x + 30 * posy, items.y + 30 * posx, 30, 30);
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
          pieceOb.fillRect(items.x + 30 * posy, items.y + 30 * posx, 30, 30);
        }
      });
    });
  }

  moveitem(dir) {
    let nextPiece = Object.assign({},this.piece.piece);
    nextPiece.x += dir;
    if (!bang(nextPiece, this.board.board)) {
      this.removeItems(this.piece.piece);
      this.piece.piece.x += dir;
      this.displayItems(this.piece.piece);
    }
  }

  dropitem() {
    let nextPiece = Object.assign({},this.piece.piece);
    nextPiece.y += 30;
    if (!bang(nextPiece, this.board.board)) {
      this.removeItems(this.piece.piece);
      this.piece.piece.y += 30;
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
    transpose(clone);
    nextPiece.piece = clone;
    if (!bang(nextPiece, this.board.board)) {
      this.removeItems(this.piece.piece);
      this.piece.piece.piece = transpose(this.piece.piece.piece);
      this.displayItems(this.piece.piece);
    }
  }



  keyboard() {
    document.addEventListener('keydown', (event) => {
        //left
      if(event.keyCode === 37) {
        this.moveitem(-30);
      }
      //top
      else if(event.keyCode === 38) {
          this.transposeitem();
      }
      //right
      else if(event.keyCode === 39) {
          this.moveitem(+30);
      }
      //bottom
      else if(event.keyCode === 40) {
          this.dropitem();
      }
    });
  }
}

export default Controller;
