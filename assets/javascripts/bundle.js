/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var transpose = exports.transpose = function transpose(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = i; j < matrix[0].length; j++) {
      var _ref = [matrix[j][i], matrix[i][j]];
      matrix[i][j] = _ref[0];
      matrix[j][i] = _ref[1];
    }
  }
  matrix.map(function (row) {
    return row.reverse();
  });
  return matrix;
};

var bang = exports.bang = function bang(piece, board) {
  for (var x = 0; x < piece.piece.length; x++) {
    for (var y = 0; y < piece.piece[0].length; y++) {
      if (piece.piece[y][x] !== 0 && (board[y + piece.y / 30] && board[y + piece.y / 30][x + piece.x / 30]) !== 0) {
        return true;
      }
    }
  }
  return false;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _control = __webpack_require__(2);

var _control2 = _interopRequireDefault(_control);

var _UI = __webpack_require__(5);

var _UI2 = _interopRequireDefault(_UI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var control = new _control2.default(canvas);
  var controlboard = document.getElementById('controlboard');
  var ui = new _UI2.default(control);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pieces = __webpack_require__(3);

var _pieces2 = _interopRequireDefault(_pieces);

var _board = __webpack_require__(4);

var _board2 = _interopRequireDefault(_board);

var _helper = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller(canvas) {
    _classCallCheck(this, Controller);

    this.counter = 0;
    this.canvas = canvas;
    this.piece = new _pieces2.default();
    this.board = new _board2.default();
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

  _createClass(Controller, [{
    key: 'showscore',
    value: function showscore() {
      var scoreboard = document.getElementById('scoreboard');
      var ctx = scoreboard.getContext("2d");
      ctx.font = "30px Arial";
      ctx.clearRect(0, 350, 200, 150);
      ctx.fillText('score: ' + this.board.score, 10, 400);
    }
  }, {
    key: 'showscoreboard',
    value: function showscoreboard() {
      var scoreboard = document.getElementById('scoreboard');
      this.scoreboard = this.scoreboard.sort(function (a, b) {
        return b - a;
      });
      var ctx = scoreboard.getContext("2d");
      ctx.font = "30px Arial";
      ctx.clearRect(0, 0, 200, 350);
      ctx.fillText('ScoreBoard', 10, 50);
      var i = 0;
      while (i < 5) {
        if (this.scoreboard[i]) {
          ctx.fillText(i + 1 + '  score: ' + this.scoreboard[i], 10, 50 * (i + 1) + 50);
        } else {
          ctx.fillText(i + 1 + '  score: 0', 10, 50 * (i + 1) + 50);
        }
        i++;
      }
    }
  }, {
    key: 'dropdown',
    value: function dropdown() {
      this.counter += 20;
      if (this.counter === 500) {
        this.counter = 0;
        var nextPiece = Object.assign({}, this.piece.piece);
        nextPiece.y += 30;
        if ((0, _helper.bang)(nextPiece, this.board.board)) {
          this.removeBoard(this.board.board);
          this.removeItems(this.piece.piece);
          this.board.merge(this.piece.piece);
          this.board.linetest();
          this.showscore();
          this.score = this.board.score;
          if (this.board.gameover()) {
            this.scoreboard.push(this.score);
            this.board = new _board2.default();
            this.piece = new _pieces2.default();
            this.piece.y -= 30;
            this.showscore();
            this.showscoreboard();
          } else {
            this.piece = new _pieces2.default(this.board.board);
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
  }, {
    key: 'restart',
    value: function restart() {
      this.removeBoard(this.board.board);
      this.removeItems(this.piece.piece);
      this.board = new _board2.default();
      this.piece = new _pieces2.default();
      this.piece.y -= 30;
      this.showscore();
      this.showscoreboard();
      this.displayBoard(this.board.board);
      this.piece.piece.y += 30;
      this.displayItems(this.piece.piece);
      cancelAnimationFrame(this.game);
      this.dropdown();
    }
  }, {
    key: 'removeBoard',
    value: function removeBoard(board) {
      var _this = this;

      board.forEach(function (row, posx) {
        row.forEach(function (item, posy) {
          if (item !== 0) {
            var pieceOb = _this.canvas.getContext('2d');
            pieceOb.clearRect(30 * posy, 30 * posx, 30, 30);
          }
        });
      });
    }
  }, {
    key: 'displayBoard',
    value: function displayBoard(board) {
      var _this2 = this;

      board.forEach(function (row, posx) {
        row.forEach(function (item, posy) {
          if (item !== 0) {
            var ctx = _this2.canvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(30 * posy, 30 * posx, 30, 30);
            ctx.clearRect(30 * posy + 5, 30 * posx + 5, 20, 20);
            ctx.fillStyle = _this2.colors[item];
            ctx.fillRect(30 * posy + 5, 30 * posx + 5, 20, 20);
          }
        });
      });
    }
  }, {
    key: 'removeItems',
    value: function removeItems(items) {
      var _this3 = this;

      items.piece.forEach(function (row, posx) {
        row.forEach(function (item, posy) {
          if (item !== 0) {
            var pieceOb = _this3.canvas.getContext('2d');
            pieceOb.clearRect(items.x + 30 * posy, items.y + 30 * posx, 30, 30);
          }
        });
      });
    }
  }, {
    key: 'displayItems',
    value: function displayItems(items) {
      var _this4 = this;

      items.piece.forEach(function (row, posx) {
        row.forEach(function (item, posy) {
          if (item !== 0) {
            var ctx = _this4.canvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(items.x + 30 * posy, items.y + 30 * posx, 30, 30);
            ctx.clearRect(items.x + 30 * posy + 5, items.y + 30 * posx + 5, 20, 20);
            ctx.fillStyle = _this4.colors[item];
            ctx.fillRect(items.x + 30 * posy + 5, items.y + 30 * posx + 5, 20, 20);
          }
        });
      });
    }
  }, {
    key: 'moveitem',
    value: function moveitem(dir) {
      var nextPiece = Object.assign({}, this.piece.piece);
      nextPiece.x += dir;
      if (!(0, _helper.bang)(nextPiece, this.board.board)) {
        this.removeItems(this.piece.piece);
        this.piece.piece.x += dir;
        this.displayItems(this.piece.piece);
      }
    }
  }, {
    key: 'dropitem',
    value: function dropitem() {
      var nextPiece = Object.assign({}, this.piece.piece);
      nextPiece.y += 30;
      if (!(0, _helper.bang)(nextPiece, this.board.board)) {
        this.removeItems(this.piece.piece);
        this.piece.piece.y += 30;
        this.displayItems(this.piece.piece);
      }
    }
  }, {
    key: 'transposeitem',
    value: function transposeitem() {
      var nextPiece = Object.assign({}, this.piece.piece);
      var clone = [];
      for (var i = 0; i < this.piece.piece.piece.length; i++) {
        var clonearray = [];
        for (var j = 0; j < this.piece.piece.piece.length; j++) {
          clonearray.push(this.piece.piece.piece[i][j]);
        }
        clone.push(clonearray);
      }
      (0, _helper.transpose)(clone);
      nextPiece.piece = clone;
      if (!(0, _helper.bang)(nextPiece, this.board.board)) {
        this.removeItems(this.piece.piece);
        this.piece.piece.piece = (0, _helper.transpose)(this.piece.piece.piece);
        this.displayItems(this.piece.piece);
      }
    }
  }, {
    key: 'keyboard',
    value: function keyboard() {
      var _this5 = this;

      document.addEventListener('keydown', function (event) {
        //left
        if (event.keyCode === 65) {
          _this5.moveitem(-30);
        }
        //top
        else if (event.keyCode === 87) {
            _this5.transposeitem();
          }
          //right
          else if (event.keyCode === 68) {
              _this5.moveitem(+30);
            }
            //bottom
            else if (event.keyCode === 83) {
                _this5.dropitem();
              }
      });
    }
  }]);

  return Controller;
}();

exports.default = Controller;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pieceI = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
var pieceJ = [[0, 2, 0], [0, 2, 0], [2, 2, 0]];
var pieceL = [[0, 3, 0], [0, 3, 0], [0, 3, 3]];

var pieceS = [[0, 4, 4], [4, 4, 0], [0, 0, 0]];
var pieceT = [[0, 0, 0], [5, 5, 5], [0, 5, 0]];
var pieceO = [[6, 6], [6, 6]];
var pieceZ = [[7, 7, 0], [0, 7, 7], [0, 0, 0]];

var pieces = [pieceI, pieceJ, pieceL, pieceS, pieceT, pieceO, pieceZ];

var Piece = function () {
  function Piece() {
    var board = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Piece);

    this.board = board;
    if (board.length === 0) {
      this.piece = { x: 120, y: 0, piece: this.randomPiece() };
    } else {
      this.piece = { x: 120, y: 0, piece: this.nextPiece() };
    }
    this.score = new Array(7).fill(0);
  }

  _createClass(Piece, [{
    key: 'randomPiece',
    value: function randomPiece() {
      return pieces[Math.floor(Math.random() * pieces.length)];
    }
  }, {
    key: 'nextPiece',
    value: function nextPiece() {
      var piecescore = [{ piece: pieces[0], score: 0 }, { piece: pieces[1], score: 0 }, { piece: pieces[2], score: 0 }, { piece: pieces[3], score: 0 }, { piece: pieces[4], score: 0 }, { piece: pieces[5], score: 0 }, { piece: pieces[6], score: 0 }];
      for (var x = 0; x < this.board[0].length; x++) {
        var y = this.search(this.board, x);
        for (var i = 0; i < 7; i++) {
          for (var j = 0; j < 4; j++) {
            if (this.score(x, y, this.board, piecescore[i].piece) > piecescore[i].score) {
              piecescore[i].score = this.score(x, y, this.board, piecescore[i].piece);
            }
            piecescore[i].piece = (0, _helper.transpose)(piecescore[i].piece);
          }
        }
      }
      piecescore.sort(function (a, b) {
        return a.score - b.score;
      });
      return piecescore[Math.floor(Math.random() * (piecescore.length - 1))].piece;
    }
  }, {
    key: 'search',
    value: function search(board, x) {
      for (var y = 0; y < board.length; y++) {
        if (board[y][x] !== 0) {
          return y;
        }
      }
      return 14;
    }
  }, {
    key: 'score',
    value: function score(x, y, board, piece) {
      var validy = this.piecepos(x, y, board, piece);
      var cloneboard = [];
      for (var i = 0; i < board.length; i++) {
        var clonearray = [];
        for (var j = 0; j < board[0].length; j++) {
          clonearray.push(board[i][j]);
        }
        cloneboard.push(clonearray);
      }
      cloneboard = this.merge(cloneboard, x, validy, piece);
      return this.linetest(cloneboard);
    }
  }, {
    key: 'piecepos',
    value: function piecepos(x, y, board, piece) {
      while (y > 3 && (0, _helper.bang)({ x: 30 * x, y: 30 * y, piece: piece }, board)) {
        y--;
      }
      return y;
    }
  }, {
    key: 'merge',
    value: function merge(board, posx, posy, piece) {
      for (var x = 0; x < piece.length; x++) {
        for (var y = 0; y < piece[0].length; y++) {
          if (piece[y][x] !== 0) {
            board[y + posy][x + posx] = piece[y][x];
          }
        }
      }
      return board;
    }
  }, {
    key: 'linetest',
    value: function linetest(board) {
      var score = 0;
      row: for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
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
  }]);

  return Piece;
}();

exports.default = Piece;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.board = this.createMatrix();
    this.merge = this.merge.bind(this);
    this.score = 0;
  }

  _createClass(Board, [{
    key: "merge",
    value: function merge(piece) {
      for (var x = 0; x < piece.piece.length; x++) {
        for (var y = 0; y < piece.piece[0].length; y++) {
          if (piece.piece[y][x] !== 0) {
            this.board[y + piece.y / 30][x + piece.x / 30] = piece.piece[y][x];
          }
        }
      }
    }
  }, {
    key: "createMatrix",
    value: function createMatrix() {
      var matrix = [];
      for (var i = 0; i < 15; i++) {
        matrix.push(new Array(10).fill(0));
      }
      return matrix;
    }
  }, {
    key: "linetest",
    value: function linetest() {
      row: for (var i = 0; i < this.board.length; i++) {
        for (var j = 0; j < this.board[0].length; j++) {
          if (this.board[i][j] === 0) {
            continue row;
          }
        }
        this.board.splice(i, 1);
        this.score += 100;
        this.board.unshift(new Array(10).fill(0));
      }
    }
  }, {
    key: "gameover",
    value: function gameover() {
      for (var i = 0; i < this.board[0].length; i++) {
        if (this.board[3][i] !== 0) {
          return true;
        }
      }
      return false;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function UI(controller) {
  var _this = this;

  _classCallCheck(this, UI);

  this.control = controller;
  var startGame = document.getElementById('startbutton');
  startGame.addEventListener('click', function () {
    requestAnimationFrame(_this.control.dropdown);
  });
  var pauseGame = document.getElementById('pausebutton');
  pauseGame.addEventListener('click', function () {
    cancelAnimationFrame(_this.control.game);
  });
  var restartGame = document.getElementById('restartbutton');
  restartGame.addEventListener('click', function () {
    _this.control.restart();
  });
  var music = document.getElementById('musicbutton');
  music.addEventListener('click', function () {
    var background = document.getElementById('background');
    if (background.paused) {
      background.play();
    } else {
      background.pause();
    }
  });
};

exports.default = UI;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map