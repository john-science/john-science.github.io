var CalCalc = (function() {
  // constants
  var lb2kg = 0.4535924;

  // check browser support
  var hasStorage = false;
  if (typeof(Storage) !== "undefined") {
    hasStorage = true;
  }

  // HTML elements
  var user_weight = null;
  var user_age = null;
  var user_sex = null;
  var user_act = null;
  var details = null;
  var result_label = null;

  // anytime a new setting is made, re-calculate the cal/min rate
  var calc_rate = function(e) {
    var act = user_act.value;
    var met = document.getElementById('met').value || 2.0;
    var rate = 1;
    if (act == 'calithenics' || act == 'running') {
      rate = met * 0.0175 * parseFloat(user_weight.value) * lb2kg;
    } else if (act == 'stretching') {
      rate = 1;
    } else if (act == 'walking') {
      rate = 3;
    } else if (act == 'yoga') {
      rate = 4;
    }
    result_label.value = rate.toFixed(1);

    // throw form fields into storage
    if (hasStorage) {
      localStorage.setItem("user_weight", user_weight.value);
      localStorage.setItem("user_age", user_age.value);
      localStorage.setItem("user_sex", user_sex.options[user_sex.selectedIndex].value);
      localStorage.setItem("user_act", user_act.options[user_act.selectedIndex].value);
    }
  };

  var load_from_storage = function() {
    if (!hasStorage) {
      return;
    }

    user_weight.value = localStorage.getItem("user_weight") || "130";
    user_age.value = localStorage.getItem("user_age") || "42";
    user_sex.value = localStorage.getItem("user_sex") || "female";
    user_act.value = localStorage.getItem("user_act") || "running";
  };

  var draw_calc = function() {
    var calc = document.getElementById("cal_calc");
    var txt = '<table class="cal_table">';
    txt += '<tr><td>Weight: <span style="display:inline-block;"><input type="text" id="weightt" name="weight" value="130" size="4" /> (<span id="weight_units">lbs</span>)</span><br></td></tr>';

    txt += '<tr><td>Age: &nbsp; &nbsp; &nbsp;<span style="display:inline-block;"><input type="text" id="age" name="age" value="42" size="4" /> (yrs)</span><br></td><tr>';

    txt += '<tr><td><label for="sex">Choose a sex:</label>';
    txt += '<select name="sex" id="sex">';
    txt += '<option value="female" selected>female</option>';
    txt += '<option value="male">male</option>';
    txt += '</select></td></tr>';

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
    user_weight = document.getElementById('weightt');
    user_age = document.getElementById('age');
    user_sex = document.getElementById('sex');
    user_act = document.getElementById('acts');
    details = document.getElementById('details');
    result_label = document.getElementById('cals');
  };

  var load_met_calculator = function(e) {
    var act = user_act.value;
    var txt = '';
    if (act == 'calithenics') {
      txt += '<select name="met" id="met">';
      txt += '<option value="2.65">Abdominal exercises, light effort</option>';
      txt += '<option value="3.1">crunches, pull-ups</option>';
      txt += '<option value="3.3">push-ups</option>';
      txt += '<option value="4.1">lunges</option>';
      txt += '<option value="8.0">Vigorous Effort</option>';
      txt += '</select>';
    } else if (act == 'running') {
      txt += '<select name="met" id="met">';
      txt += '<option value="5">4 mph (13 min / mile)</option>';
      txt += '<option value="8.3">5 mph (12 min / mile)</option>';
      txt += '<option value="9.1">6.5 mph (11 min / mile)</option>';
      txt += '<option value="9.8" selected>6 mph (10 min / mile)</option>';
      txt += '<option value="10.5">6.7 mph (9 min / mile)</option>';
      txt += '<option value="11">7 mph (8.5 min / mile)</option>';
      txt += '<option value="11.5">7.5 mph (8 min / mile)</option>';
      txt += '<option value="11.8">8 mph (7.5 min / mile)</option>';
      txt += '<option value="12.2">8.6 mph (7 min / mile)</option>';
      txt += '<option value="12.8">9 mph (6.5 min / mile)</option>';
      txt += '<option value="14.5">10 mph (6 min / mile)</option>';
      txt += '</select>';
    //}  else if (act == 'walking') {
      
    //} else if (act == 'yoga') {
     
    } 

    details.innerHTML = txt;

   if (txt != '') {
     document.getElementById('met').onblur = calc_rate();
   }
  };

  var attach_listeners = function() {
    user_weight.onblur = calc_rate;
    user_age.onblur = calc_rate;
    user_sex.onblur = calc_rate;
    user_act.onblur = calc_rate;
    details.onblur = calc_rate;

    // attach listeners to dynamic elements  TODO: words...
    user_act.onblur = load_met_calculator();
  };

  return {
    init: function() {
      draw_calc();
      attach_listeners();
      load_from_storage();
      load_met_calculator();
    }
  };
}());

CalCalc.init();
