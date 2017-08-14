var DnD_Dice = (function() {
  var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var player = 1; // X=>1, O=>5
  var player_moves_first = true;
  var number_of_moves = 0;
  var score_you = 0;
  var score_comp = 0;
  var game_restart = false;
  // HTML elements
  var buttons = [];
  var marquee = document.getElementById("marquee");
  var ttt_score_you = document.getElementsByClassName("ttt-score-you")[0];
  var ttt_score_comp = document.getElementsByClassName("ttt-score-comp")[0];


  // reset player ID label
  var set_player_label = function() {
    marquee.textContent = player_moves_first ? 'You are X.' : 'You are O.';
  };

  // update scoreboard, given winner user
  var update_scoreboard = function(pid) {
    var update_you = false;
    var update_comp = false;

    if (pid <= 0) {
      score_you += 5;
      score_comp += 5;
      update_you = true;
      update_comp = true;
    } else if ((player_moves_first && pid === 1) || (!player_moves_first && pid === 5)) {
      update_you = true;
      score_you += 10;
    } else {
      update_comp = true;
      score_comp += 10;
    }
    // update values and do a little css bounce
    if (update_you) {
      document.getElementById("score_you").textContent = score_you.toString();
      ttt_score_you.classList.add("bounce-green");
    }
    if (update_comp) {
      document.getElementById("score_comp").textContent = score_comp.toString();
      ttt_score_comp.classList.add("bounce-green");
    }
  };

  // test if game is over
  var has_won = function() {
    var way = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < 24; i += 1)
      way[i] = grid[way[i]];
    for (var i = 0; i < 24; i += 3) {
      if (way[i] === 0) continue;
      if (way[i] === way[i + 1] && way[i] === way[i + 2])
        return way[i];
    }
    return -1;
  };

  // CSS love when game is won
  var bounce_tiles = function(winner) {
    console.log('winner: ' + winner);
    var way = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
    var i, j;
    if (winner < 0) return;
    for (i = 0; i < 24; i += 3) {
      if (grid[way[i]] === winner && grid[way[i + 1]] === winner && grid[way[i + 2]] === winner) {
        for (j = i; j < i + 3; j += 1) {
          buttons[way[j]].classList.add("bounce-red");
        }
        return;
      }
    }
  };

  // report win/loss/draw in marquee
  var handle_endgame = function(winner) {
    var txt = 'Draw Game';
    if (winner === 1 && player_moves_first) {
      txt = 'You won!';
    } else if (winner === 5 && !player_moves_first) {
      txt = 'You won!';
    } else if (winner > -1) txt = 'You lost.';
    marquee.textContent = txt;

    update_scoreboard(winner);
    bounce_tiles(winner);
    game_restart = true;
  };

  // test if the game is over, and handle that
  var end_game_test = function(z) {
    if (has_won() === player) {
      handle_endgame(player);
    } else if (number_of_moves === 8) {
      handle_endgame(-1);
    } else {
      player = player === 1 ? 5 : 1;
    }
  };

  // for resetting game, but no on initial load
  var new_game = function() {
    var i = 0;
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player = 1;
    number_of_moves = 0;
    for (i = 0; i < buttons.length; i += 1) {
      buttons[i].value = ' ';
    }
    player_moves_first = !player_moves_first;
    if (!player_moves_first) ai_move();
  };

  // Mostly Stupid AI
  var ai_move = function() {
    var center = 4;
    var corners = [0, 2, 6, 8];
    var edges = [1, 3, 5, 7];
    var x = 0;
    if (number_of_moves === 0) {
      x = corners[Math.floor(Math.random() * 4)];
    } else if (number_of_moves === 1) {
      if (grid[center] === 0) {
        x = center;
      } else {
        x = corners[Math.floor(Math.random() * 4)];
      }
    } else {
      // check if we can win
      x = find_win_posi(player);
      if (x === -1) { // we can't win
        // can the other player win?
        x = find_win_posi(player === 1 ? 5 : 1);
        if (x === -1) { // they can't
          // move randomly
          x = Math.floor(Math.random() * 9);
          while (grid[x] != 0) {
            x = Math.floor(Math.random() * 9);
          }
        }
      }
    }
    grid[x] = player;
    buttons[x].value = player === 1 ? 'X' : 'O';
    number_of_moves += 1;
    end_game_test(x);
  };

  /** find if a position on the board can be a win for the given player 'v'
      Note, this can be used to find a place to move, or a place that
      needs to be defended.
  */
  var find_win_posi = function(v) {
    var posi = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
    var way = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < 24; i += 1)
      way[i] = grid[way[i]];
    for (i = 0; i < 24; i += 3) {
      if ((way[i] + way[i + 1] + way[i + 2]) === 2 * v) {
        if (way[i] === 0) {
          return posi[i];
        } else if (way[i + 1] === 0) {
          return posi[i + 1];
        } else {
          return posi[i + 2];
        }
      }
    }
    return -1;
  };

  // handle button clicking
  var mark_square = function(nn) {
    // special case: just restart the game
    if (game_restart) {
      game_restart = false;
      new_game();
      set_player_label();
      return
    }

    // player marks a button
    n = parseInt(nn.split('-')[1]);
    if (grid[n] != 0) return;
    buttons[n].value = player === 1 ? 'X' : 'O';
    grid[n] = player;
    number_of_moves += 1;
    end_game_test(n);

    // if valid, the AI moves
    if (number_of_moves > 0 && number_of_moves < 8) {
      if (number_of_moves === 1) {
        if (player_moves_first) {
          ai_move();
        }
      } else {
        if (!game_restart) {
          ai_move();
        }
      }
    }
  };

  // after the transition, rever the CSS
  var removeRed = function(e) {
    if (e.propertyName === 'transform') {
      this.classList.remove('bounce-red');
    }
  };
  var removeGreen = function(e) {
    if (e.propertyName === 'transform') {
      this.classList.remove('bounce-green');
    }
  };

  var draw_board = function() {
    var ttt, size, board, i;
    // draw 3x3 board of buttons
    ttt = document.getElementById("dnd_dice");
    size = parseInt(ttt.offsetWidth / 10);
    board = '<table class="ttt-board" ' +
      'style="height:' + (3 * size) + 'px; width:' + (2 * size) + 'px;">';

    // building HTML for board
    for (i = 0; i < 6; i += 1) {
      if (i % 2 === 0) {
        board += '<tr class="ttt-tr-row">';
      }
      board += '<td><input type="button" value=" " class="ttt-tile" ' +
        'style="font-size: ' + size +
        'px; width: ' + size + 'px; height: ' + size + 'px;" ' +
        'id="cell-' + i + '" /></td>';
      if (i % 2 === 1) {
        board += '</tr>';
      }
    }
    board += '</table><br></br><div style="text-align:center;"><input type="button" value="Roll"></div>';
    board += '<table class="ttt-board" style="width:' + (2 * size) + ';"><tr><td class="ttt-score-you">d1 <span id="score_you">0</span></td>';
    board += '<td class="ttt-score-comp"> + <span id="score_comp">0</span></td><td>=0</td></tr></table>';
    ttt.innerHTML = board;
  };

  var attach_listeners = function() {
    var i = 0;
    // attach event listeners to buttons
    for (i = 0; i < 9; i += 1) {
      buttons[i] = document.getElementById('cell-' + i.toString());
      buttons[i].addEventListener("click", function(e) {
        mark_square(this.id);
      });
      buttons[i].addEventListener('transitionend', removeRed);
    }
    // attach event listeners to scores
    ttt_score_you.addEventListener('transitionend', removeGreen);
    ttt_score_comp.addEventListener('transitionend', removeGreen);
  };

  return {
    init: function() {
      // draw HTML board and attach event listeners
      //set_player_label();
      draw_board();
      //attach_listeners();
    }
  };
}());


DnD_Dice.init();
