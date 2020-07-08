var Cal_Calc = (function() {
  // dice options
  var button_codes = [4, 6, 8, 10, 12, 20];
  // value of current die
  var n = 20;
  // HTML elements
  var num_dice_selector = null;
  var result_label = null;

  // anytime a new setting is made, clear the current result
  var clear_result = function() {
    result_label.value = '';
  };

  var draw_board = function() {
    // TODO
  };

  // css love, to clean-up after transitions
  var debounce = function(e) {
    if (e.propertyName === 'transform') {
      this.classList.remove('bounce');
    }
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

    }
    var clicked = document.getElementById('die-' + n);
    clicked.classList.remove('die');
    clicked.classList.add('die-clicked');

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

    // add some CSS love to bounce and de-bounce the result label on roll
    result_label.addEventListener('transitionend', debounce);
  };

  return {
    init: function() {
      // draw HTML board and attach event listeners
      draw_board();
      attach_listeners();
    }
  };
}());


Cal_Calc.init();
