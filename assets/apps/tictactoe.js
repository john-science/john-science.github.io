// global vars (yuck)
grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
player = 1; // X=>1, O=>5
player_moves_first = true;
number_of_moves = 0;
buttons = []; // HTML buttons
score_you = 0;
score_comp = 0;
game_restart = false;

set_player_label();
init_board();

// draw HTML board and attach event listeners
function init_board() {
  // draw 3x3 board of buttons
  ttt = document.getElementById("tictactoe");
  size = parseInt(ttt.offsetWidth / 6);
  board = '<div style="text-align:center; height:' + (3 * size).toString() + 'px;">'

  // building HTML for board
  for (i = 0; i < 9; i++) {
    board += '<input type="button" style="padding:0px; margin:0px; -webkit-appearance: none; font-size: ' + parseInt(2 * size / 3).toString() + 'px; width: ' + size.toString() + 'px; height: ' + size.toString() + 'px" id="cell-' + i.toString() + '" />';
    if (i % 3 == 2) board += '<br />';
  }
  board += '</div>';
  ttt.innerHTML = board;

  // attach event listeners to buttons
  for (i = 0; i < 9; i++) {
    buttons[i] = document.getElementById('cell-' + i.toString());
    buttons[i].addEventListener("click", function(e) {
      mark_square(this.id);
    });
  }
}

// handle button clicking
function mark_square(nn) {
  // special case: just restart the game
  if (game_restart == true) {
    game_restart = false;
    new_game();
    set_player_label();
    return
  }

  // player marks a button
  n = parseInt(nn.split('-')[1]);
  if (grid[n] != 0) return;
  buttons[n].value = player == 1 ? 'X' : 'O';
  grid[n] = player;
  number_of_moves++;
  end_game_test(n);

  // if valid, the AI moves
  if (number_of_moves > 0 && number_of_moves < 8) {
    if (number_of_moves == 1) {
      if (player_moves_first) {
        ai_move();
      }
    } else {
      if (!game_restart) {
        ai_move();
      }
    }
  }
}

// test if game is over
function has_won() {
  var way = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
  for (var i = 0; i < 24; i++)
    way[i] = grid[way[i]];
  for (i = 0; i < 24; i += 3) {
    if (way[i] == 0) continue;
    if (way[i] == way[i + 1] && way[i] == way[i + 2])
      return way[i];
  }
  return -1;
}

// report win/loss/draw in marquee
function handle_endgame(winner) {
  var txt = 'Draw Game';
  if (winner == 1 && player_moves_first) {
    txt = 'You won!';
  } else if (winner == 5 && !player_moves_first) {
    txt = 'You won!';
  } else if (winner > -1) txt = 'You lost.';
  document.getElementById('marquee').innerHTML = txt;

  update_scoreboard(winner);
  game_restart = true;
}

// test if the game is over, and handle that
function end_game_test(z) {
  if (has_won() == player) {
    handle_endgame(player);
  } else if (number_of_moves == 8) {
    handle_endgame(-1);
  } else {
    player = player == 1 ? 5 : 1;
  }
}

// for resetting game, but no on initial load
function new_game() {
  grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  player = 1;
  number_of_moves = 0;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].value = ' ';
  }
  player_moves_first = !player_moves_first;
  if (!player_moves_first) ai_move();
}

// Mostly Stupid AI
function ai_move() {
  var center = 4;
  var corners = [0, 2, 6, 8];
  var edges = [1, 3, 5, 7];
  var x = 0;
  if (number_of_moves == 0) {
    x = corners[Math.floor(Math.random() * 4)];
  } else if (number_of_moves == 1) {
    if (grid[center] == 0) {
      x = center;
    } else {
      x = corners[Math.floor(Math.random() * 4)];
    }
  } else {
    // check if we can win
    x = find_win_posi(player);
    if (x == -1) { // we can't win
      // can the other player win?
      x = find_win_posi(player == 1 ? 5 : 1);
      if (x == -1) { // they can't
        // move randomly
        x = Math.floor(Math.random() * 9);
        while (grid[x] != 0) {
          x = Math.floor(Math.random() * 9);
        }
      }
    }
  }
  grid[x] = player;
  buttons[x].value = player == 1 ? 'X' : 'O';
  number_of_moves++;
  end_game_test(x);
}

/** find if a position on the board can be a win for the given player 'v'
    Note, this can be used to find a place to move, or a place that
    needs to be defended.
*/
function find_win_posi(v) {
  var posi = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
  var way = [0, 1, 2, 0, 3, 6, 0, 4, 8, 1, 4, 7, 2, 4, 6, 2, 5, 8, 3, 4, 5, 6, 7, 8];
  for (var i = 0; i < 24; i++)
    way[i] = grid[way[i]];
  for (i = 0; i < 24; i += 3) {
    if ((way[i] + way[i + 1] + way[i + 2]) == 2 * v) {
      if (way[i] == 0) {
        return posi[i];
      } else if (way[i + 1] == 0) {
        return posi[i + 1];
      } else {
        return posi[i + 2];
      }
    }
  }
  return -1;
}

// reset player ID label
function set_player_label() {
  document.getElementById("marquee").innerHTML = player_moves_first ? 'You are X.' : 'You are O.';
}

// update scoreboard, given winner user
function update_scoreboard(pid) {
  if (pid <= 0) {
    score_you += 5;
    score_comp += 5;
  } else if ((player_moves_first && pid == 1) || (!player_moves_first && pid == 5)) {
    score_you += 10;
  } else {
    score_comp += 10;
  }
  document.getElementById("score_you").innerHTML = score_you.toString();
  document.getElementById('score_comp').innerHTML = score_comp.toString();
}
