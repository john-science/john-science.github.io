// master object for the TETROID board
var board = (function() {
  // layout board space
  var rows = 20;
  var cols = 10;
  // grab window size, calculate number of pixels per block (TODO: could be more flexible onresize)
  var maxH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var maxW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  // leave a small border, for safety
  maxH -= 10;
  maxW -= 10;
  var scale = (maxH / (rows + 2)) < (maxW / (cols + 2)) ? parseInt(maxH / (rows + 2)) : parseInt(maxW / (cols + 2));
  var canvas = document.getElementById('boardCanvas');
  canvas.height = scale * (rows + 2);
  canvas.width = scale * (cols + 2);
  // get context for working with the canvas later
  var context = canvas.getContext('2d');
  // define color palette
  var WHITE = "#FFFFFF";
  var GRAY = "#777777";
  var BLUE = "#003B6F";
  var RED = "#AB1400";
  var GREEN = "#008022";
  var YELLOW = "#AB6400";
  var colors = [BLUE, RED, GREEN, YELLOW];
  // map colors to their lighter shades
  var shades = {
    "#003B6F": "#015EB2",
    "#AB1400": "#FF1E00",
    "#008022": "#00F841",
    "#AB6400": "#FF9500",
    "#777777": "#A3A3A3"
  };
  // tile array for game area
  var board = [];
  for (var r = 0; r < rows; r++) {
    board[r] = [];
    for (var c = 0; c < cols; c++) {
      board[r][c] = false;
    }
  }

  return {
    resize: function() {
      // helper function to resize game board on the fly
      maxH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      maxW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      // leave a small border, for safety
      maxH -= 10;
      maxW -= 10;
      scale = (maxH / (rows + 2)) < (maxW / (cols + 2)) ? parseInt(maxH / (rows + 2)) : parseInt(maxW / (cols + 2));
      canvas.height = scale * (rows + 2);
      canvas.width = scale * (cols + 2);
      this.reset();
    },
    reset: function() {
      // tile array for game area
      board = [];
      for (var r = 0; r < rows; r++) {
        board[r] = [];
        for (var c = 0; c < cols; c++) {
          board[r][c] = false;
        }
      }
    },
    drawBackground: function() {
      // fill in background for entire board
      context.beginPath();
      context.rect(scale, scale, scale * cols, scale * rows);
      context.fillStyle = WHITE;
      context.fill();
    },
    drawBoxSmall: function(xmin, ymin, color) {
      // draw very small boxes (<20px)
      context.beginPath();
      context.rect(xmin, ymin, scale, scale);
      context.fillStyle = color;
      context.fill();
    },
    drawBoxMedium: function(xmin, ymin, color) {
      // draw medium boxes (< 50px but > 20px) (WARNING: Breaks if < 11px!)
      context.beginPath();
      context.rect(xmin + 3, ymin + 3, scale - 6, scale - 6);
      context.fillStyle = shades[color];
      context.fill();
      context.lineWidth = 6;
      context.lineJoin = "round";
      context.strokeStyle = color;
      context.stroke();
    },
    drawBoxLarge: function(xmin, ymin, color) {
      // draw a box if the sizes are bigger than 50px
      var half = parseInt(scale / 2);
      var radGrad = context.createRadialGradient(xmin + half, ymin + half, 0, xmin + half, ymin + half, half);
      radGrad.addColorStop(0, 'white');
      radGrad.addColorStop(1, color);

      context.beginPath();
      context.rect(xmin + 5, ymin + 5, scale - 10, scale - 10);
      context.fillStyle = radGrad;
      context.fill();
      context.lineWidth = 10;
      context.lineJoin = "round";
      context.strokeStyle = color;
      context.stroke();
    },
    drawBox: function(x, y, c) {
      scale < 21 ? this.drawBoxSmall(x, y, c) : (scale < 50 ? this.drawBoxMedium(x, y, c) : this.drawBoxLarge(x, y, c));
    },
    drawWalls: function() {
      // draw the bounding box of the game board
      // draw sides
      for (var i = 0; i < rows + 2; i++) {
        this.drawBox(0, scale * i, GRAY, scale);
        this.drawBox(scale * (cols + 1), scale * i, GRAY, scale);
      }
      // draw top and bottom
      for (var i = 1; i < cols + 1; i++) {
        this.drawBox(scale * i, 0, GRAY, scale);
        this.drawBox(scale * i, scale * (rows + 1), GRAY, scale);
      }
    },
    drawBoard: function() {
      this.drawBackground();
      // draw the board tiles
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          if (board[r][c]) {
            this.drawBox(c * scale + scale, r * scale + scale, board[r][c]);
          }
        }
      }
    },
    drawPiece: function(posiArray, plusX, plusY, color) {
      // draw a single game piece as it is falling
      for (var i = 0; i < posiArray.length; i++) {
        posi = posiArray[i];
        if ((posi[1] + plusY) >= 0) {
          this.drawBox((posi[0] + plusX) * scale + scale, (posi[1] + plusY) * scale + scale, color);
        }
      }
    },
    getRandomColor: function() {
      return colors[Math.floor(Math.random() * colors.length)];
    },
    setB: function(x, y, c) {
      // set a tile on the board
      // c can be a color string or false
      board[y][x] = c;
    },
    getB: function(x, y) {
      // get tile on board
      if (board[y]) {
        return board[y][x];
      } else {
        return false;
      }
    },
    isRowComplete: function(r) {
      // test if a line is complete
      if (r < 0 || r >= rows) {
        return false;
      }
      for (var c = 0; c < cols; c++) {
        if (!board[r][c]) {
          return false;
        }
      }
      return true;
    },
    getRows: function() {
      return rows;
    },
    getCols: function() {
      return cols;
    }
  };
}());

