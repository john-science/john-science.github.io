// master object for the TETROID board
var board = (function() {
  // layout board space
  var rows = 20;
  var cols = 10;
  // grab window size, calculate number of pixels per block
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
  // find preview canvas
  var scalePreview = 20;
  var canPreview = document.getElementById('preview');
  canPreview.height = scalePreview * 2;
  canPreview.width = scalePreview * 4;
  var conPreview = canPreview.getContext('2d');
  // define color palette
  var WHITE = "#FFFFFF";
  var GRAY = "#777777";
  var GHOST = '#E3E3E3';
  var PURPLE = "#6C0089"; // Temporary: Explosive block color
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
    "#777777": "#A3A3A3",
    "#6C0089": "#BB33DF"
  };
  var BACKGROUND = WHITE;
  var BOOM = PURPLE;
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
    wipePreview: function() {
      // draw over preview pane
      conPreview.beginPath();
      conPreview.rect(0, 0, scalePreview * 4, scalePreview * 2);
      conPreview.fillStyle = BACKGROUND;
      conPreview.fill();
    },
    drawPreview: function(posiArray) {
      // draw the next game piece
      this.wipePreview();
      for (var i = 0; i < posiArray.length; i++) {
        var posi = posiArray[i];
        conPreview.beginPath();
        conPreview.rect(posi[0] * scalePreview, posi[1] * scalePreview, scalePreview, scalePreview);
        conPreview.fillStyle = "#A3A3A3";
        conPreview.fill();
      }
    },
    drawBackground: function() {
      // fill in background for entire board
      context.beginPath();
      context.rect(scale, scale, scale * cols, scale * rows);
      context.fillStyle = BACKGROUND;
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
      this.drawGhostPiece(posiArray, plusX, plusY);

      for (var i = 0; i < posiArray.length; i++) {
        posi = posiArray[i];
        if ((posi[1] + plusY) >= 0) {
          this.drawBox((posi[0] + plusX) * scale + scale, (posi[1] + plusY) * scale + scale, color);
        }
      }
    },
    drawGhostPiece: function(posiArray, plusX, plusY) {
      // draw a ghost piece, to prviews
      // determine how far down the ghost piece will be
      var yShift = 0;
      var hitBottom = false;
      var y = 0;
      for (var j = 0; j < (rows - plusY); j++) {
        yShift += 1;
        for (var i = 0; i < posiArray.length; i++) {
          posi = posiArray[i];
          y = posi[1] + plusY + yShift;
          if (y >= rows) {
            hitBottom = true;
            break;
          } else if (y > -1 && board[y][posi[0] + plusX]) {
            hitBottom = true;
            break;
          }
        }

        if (hitBottom) {
          break;
        }
      }

      // do we even need a ghost piece?
      yShift -= 1;
      if (yShift <= 0) {
        return;
      }

      // draw the ghost piece
      for (var i = 0; i < posiArray.length; i++) {
        posi = posiArray[i];
        this.drawBoxSmall((posi[0] + plusX) * scale + scale, (posi[1] + plusY + yShift) * scale + scale, GHOST);
      }
    },
    getRandomColor: function() {
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getBoomColor: function() {
      return BOOM;
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
    },
    write: function(words) {
      // write words on the canvas: START, PAUSED, GAME OVER
      context.fillStyle = "black";
      context.font = "bold " + parseInt(1.5 * scale).toString() + "px Arial";
      context.textAlign = 'center';
      context.fillText(words, canvas.width / 2, canvas.height / 2);
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
  var progress = 0;
  var score = 0;
  var boomValue = 8;
  var linesPerLevel = 12;
  var levelProgress = 0;
  var winScore = 99999;
  var gameState = false;
  var paused = false;

  // Current piece: array of points and position
  var current;
  var currentId;
  var currentX;
  var currentY;
  var currentColor;
  var nextExplodes = false;
  var currentExplodes = false;
  var nextPieces = [];

  return {
    shuffle: function(arr) {
      // randomly re-order an array
      var currentIndex = arr.length,
        temporaryValue, randomIndex;

      // While there remain elements to shuffle
      while (0 !== currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }

      return arr;
    },
    bagDrawOrder: function() {
      // return a random shuffle of 7 elements
      return this.shuffle([0, 1, 2, 3, 4, 5, 6]);
    },
    gamePlayStart: function() {
      // start or re-start each game
      progress = 0;
      score = 0;
      levelProgress = 0;
      nextExplodes = false;
      currentExplodes = false;
      this.printScore();
      this.getNextPiece();
      this.previewNext();
      this.render();
      this.flipSwitch();
      gameState = true;
    },
    unpause: function() {
      this.render();
      this.flipSwitch();
      paused = false;
    },
    pause: function() {
      this.flipSwitch();
      paused = true;
      board.write("PAUSED");
    },
    isPaused: function() {
      return paused;
    },
    flipSwitch: function() {
      // pause or unpause
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
    getNextPiece: function() {
      // mock up a quick queue of pieces
      if (nextPieces.length == 0) {
        nextPieces = this.bagDrawOrder();
      }
      currentId = nextPieces.shift();
      if (nextPieces.length == 0) {
        nextPieces = this.bagDrawOrder();
      }

      // identify piece
      current = pieces[currentId];
      currentColor = board.getRandomColor();
      currentX = Math.floor(Math.random() * (sizeX - 3));
      currentY = -2;
      // rotate piece
      var rot = Math.floor(Math.random() * 3);
      for (var i = 0; i < rot; i++) {
        this.rotate();
      }
    },
    peakNextPiece: function() {
      return nextPieces[0];
    },
    previewNext: function() {
      var next = pieces[this.peakNextPiece()];
      board.drawPreview(next);
    },
    step: function() {
      // If piece can't move unit down
      if (!this.moveIfFree(0, 1)) {
        // If piece is stuck at the top, the game is lost
        if (current.some(function(point) {
            return point[1] + currentY < 1;
          })) {
          this.endGame("GAME OVER");
        } else { // the piece is at the bottom and should stay there
          // Attach current object to the game area
          current.forEach(function(point) {
            board.setB(point[0] + currentX, point[1] + currentY, currentColor);
          });

          // Create new piece
          if (currentExplodes) {
            var lastPiece = current.slice();
            var lastX = parseInt(currentX);
            var lastY = parseInt(currentY);
          }
          this.getNextPiece();
          this.previewNext();

          // Check for full horizontal lines in game area
          var lines = [];
          var line;
          for (var i = 0; i < sizeY; i++) {
            line = board.isRowComplete(i);
            if (line) {
              lines.unshift(i);
            }
          }

          if (currentExplodes) {
            this.handleExplosion(lastPiece, lastX, lastY);
          }

          var num = lines.length;
          if (lines.length) {
            this.removeLines(lines);
            this.handleHanging(num);
          }
        }
      } else {
        this.render();
      }
    },
    removeLines: function(lines) { // Remove horizontal lines, if there are any
      // update score and check for end game
      progress += lines.length;
      score += sizeX * Math.pow(lines.length, 2);
      this.testEndGame("You Win!");
      // level progress
      levelProgress += lines.length;
      if (levelProgress >= linesPerLevel) {
        levelProgress %= linesPerLevel;
        nextExplodes = true;
        if (nextExplodes) {
          currentColor = board.getBoomColor();
        }
        this.previewNext();
        nextExplodes = false;
        currentExplodes = true;
      }
      this.printScore();

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
    },
    handleExplosion: function(lastPiece, lastX, lastY) {
      // Handle block explosions
      lastPiece.forEach(function(point) {
        [-1, 0, 1].forEach(function(offsetX) {
          var xx = point[0] + lastX + offsetX;
          [-3, -2, -1, 0, 1].forEach(function(offsetY) {
            var yy = point[1] + lastY + offsetY;
            if (yy < sizeY && yy > -1 && xx > -1 && xx < sizeX) {
              if (board.getB(xx, yy)) {
                board.setB(xx, yy, false);
                score += boomValue;
              }
            }
          });
        });
      });
      this.handleHanging(boomValue);
      currentExplodes = false;
      board.write("Boom!");
      this.testEndGame("You Win!");
    },
    handleHanging: function(val) {
      // post-explosion, remove any magical floating tiles
      var r = 0;
      var c = 0;
      var stable = this.stabilityArray();
      for (r = 0; r < sizeY; r++) {
        for (c = 0; c < sizeX; c++) {
          if (!stable[r][c] && board.getB(c, r)) {
            board.setB(c, r, false);
            score += val;
          }
        }
      }
    },
    stabilityArray: function() {
      // determine which pieces are gravitationally stable
      var r, c, cc;
      // fill stability array
      var stable = [];
      for (r = 0; r < sizeY; r++) {
        stable[r] = [];
        for (c = 0; c < sizeX; c++) {
          stable[r][c] = false;
        }
      }
      // loop through grid and find unstable elements
      for (r = sizeY - 1; r > -1; r--) {
        for (cc = 0; cc < (2 * sizeX - 1); cc++) {
          if (cc < sizeX) {
            c = cc;
          } else {
            c = 2 * sizeX - cc - 2;
          }
          // if no piece on the board, unstable
          if (!board.getB(c, r)) {
            continue;
          }
          // if on bottom row, stable. or if adj to stable
          if (r == (sizeY - 1)) {
            stable[r][c] = true;
          } else if (r < (sizeY - 1) && stable[r + 1][c]) {
            stable[r][c] = true;
          } else if (c > 0 && stable[r][c - 1]) {
            stable[r][c] = true;
          } else if (c < (sizeX - 1) && stable[r][c + 1]) {
            stable[r][c] = true;
          } else if (r > 0 && stable[r - 1][c]) {
            stable[r][c] = true;
          }
          // if now stable, set adj to stable
          if (!stable[r][c]) {
            continue;
          }
          if (r < (sizeY - 1) && board.getB(c, r + 1)) {
            stable[r + 1][c] = true;
          } else if (r > 0 && board.getB(c, r - 1)) {
            stable[r - 1][c] = true;
          } else if (c < (sizeX - 1) && board.getB(c + 1, r)) {
            stable[r][c + 1] = true;
          } else if (c > 0 && board.getB(c - 1, r)) {
            stable[r][c - 1] = true;
          }
        }
      }
      return stable;
    },
    testEndGame: function(txt) {
      if (score >= winScore) {
        score = winScore;
        this.printScore();
        this.endGame("You Win!");
      }
    },
    endGame: function(txt) {
      gameState = false;
      board.reset();
      this.flipSwitch();
      board.write(txt);
    },
    printScore: function() {
      document.getElementById('lines').innerHTML = progress;
      document.getElementById('score').innerHTML = score;
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
      gameState && (!paused && this.step());
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

// handle keyboard events
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
  }
};

// activate Start/Pause button
document.getElementById("startPause").addEventListener("click", function(e) {
  if (!tetroid.getGameState()) {
    tetroid.gamePlayStart();
  } else if (tetroid.isPaused()) {
    tetroid.unpause();
  } else {
    tetroid.pause();
  }
});

// game loop meta function, to deal with scope
function looper() {
  tetroid.loop();
}

// start the game
setInterval(looper, 400);
