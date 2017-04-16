var tileSet = document.createElement("img");
tileSet.src = "/assets/apps/aac/Lemunde_16x16.png";

var options = {
    layout: "tile",
    tileWidth: 16,
    tileHeight: 16,
    tileSet: tileSet,
    tileMap: {
        "@": [0, 64],  /** [X, Y] */
        ".": [48, 0],
        "¤": [32, 144],
        "!": [48, 144],
        "a": [96, 32],
        "b": [112, 128]
    },
    width: 50,  // constant
    height: 25,  // constant
    tileColorize: true
}

var difficulty = {0: {boxMin: 5, boxMax: 10, pedMin: 1, pedMax: 4, dugPer: 0.45},
                  1: {boxMin: 7, boxMax: 14, pedMin: 1, pedMax: 7, dugPer: 0.4},
                  2: {boxMin: 9, boxMax: 18, pedMin: 2, pedMax: 10, dugPer: 0.35}}

ROT.DEFAULT_WIDTH = 50;
ROT.DEFAULT_HEIGHT = 25;


var Game = {
  display: null,
  map: {},
  engine: null,
  level: 1,
  player: null,
  numPedros: 1,
  numBoxes: 1,
  pedros: [],
  ananas: null,
  next: false,
  symbols: {pedro: "P", room: ".", player: "@", box: "¤", pineapple: "!"},
  diff: 1,
  diffSet: {},

  init: function() {
    if (this.level === 1) {
      this.display = new ROT.Display(options);
      var gameDiv = document.createElement('div');
      gameDiv.className += " center-bar";
      gameDiv.appendChild(this.display.getContainer());

      var infoLine = document.createElement('p');
      infoLine.id = "infoBox";
      infoLine.textContent = "Level: ";
      var levelBox = document.createElement('span');
      levelBox.id = "level";
      levelBox.textContent = "1";
      infoLine.appendChild(levelBox);
      gameDiv.appendChild(infoLine);

      var alertBox = document.createElement('p');
      alertBox.id = "story";
      alertBox.textContent = "You enter Pedro's shop. Press Space or Enter to search a box.";
      gameDiv.appendChild(alertBox);
      document.body.appendChild(gameDiv);
      this.diff = parseInt(document.getElementById('diff').value);
      this.diffSet = difficulty[this.diff];
      this.numPedros = this.diffSet['pedMin'];
      this.numBoxes = this.diffSet['boxMin'];
    } else {
      this.numBoxes = this.numBoxes >= this.diffSet['boxMax'] ? this.diffSet['boxMax'] : this.numBoxes + 1;
      this.numPedros = this.numPedros >= this.diffSet['pedMax'] ? this.diffSet['pedMax'] : this.diffSet['pedMin'] + Math.floor(Game.level / 4);
      this.pedros = [];
    }

    this.map = {};
    this.display.clear();
    this._generateMap();

    var scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    for (var i = 0; i < this.pedros.length; i++) {
      scheduler.add(this.pedros[i], true);
    }

    this.engine = new ROT.Engine(scheduler);
    this.engine.start();
  },

  alert: function(txt) {
    document.getElementById('story').textContent = txt;
  },

  _generateMap: function() {
    var digger = new ROT.Map.Digger();
    digger._options.dugPercentage = this.diffSet['dugPer'];
    var freeCells = [];

    var digCallback = function(x, y, value) {
      if (value) {
        return;
      }

      var key = x + "," + y;
      this.map[key] = [this.symbols.room, "gray"];
      freeCells.push(key);
    }
    digger.create(digCallback.bind(this));

    this._generateBoxes(freeCells);
    this._drawWholeMap();
    this.player = this._createBeing(Player, freeCells);

    var i = 0;
    while (i < this.numPedros) {
      this.pedros.push(this._createBeing(Pedro, freeCells));
      i += 1;
    }
  },

  _createBeing: function(what, freeCells) {
    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    return new what(x, y);
  },

  _generateBoxes: function(freeCells) {
    for (var i = 0; i < this.numBoxes; i++) {
      var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      var key = freeCells.splice(index, 1)[0];
      this.map[key] = [this.symbols.box, "rgba(250, 230, 100, 0.25)"];
      if (!i) {
        /* first box contains an ananas */
        this.ananas = key;
      }
    }
  },

  _drawWholeMap: function() {
    for (var key in this.map) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      this.display.draw(x, y, ...this.map[key]);
    }

  }
};