// TETROID game logic
var tetroid = (function() {
  var pieces = [
    // Pieces are made of "points" from 0 to 7
    // 0123
    // 4567

    // 1. Bar
    // ----
    // XXXX
    [4, 5, 6, 7],
    // 2. L (flipped)
    // X---
    // XXX-
    [0, 4, 5, 6],
    // 3. L
    // --X-
    // XXX-
    [2, 4, 5, 6],
    // 4. Square
    // -XX-
    // -XX-
    [1, 2, 5, 6],
    // 5. S
    // -XX-
    // XX--
    [1, 2, 4, 5],
    // 6. Triangle
    // -X--
    // XXX-
    [1, 4, 5, 6],
    // 7. S (flipped)
    // XX--
    // -XX-
    [0, 1, 5, 6]
  ].map(function(points) {
    return points.map(function(i) {
      var x = i % 4;
      var y = Math.floor(i / 4);
      return [x, y];
    });
  });

  // Gameplay area
  var board = null;
  var sizeX = 10; // should come from board at runtime
  var sizeY = 20; // should come from board at runtime
  var progress;
  var gameState = false;

  // Current piece: array of points and position
  var current;
  var currentId;
  var currentX;
  var currentY;
  var currentColor;

  return {
    gamePlayStart: function() {
      progress = 0;
      this.printLines();
      this.createRandomPiece();
      this.render();
      this.flipSwitch();
      gameState = true;
    },
    flipSwitch: function() {
      var now = document.getElementById("startPause").innerHTML;
      now = now === "Pause" ? "Start" : "Pause";
      document.getElementById("startPause").innerHTML = now;
    },
    moveIfFree: function(vectorX, vectorY) {
      // Check if the place for moved piece's position is free
      var isAreaFree = current.every(function(point) {
        var x = point[0] + currentX + vectorX;
        var y = point[1] + currentY + vectorY;
        return (x >= 0 && x <= sizeX - 1 && y <= sizeY - 1 && !board.getB(x, y))
      });

      // Move current piece if possible
      if (isAreaFree) {
        currentX += vectorX;
        currentY += vectorY;
      }

      return isAreaFree;
    },
    createRandomPiece: function() {
      currentId = Math.floor(Math.random() * pieces.length);
      current = pieces[currentId];
      currentColor = board.getRandomColor();

      currentX = Math.floor(Math.random() * (sizeX - 3));
      currentY = -2;

      var rot = Math.floor(Math.random() * 3);
      for (var i = 0; i < rot; i++) {
        this.rotate();
      }
    },
    step: function() {
      // If piece can't move unit down
      if (!this.moveIfFree(0, 1)) {
        // If piece is stuck at the top, the game is lost
        if (current.some(function(point) {
            return point[1] + currentY < 1;
          })) {
          gameState = false;
          board.reset();
          this.flipSwitch();
        } else { // the piece is at the bottom and should stay there
          // Attach current object to the game area
          current.forEach(function(point) {
            board.setB(point[0] + currentX, point[1] + currentY, currentColor);
          });

          // Create new piece
          this.createRandomPiece();

          // Check for full horizontal lines in game area
          var lines = [];
          var line;
          for (var i = 0; i < sizeY; i++) {
            line = board.isRowComplete(i);
            if (line) {
              lines.unshift(i);
            }
          }

          // Remove horizontal lines if there are any
          if (lines.length) {
            progress += lines.length;
            this.printLines();

            // Iterate through all lines and shift by "levels" units
            var levels = 1;
            for (i = lines.shift() - 1; i >= 0; i--) {
              if (lines.length) {
                if (lines[0] === i) {
                  lines.shift();
                  levels++;
                  continue;
                }
              }

              // Move line down by "levels" unit
              for (j = 0; j < sizeX; j++) {
                board.setB(j, i + levels, board.getB(j, i));
              }
            }
          }

        }
      } else {
        this.render();
      }
    },
    printLines: function() {
      document.getElementById('lines').innerHTML = progress;
    },
    render: function() {
      // master graphical UI rendered
      board.drawBoard();
      board.drawPiece(current, currentX, currentY, currentColor);
    },
    rotate: function() {
      // If current piece is a square
      if (currentId === 3) {
        return;
      }

      var newCurrent = [];
      var canRotate = true;

      current.forEach(function(point) {
        var x = 2 - point[1];
        var y = point[0];

        // If current piece is a bar and it is vertical
        if (currentId === 0 && current[0][0] == current[1][0]) {
          x += 1;
        }

        if (x + currentX < 0 || y + currentY < 0 || x + currentX >= sizeX || y + currentY >= sizeY) {
          canRotate = false;
        } else if (board.getB(x + currentX, y + currentY)) {
          canRotate = false;
        }

        newCurrent.push([x, y]);
      });

      if (canRotate) {
        current = newCurrent;
      }
    },
    loop: function() {
      // If gameState === 1 then step()
      gameState && this.step();
    },
    getGameState: function() {
      return gameState;
    },
    setGameState: function(g) {
      gameState = g;
    },
    loadBoard: function(b) {
      board = b;
      sizeX = board.getCols();
      sizeY = board.getRows();
      board.drawWalls();
    }
  };
}());


// load the board controller into the game
tetroid.loadBoard(board);

// handle keyboard events (TODO: Touching)
document.onkeydown = function(e) {
  var keyMap = {
    ArrowLeft: tetroid.moveIfFree.bind(null, -1, 0), // Move left
    ArrowRight: tetroid.moveIfFree.bind(null, 1, 0), // Move right
    ArrowDown: tetroid.moveIfFree.bind(null, 0, 1), // Move bottom (speed up)
    ArrowUp: tetroid.rotate // Rotate current piece
  };
  // If the game is being played
  if (tetroid.getGameState()) {
    // If the action exists for the key pressed
    if (e.key in keyMap) {
      // Run an action based on key code
      keyMap[e.key]();
      tetroid.render();
    }
  } else if (e.key === "Enter") {
    tetroid.gamePlayStart();
  }
};

// game loop meta function, to deal with scope
function looper() {
  tetroid.loop();
}

// start the game
setInterval(looper, 400);
