var DnD_Dice = (function() {
  var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // HTML elements
  var buttons = [];
  var marquee = document.getElementById("marquee");

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
  
  // random number tools
  var randRoll = function(N) {
    return parseInt(Math.random() * N) + 1;
  };

  // handle button clicking
  var mark_square = function(nn) {

    // player marks a button
    n = parseInt(nn.split('-')[1]);
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
    var button_codes = [4, 6, 8, 10, 12, 20];
    var ttt, size, board, i;
    // draw 3x3 board of buttons
    ttt = document.getElementById("dnd_dice");
    size = parseInt(ttt.offsetWidth / 6);
    board = '<table class="ttt-board" ' +
      'style="height:' + (4 * size) + 'px; width:' + (3 * size) + 'px;">';

    // building HTML for 6 dice options
    for (i = 0; i < 6; i += 1) {
      if (i % 3 === 0) {
        board += '<tr class="ttt-tr-row">';
      }
      board += '<td><input type="button" value="D' + button_codes[i] + '" class="ttt-tile" ' +
        'style="font-size: ' + parseInt(size / 3) +
        'px; width: ' + size + 'px; height: ' + size + 'px;" ' +
        'id="cell-' + i + '" /></td>';
      if (i % 3 === 2) {
        board += '</tr>';
      }
    }
    
    // choose your roll type
    board += '<tr class="ttt-tr-row">';
    board += '<td><select id="num_dice" style="height:' + parseInt(size / 2) + 'px;">';
    for (i = 1; i < 20; i += 1) {
      board += '<option value="' + i + '">' + i + 'd</option>';
    }
    board += '</select></td>';
    board += '<td>D20</td>';
    board += '<td><select id="add_value" style="height:' + parseInt(size / 2) + 'px;">';
    for (i = 1; i < 20; i += 1) {
      board += '<option value="' + i + '">+' + i + '</option>';
    }
    board += '</select></td>';
    board += '</tr>';
    
    // roll!
    board += '<tr class="ttt-tr-row"><td></td>';
    board += '<td><input type="button" value="Roll!" id="roll" style="height:' + parseInt(size / 2) + 'px;"/></td>';
    board += '<td></td></tr>';
    
    // result
    board += '<tr class="ttt-tr-row"><td></td>';
    board += '<td><input value="13" id="result" style="border:0;text-align:center;height:' + 
    					size + 'px;font-size:' + parseInt(size / 3) + 'px;" size="2" readonly /></td>';
    board += '<td></td></tr>';
    
    board += '</table>';
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
