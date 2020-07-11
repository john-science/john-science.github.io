var CalCalc = (function() {
  // user parameters
  var weight_lbs = 140.0;
  var age = 42.0;
  var sex = 0;

  // constants
  var lb2kg = 0.4535924;

  // HTML elements
  var user_weight = null;
  var user_age = null;
  var user_female = null;
  var user_male = null;
  var user_act = null;
  var result_label = null;

  // anytime a new setting is made, re-calculate the cal/min rate
  var calc_rate = function(e) {
    var act = user_act.value;
    var rate = 1;
    if (act == 'calithenics') {
      rate = 4;
    } else if (act == 'running') {
      rate = 8.3 * 0.0175 * user_weight.value * lb2kg;
    } else if (act == 'stretching') {
      rate = 1;
    } else if (act == 'walking') {
      rate = 3;
    } else if (act == 'yoga') {
      rate = 4;
    }
    result_label.value = rate.toFixed(1);
  };

  var draw_calc = function() {
    var calc = document.getElementById("cal_calc");
    var txt = '<table class="cal_table">';
    txt += '<tr><td>Weight: <span style="display:inline-block;"><input type="text" id="weight" name="weight" value="155" size="4" /> (<span id="weight_units">lbs</span>)</span><br></td></tr>';
    txt += '<tr><td>Age: &nbsp; &nbsp; &nbsp;<span style="display:inline-block;"><input type="text" id="age" name="age" value="42" size="4" /> (yrs)</span><br></td><tr>';
    txt += '<tr><td><input type="radio" id="sex0" name="sex" value="0" checked>Female &nbsp;<input type="radio" id="sex1" name="sex" value="1">Male</td></tr>';
    txt += '<tr><td><label for="acts">Choose an activity:</label>';
    txt += '<select name="acts" id="acts">';
    txt += '<option value="calithenics">calithenics</option>';
    txt += '<option value="running" selected>running</option>';
    txt += '<option value="stretching">stretching</option>';
    txt += '<option value="walking">walking</option>';
    txt += '<option value="yoga">yoga</option>';
    txt += '</select></td></tr>';
    txt += '<tr><td><span id="details"></span></td></tr>';
    txt += '<tr><td>Calories/minutes: <input type="text" id="cals" name="cals" value="" size="5" readonly="readonly" class="quick" /></td></tr>';
    txt += '</table>';
    calc.innerHTML = txt;

    // find HTML elements
    user_weight = document.getElementById('weight');
    user_age = document.getElementById('age');
    user_female = document.getElementById('sex0');
    user_male = document.getElementById('sex1');
    user_act = document.getElementById('acts');
    result_label = document.getElementById('cals');
  };

  var attach_listeners = function() {
    user_weight.onblur = calc_rate;
    user_age.onblur = calc_rate;
    user_female.onblur = calc_rate;
    user_male.onblur = calc_rate;
    user_act.onblur = calc_rate;
  };

  return {
    init: function() {
      draw_calc();
      attach_listeners();
      calc_rate();
    }
  };
}());


CalCalc.init();
