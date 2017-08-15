var DnD_Dice = (function() {
  var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // HTML elements
  var buttons = [];
  
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
    var dnd, size, board, i;
    // draw 3x3 board of buttons
    dnd = document.getElementById("dnd_dice");
    size = parseInt(dnd.offsetWidth / 6);
    board = '<table class="dnd-board" ' +
      'style="height:' + (4 * size) + 'px; width:' + (3 * size) + 'px;">';

    // building HTML for 6 dice options
    for (i = 0; i < 6; i += 1) {
      if (i % 3 === 0) {
        board += '<tr class="dnd-tr-row">';
      }
      board += '<td><input type="button" value="D' + button_codes[i] + '" class="dnd-tile" ' +
        'style="font-size: ' + parseInt(size / 3) +
        'px; width: ' + size + 'px; height: ' + size + 'px;" ' +
        'id="cell-' + i + '" /></td>';
      if (i % 3 === 2) {
        board += '</tr>';
      }
    }
    
    // choose your roll type
    board += '<tr class="dnd-tr-row">';
    board += '<td><select id="num_dice" style="height:' + parseInt(size / 2) + 'px;">';
    board += '<option value="1" selected="selected">1d</option>';
    for (i = 2; i < 20; i += 1) {
      board += '<option value="' + i + '">' + i + 'd</option>';
    }
    board += '</select></td>';
    board += '<td><input type="text" value="D20" id="which_dice" style="border:0;text-align:center;height:' + 
    					parseInt(size / 2) + 'px;font-size:' + parseInt(size / 4) + 'px;" size="2" readonly /></td>';
    board += '<td><select id="add_value" style="height:' + parseInt(size / 2) + 'px;">';
    board += '<option value="1" selected="selected">+1</option>';
    for (i = 2; i < 20; i += 1) {
      board += '<option value="' + i + '">+' + i + '</option>';
    }
    board += '</select></td>';
    board += '</tr>';
    
    // roll!
    board += '<tr class="dnd-tr-row"><td></td>';
    board += '<td><input type="button" value="Roll!" id="roll" style="height:' + parseInt(size / 2) + 'px;"/></td>';
    board += '<td></td></tr>';
    
    // result
    board += '<tr class="dnd-tr-row"><td></td>';
    board += '<td><input type="text" value="13" id="result" style="border:0;text-align:center;height:' + 
    					size + 'px;font-size:' + parseInt(size / 3) + 'px;" size="2" readonly /></td>';
    board += '<td></td></tr>';
    
    board += '</table>';
    dnd.innerHTML = board;
  };

  var attach_listeners = function() {
    var i = 0;
    // attach event listeners to buttons
    for (i = 0; i < 6; i += 1) {
      buttons[i] = document.getElementById('cell-' + i.toString());
      buttons[i].addEventListener("click", function(e) {
        mark_square(this.id);
      });
      buttons[i].addEventListener('transitionend', removeRed);
    }
    // attach event listeners to scores
    dnd_score_you.addEventListener('transitionend', removeGreen);
    dnd_score_comp.addEventListener('transitionend', removeGreen);
  };

  return {
    init: function() {
      // draw HTML board and attach event listeners
      draw_board();
      //attach_listeners();
    }
  };
}());


DnD_Dice.init();