var Player = function(x, y) {
  this._x = x;
  this._y = y;
  this._draw();
}

Player.prototype.getSpeed = function() {
  return 100;
}
Player.prototype.getX = function() {
  return this._x;
}
Player.prototype.getY = function() {
  return this._y;
}

Player.prototype.act = function() {
  Game.engine.lock();
  window.addEventListener("keydown", this);
}

Player.prototype.handleEvent = function(e) {
  var code = e.keyCode;
  if (Game.next) {
      Game.next = false;
      Game.init();
  }
  if (code === 13 || code === 32) {
    this._checkBox();
    return;
  }

  var keyMap = {};
  keyMap[38] = 0;
  keyMap[33] = 1;
  keyMap[39] = 2;
  keyMap[34] = 3;
  keyMap[40] = 4;
  keyMap[35] = 5;
  keyMap[37] = 6;
  keyMap[36] = 7;

  /* one of numpad directions? */
  if (!(code in keyMap)) {
    return;
  }

  /* Is there a free space? */
  var dir = ROT.DIRS[8][keyMap[code]];
  var newX = this._x + dir[0];
  var newY = this._y + dir[1];
  var newKey = newX + "," + newY;
  if (!(newKey in Game.map)) {
    return;
  }

  Game.display.draw(this._x, this._y, ...Game.map[this._x + "," + this._y]);
  this._x = newX;
  this._y = newY;
  this._draw();
  window.removeEventListener("keydown", this);
  Game.alert("");
  Game.engine.unlock();
}

Player.prototype._draw = function() {
  Game.display.draw(this._x, this._y, [Game.symbols.room, Game.symbols.player], "rgba(100, 255, 100, 0.25)");
}

var successText = ['You found one!', 'You found a pineapple!', 'You found an ananas!',
                   'Mmm... delicious pineapple.', 'You find one... and it is delicious.',
                   'You find an ananas and move on to the next level of the shop.'];

Player.prototype._checkBox = function() {
  if (this._x < 0 || this._y < 0) {
    // TODO: Testing!
    return;
  }
  var key = this._x + "," + this._y;
  if (Game.map[key][0] != Game.symbols.box) {
    Game.alert("There is no box here.");
  } else if (key === Game.ananas) {
    if (Game.level === 20) {
      Game.alert("Hooray! You found all the ananas and won the game!");
      Game.engine.lock();
    } else {
      Game.level += 1;
      document.getElementById('level').textContent = Game.level.toString();
      Game.alert(successText[Math.floor(Math.random() * successText.length)]);
      /** re-draw board as all pineapples */
      for (var key in Game.map) {
        if (Game.map[key][0] !== Game.symbols.room) {continue;}
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        Game.display.draw(x, y, Game.symbols.pineapple, "rgba(255, 230, 0, 0.75)");
      }
      Game.next = true;
      this._x = -2;
      this._y = -2;
    }
  } else {
    Game.map[key] = [Game.symbols.box, "rgba(0, 0, 0, 0.5)"];
    Game.alert("This box is empty.");
  }
}

var Pedro = function(x, y) {
  this._x = x;
  this._y = y;
  this._memory = 2 + Game.diff + Math.floor(Game.level / 5); /** How long will Pedro keep following you, after he loses you? */
  this._lastSaw = 0; /** How recently did Pedro see you? */
  this._mobility = 0.75; /** 0.0 will always try to walk, 1.0 will never walk. */
  this._color = "rgba(" + Math.floor(100 + Math.random() * 155).toString() + ", 100, 100, 0.25)";
  this._symbol = 'ab'[Math.floor(Math.random() * 2)];
  this._draw();
}

Pedro.prototype.getLevel = function() {
  return this._lvl;
}
Pedro.prototype.getSpeed = function() {
  return 100;
}

