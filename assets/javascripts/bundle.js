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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');

  var pieceI = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
  var pieceJ = [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var pieceL = [[0, 1, 0, 0], [0, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];

  var pieceS = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];
  var pieceT = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
  var pieceO = [[1, 1], [1, 1]];
  var pieceZ = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];

  var pieces = [pieceZ, pieceO, pieceS, pieceT, pieceI, pieceJ, pieceL];

  var randomPiece = function randomPiece() {
    return pieces[Math.floor(Math.random() * pieces.length)];
  };

  var curpiece = { x: 300, y: 50, piece: randomPiece() };
  var drop = setInterval(dropdown, 500);

  function dropdown() {
    if (curpiece.y < 400) {
      removePiece(curpiece);
      curpiece.y += 15;
      displayPiece(curpiece);
    } else {
      curpiece = { x: 300, y: 50, piece: randomPiece() };
      curpiece.y = 0;
    }
  }

  function removePiece(movepiece) {
    movepiece.piece.forEach(function (row, posx) {
      row.forEach(function (item, posy) {
        if (item !== 0) {
          var pieceOb = canvas.getContext('2d');
          pieceOb.clearRect(movepiece.x + 15 * posy, movepiece.y + 15 * posx, 15, 15);
        }
      });
    });
  }

  function displayPiece(movepiece) {
    movepiece.piece.forEach(function (row, posx) {
      row.forEach(function (item, posy) {
        if (item !== 0) {
          var pieceOb = canvas.getContext('2d');
          pieceOb.fillStyle = "red";
          pieceOb.fillRect(movepiece.x + 15 * posy, movepiece.y + 15 * posx, 15, 15);
        }
      });
    });
  }

  function transpose(oriCurPiece) {
    var matrix = oriCurPiece.piece;
    for (var i = 0; i < matrix.length; i++) {
      for (var j = i; j < matrix[0].length; j++) {
        var _ref = [matrix[j][i], matrix[i][j]];
        matrix[i][j] = _ref[0];
        matrix[j][i] = _ref[1];
      }
    }
    oriCurPiece.piece = matrix;
  }

  document.addEventListener('keydown', function (event) {
    //left
    if (event.keyCode === 37) {
      removePiece(curpiece);
      curpiece.x -= 15;
      displayPiece(curpiece);
    }
    //top
    else if (event.keyCode === 38) {
        removePiece(curpiece);
        transpose(curpiece);
        displayPiece(curpiece);
      }
      //right
      else if (event.keyCode === 39) {
          removePiece(curpiece);
          curpiece.x += 15;
          displayPiece(curpiece);
        }
        //bottom
        else if (event.keyCode === 40) {
            removePiece(curpiece);
            curpiece.y -= 15;
            displayPiece(curpiece);
          }
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map