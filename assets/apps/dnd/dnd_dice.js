var DnD_Dice = (function() {
  // dice options
  var button_codes = [4, 6, 8, 10, 12, 20];
  // value of current die
  var n = 12;
  // HTML elements
  var num_dice_selector = null;
  var die_label = null;
  var add_selector = null;
  var roll_button = null;
  var result_label = null;
  var dice = [];

  // random number tools
  var rand_roll = function(N) {
    return parseInt(Math.random() * N) + 1;
  };

  // handle button clicking
  var mark_die = function(nn) {
    // player marks a button
    n = parseInt(nn.split('-')[1]);

    // update the die label
    die_label.value = 'd' + n;
  };
  
  // anytime a new setting is made, clear the current result
  var clear_result = function() {
    result_label.value = '';
  };
  
  // master method to handle the roll
  var roll = function() {
    var result = 0;
    for (var i=0; i < parseInt(num_dice_selector.value); i++){
    	result += rand_roll(n);
    }
    result += parseInt(add_selector.value);
    result_label.value = result;
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
    var dnd, size, board, i;
    // draw 3x2 board of buttons
    dnd = document.getElementById("dnd_dice");
    size = parseInt(dnd.offsetWidth / 6);
    board = '<table class="dnd-dice" ' +
      'style="height:' + (4 * size) + 'px; width:' + (3 * size) + 'px;">';

    // building HTML for 6 dice options
    for (i = 0; i < 6; i += 1) {
      if (i % 3 === 0) {
        board += '<tr class="dnd-tr-row" style="background-color:#FFF;">';
      }
      board += '<td><input type="button" value="d' + button_codes[i] + '" class="dnd-tile" ' +
        'style="font-size: ' + parseInt(size / 3) +
        'px; width: ' + size + 'px; height: ' + size + 'px;" ' +
        'id="die-' + button_codes[i] + '" /></td>';
      if (i % 3 === 2) {
        board += '</tr>';
      }
    }

    // choose your roll type
    board += '<tr class="dnd-tr-row" style="background-color:#FFF;">';
    board += '<td><select id="num_dice" style="height:' + parseInt(size / 2) + 'px;">';
    board += '<option value="1" selected="selected">1d</option>';
    for (i = 2; i < 20; i += 1) {
      board += '<option value="' + i + '">' + i + 'd</option>';
    }
    board += '</select></td>';
    board += '<td><input type="text" value="d' + n + '" id="which_die" style="border:0;text-align:center;height:' +
      parseInt(size / 2) + 'px;font-size:' + parseInt(size / 4) + 'px;" size="2" readonly /></td>';
    board += '<td><select id="add_value" style="height:' + parseInt(size / 2) + 'px;">';
    board += '<option value="0" selected="selected">+0</option>';
    for (i = 1; i < 20; i += 1) {
      board += '<option value="' + i + '">+' + i + '</option>';
    }
    board += '</select></td>';
    board += '</tr>';

    // roll!
    board += '<tr class="dnd-tr-row" style="background-color:#FFF;"><td></td>';
    board += '<td><input type="button" value="Roll!" id="roll" style="height:' + parseInt(size / 2) + 'px;"/></td>';
    board += '<td></td></tr>';

    // result
    board += '<tr class="dnd-tr-row" style="background-color:#FFF;"><td></td>';
    board += '<td><input type="text" value=" " id="result" style="border:0;text-align:center;height:' +
      size + 'px;width:' + size + 'px;font-size:' + parseInt(size / 2) + 'px;" size="2" readonly /></td>';
    board += '<td></td></tr>';

    board += '</table>';
    dnd.innerHTML = board;
    
    // find all elements
    num_dice_selector = document.getElementById('num_dice');
    die_label = document.getElementById('which_die');
    add_selector = document.getElementById('add_value');
    roll_button = document.getElementById('roll');
    result_label = document.getElementById('result');
  };

  var attach_listeners = function() {
    var i = 0;
    // attach event listeners to dice choice buttons
    for (i = 0; i < 6; i += 1) {
      dice[i] = document.getElementById('die-' + button_codes[i].toString());
      dice[i].addEventListener("click", function(e) {
        mark_die(this.id);
        clear_result();
      });
      dice[i].addEventListener('transitionend', removeRed);
    }
    
    // attach event listeners to number of dice selector
    num_dice_selector.addEventListener("click", function(e) {
    	clear_result();
    });
    
    // attach event listeners to adder selector
    add_selector.addEventListener("click", function(e) {
    	clear_result();
    });
    
    // attach event listeners to ROLL button
    roll_button.addEventListener("click", function(e) {
    	roll();
    });
  };

  return {
    init: function() {
      // draw HTML board and attach event listeners
      draw_board();
      attach_listeners();
    }
  };
}());


DnD_Dice.init();
