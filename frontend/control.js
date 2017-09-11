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
    this.scoreboard = [];
    this.showscoreboard();
    this.colors = [null, 'red', 'magenta', 'yellow', 'cyan', 'silver', 'lightgreen', 'blue'];
    this.showscore();
    this.keyboard = this.keyboard.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.keyboard();
    this.game = {};
  }

  showscore() {
    const scoreboard = document.getElementById('scoreboard');
    var ctx = scoreboard.getContext("2d");
    ctx.font = "30px Arial";
    ctx.clearRect(0, 400, 200, 200);
    ctx.fillText(`score: ${this.board.score}`, 10, 450);
  }

  showscoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    this.scoreboard = this.scoreboard.sort((a,b) => {return b - a;});
    var ctx = scoreboard.getContext("2d");
    ctx.font = "30px Arial";
    ctx.clearRect(0,0,200,400);
    ctx.fillText(`ScoreBoard`, 10, 50);
    let i = 0;
    while (i < 5) {
      if( this.scoreboard[i] ) {
        ctx.fillText(`${i + 1}  score: ${this.scoreboard[i]}`, 10, 60 * (i + 1) + 50);
      } else {
        ctx.fillText(`${i + 1}  score: 0`, 10, 60 * (i + 1) + 50);
      }
      i++;
    }
  }

  dropdown() {
    this.counter += 20;
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
          this.scoreboard.push(this.score);
          this.board = new Board();
          this.piece = new Piece();
          this.piece.y -= 30;
          this.showscore();
          this.showscoreboard();
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
    this.game = requestAnimationFrame(this.dropdown);
  }

  restart() {
    this.removeBoard(this.board.board);
    this.removeItems(this.piece.piece);
    this.board = new Board();
    this.piece = new Piece();
    this.piece.y -= 30;
    this.showscore();
    this.showscoreboard();
    this.displayBoard(this.board.board);
    this.piece.piece.y += 30;
    this.displayItems(this.piece.piece);
    cancelAnimationFrame(this.game);
    this.dropdown();
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
          var ctx = this.canvas.getContext('2d');
          ctx.fillStyle = 'black';
          ctx.fillRect(30 * posy, 30 * posx, 30, 30);
          ctx.clearRect(30 * posy + 5, 30 * posx + 5, 20, 20);
          ctx.fillStyle = this.colors[item];
          ctx.fillRect(30 * posy + 5, 30 * posx + 5, 20, 20);
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
          var ctx = this.canvas.getContext('2d');
          ctx.fillStyle = 'black';
          ctx.fillRect(items.x + 30 * posy, items.y + 30 * posx, 30, 30);
          ctx.clearRect(items.x + 30 * posy + 5, items.y + 30 * posx + 5, 20, 20);
          ctx.fillStyle = this.colors[item];
          ctx.fillRect(items.x + 30 * posy + 5, items.y + 30 * posx + 5, 20, 20);
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
