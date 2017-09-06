

document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('canvas');


const pieceI = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];
const pieceJ = [
  [0, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const pieceL = [
  [0, 1, 0, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
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

const randomPiece = () => {
  return pieces[Math.floor(Math.random()*pieces.length)];
};

var curpiece = {x: 300, y: 50, piece: randomPiece()};
const drop = setInterval(dropdown, 500);

function dropdown() {
  if (curpiece.y < 400) {
  removePiece(curpiece);
  curpiece.y += 15;
  displayPiece(curpiece);
  } else {
  curpiece = {x: 300, y: 50, piece: randomPiece()};
  curpiece.y = 0;
  }
}

function removePiece(movepiece) {
  movepiece.piece.forEach( (row, posx) => {
    row.forEach((item, posy) => {
      if(item !== 0) {
        var pieceOb = canvas.getContext('2d');
        pieceOb.clearRect(movepiece.x + 15 * posy, movepiece.y + 15 * posx, 15, 15);
      }
    });
  });
}



function displayPiece(movepiece) {
  movepiece.piece.forEach( (row, posx) => {
    row.forEach((item, posy) => {
      if(item !== 0) {
        var pieceOb = canvas.getContext('2d');
        pieceOb.fillStyle = "red";
        pieceOb.fillRect(movepiece.x + 15 * posy, movepiece.y + 15 * posx, 15, 15);
      }
    });
  });
}

function transpose(oriCurPiece) {
  let matrix = oriCurPiece.piece;
  for(let i = 0; i < matrix.length; i++) {
    for(let j = i; j < matrix[0].length; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  oriCurPiece.piece = matrix;
}

document.addEventListener('keydown', function(event) {
    //left
    if(event.keyCode === 37) {
        removePiece(curpiece);
        curpiece.x -= 15;
        displayPiece(curpiece);
    }
    //top
    else if(event.keyCode === 38) {
        removePiece(curpiece);
        transpose(curpiece);
        displayPiece(curpiece);
    }
    //right
    else if(event.keyCode === 39) {
        removePiece(curpiece);
        curpiece.x += 15;
        displayPiece(curpiece);
    }
    //bottom
    else if(event.keyCode === 40) {
        removePiece(curpiece);
        curpiece.y -= 15;
        displayPiece(curpiece);
    }
});
});
