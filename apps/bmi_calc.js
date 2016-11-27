// https://en.wikipedia.org/wiki/Body_mass_index

// attach JS to buttons
document.getElementById('units_metric').addEventListener("click", function() {
  change_labels();
});
document.getElementById('units_us').addEventListener("click", function() {
  change_labels();
});
document.getElementById('height_major').addEventListener("keypress", function(e) {
  calc_bmi_on_enter(e);
});
document.getElementById('height_minor').addEventListener("keypress", function(e) {
  calc_bmi_on_enter(e);
});
document.getElementById('weight').addEventListener("keypress", function(e) {
  calc_bmi_on_enter(e);
});
document.getElementById('height_major').onblur = calc_bmi;
document.getElementById('height_minor').onblur = calc_bmi;
document.getElementById('weight').onblur = calc_bmi;

// do that actual BMI calculating
function calc_bmi() {
  var is_metric = document.getElementById('units_metric').checked;
  var h_major = document.getElementById('height_major');
  var h = document.getElementById('height_minor');
  var w = document.getElementById('weight');
  if (is_metric) {
    var height = 100.0 * h_major.value + Number(h.value);
    document.getElementById('bmi').value = (w.value / (height * height)).toFixed(1);
  } else {
    var height = 12.0 * h_major.value + Number(h.value);
    document.getElementById('bmi').value = (703 * w.value / (height * height)).toFixed(1);
  }
}

// helper function to catch enter key
function calc_bmi_on_enter(e) {
    if (e.keyCode == 13) {
        calc_bmi();
        return false;
    }
}

// reset the labels, if the units change
function change_labels() {
  var is_metric = document.getElementById('units_metric').checked;
  if (is_metric) {
    document.getElementById('height_major_units').innerHTML = 'm';
    document.getElementById('height_minor_units').innerHTML = 'cm';
    document.getElementById('weight_units').innerHTML = 'kg';
  } else {
    document.getElementById('height_major_units').innerHTML = 'ft';
    document.getElementById('height_minor_units').innerHTML = 'in';
    document.getElementById('weight_units').innerHTML = 'lbs';
  }
}