/**
Bresenham-based LOS algo.
http://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
 */
Pedro.prototype.playerInLOS = function() {
  var pedX = this._x;
  var pedY = this._y;

  var playerX = Game.player.getX();
  var playerY = Game.player.getY();

  var deltaX = Math.abs(pedX - playerX);
  var deltaY = Math.abs(pedY - playerY);

  var sx = (pedX < playerX) ? 1 : -1;
  var sy = (pedY < playerY) ? 1 : -1;
  var err = deltaX - deltaY;

  var newKey = pedX + "," + pedY;

  while (pedX !== playerX || pedY !== playerY) {
    if (!(newKey in Game.map)) {
      return false;
    }

    var e2 = 2 * err;

    if (e2 > -deltaY) {
      err -= deltaY;
      pedX += sx;
    }
    if (e2 < deltaX) {
      err += deltaX;
      pedY += sy;
    }

    newKey = pedX + "," + pedY;
  }

  return true;
}

Pedro.prototype.act = function() {
  var x = Game.player.getX();
  var y = Game.player.getY();
  var dirs = [-1, 0, 1];
  this._lastSaw -= 1;

  /** Handle path-finding. End game, if Pedro within one cell. */
  var passableCallback = function(x, y) {
    return (x + "," + y in Game.map);
  }
  var astar = new ROT.Path.AStar(x, y, passableCallback, {
    topology: 4
  });

  var path = [];
  var pathCallback = function(x, y) {
    path.push([x, y]);
  }
  astar.compute(this._x, this._y, pathCallback);

  path.shift();
  if (path.length <= 1) {
    Game.engine.lock();
    Game.alert("Game over - you were caught by Pedro!");
    Game.level = 1;
    
    var lastElement = document.getElementById('story');
    var butDiv = document.createElement('div');
    butDiv.className += ' centered';
    var restartButton = document.createElement('input');
    restartButton.id = 'restart';
    restartButton.type = 'submit';
    restartButton.value = 'Restart';
    restartButton.className += ' btn';
    butDiv.appendChild(restartButton);
    lastElement.appendChild(butDiv);
    
    /** Event Handler for Restarting Game */
    document.getElementById('restart').addEventListener("click", function restart(event) {
      document.getElementById('restart').removeEventListener("click", restart);
      window.location.reload();
    });
  }

  /** Pedro shouldn't move until he can SEE the player.
      OR, if he saw the player recently, he can try
      and follow them for a little bit.
   */
  var inLOS = this.playerInLOS();
  if (this._lastSaw <= 0) {
    if (!inLOS) {
      /** If the player is out of sight, Pedro
          will wander around a bit.
       */
      if (Math.random() > this._mobility) {
        for (var i=0; i < 4; i++) {  /** hacky: easier than finding all open adjacent cells */
          x = this._x + dirs[Math.floor(Math.random() * 3)];
          y = this._y + dirs[Math.floor(Math.random() * 3)];
          if ((x + "," + y) in Game.map) {
            Game.display.draw(this._x, this._y, ...Game.map[this._x + "," + this._y]);
            this._x = x;
            this._y = y;
            this._draw();
            break;
          }
        }
      }

      return;
    }
  }
  /** Pedro saw you! He'll remember that, for a while. */
  if (inLOS) {
    this._lastSaw = this._memory;
  }

  /** Lastly, if Pedro can chase you, he will. */
  x = path[0][0];
  y = path[0][1];
  Game.display.draw(this._x, this._y, ...Game.map[this._x + "," + this._y]);
  this._x = x;
  this._y = y;
  this._draw();
}


Pedro.prototype._draw = function() {
  Game.display.draw(this._x, this._y, this._symbol, this._color);
}


/** Event Handler for Starting a New Game */
document.getElementById('start').addEventListener("click", function start(event) {
  document.getElementById('start').removeEventListener("click", start);
  var radios = document.getElementsByName('difficulty');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      /** do whatever you want with the checked radio */
      document.getElementById('diff').value = radios[i].value;
      /** only one radio can be logically checked, don't check the rest */
      break;
    }
  }
  document.getElementById("intro").remove();
  Game.init();
});
