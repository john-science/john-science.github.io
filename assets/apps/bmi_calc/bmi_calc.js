// reference: https://en.wikipedia.org/wiki/Body_mass_index
var adult = {
  limits: [15, 16, 18.5, 25, 30, 35, 40],
  desc: ["Very severely underweight", "Severely underweight", "Underweight", "Normal (healthy weight)", "Overweight", "Obese Class I (Moderately obese)", "Obese Class II (Severely obese)", "Obese Class III (Very severely obese)"]
};
var hk = {
  limits: [18.5, 23, 25, 30],
  desc: ["Underweight", "Normal Range", "Overweight—At Risk", "Overweight—Moderately Obese", "Overweight—Severely Obese"]
};
var japan = {
  limits: [18.5, 25, 30, 35, 40],
  desc: ["Low", "Normal", "Obese (Level 1)", "Obese (Level 2)", "Obese (Level 3)", "Obese (Level 4)"]
};
var singapore = {
  limits: [18.5, 23, 27.5],
  desc: ["Risk of developing problems such as <br /> nutritional deficiency and osteoporosis", "Low Risk (healthy range)", "Moderate risk of developing heart disease, <br />high blood pressure, stroke, diabetes", "High risk of developing heart disease, <br />high blood pressure, stroke, diabetes"]
};
var boys = {
  ages: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  bottom: [14.5, 14.1, 14, 13.9, 13.9, 13.8, 13.9, 14, 14.1, 14.5, 15, 15.5, 16, 16.5, 17, 17.6, 18.1, 18.7, 19.1],
  top: [19.2, 18.2, 17.9, 18, 18.3, 19.1, 20, 21, 22, 23.1, 24.1, 25.2, 26, 26.8, 27.51, 28.2, 29, 29.7, 30.7]
};
var girls = {
  ages: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  bottom: [14.3, 14, 13.8, 13.5, 13.5, 13.5, 13.7, 13.8, 14, 14.2, 14.8, 15, 15.8, 16.2, 16.8, 17.1, 17.3, 17.8, 17.9],
  top: [19.2, 18.4, 18, 18.2, 18.9, 19.7, 20.7, 21.8, 23, 24, 25.1, 26.2, 27.1, 28.1, 31.1, 39.8, 30.3, 31, 31.9]
};

// attach JS to buttons
document.getElementById('units_metric').addEventListener("click", change_labels);
document.getElementById('units_us').addEventListener("click", change_labels);
document.getElementById('height_major').addEventListener("keypress", calc_bmi_on_enter);
document.getElementById('height_minor').addEventListener("keypress", calc_bmi_on_enter);
document.getElementById('weight').addEventListener("keypress", calc_bmi_on_enter);
document.getElementById('height_major').onblur = calc_bmi;
document.getElementById('height_minor').onblur = calc_bmi;
document.getElementById('weight').onblur = calc_bmi;
document.getElementById('heritage').onchange = herigate_helper;
document.getElementById('bmi').addEventListener('transitionend', deBloop);

// remove quick bloop CSS from output calc
function deBloop(e) {
  if (e.propertyName === 'transform') {
    this.classList.remove('playing');
  }
}

// allow heriage selector to have two onchange functions
function herigate_helper() {
  handle_yr_selector();
  calc_bmi();
}

// We need an age selector, but only for children
function handle_yr_selector() {
  var e = document.getElementById("heritage");
  var selected = e.options[e.selectedIndex].value;

  var ee = document.getElementById("age_selector");
  if (selected === "girl" || selected === "boy") {
    ee.innerHTML = ' &nbsp;<select id="age" onchange="calc_bmi();"><option value="2" selected="selected">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option></select> yrs';
  } else {
    ee.innerHTML = "";
  }
}

// do that actual BMI calculating
function calc_bmi() {
  var is_metric = document.getElementById('units_metric').checked;
  var h_major = parseFloat(document.getElementById('height_major').value);
  var h = parseFloat(document.getElementById('height_minor').value);
  var w = parseFloat(document.getElementById('weight').value);
  var bmi = 0.0;

  if (is_metric) {
    h = h_major + h / 100.0;
    bmi = w / (h * h);
  } else {
    h += 12.0 * h_major;
    bmi = 703 * w / (h * h);
  }
  document.getElementById('bmi').value = (bmi).toFixed(1);

  document.getElementById('bmi').classList.add('playing');
  update_bmi_label(bmi);
}

// helper function to catch enter key
function calc_bmi_on_enter(e) {
  if (e.keyCode === 13) {
    calc_bmi();
    return false;
  }
}

// update the bmi label, based on "official" breakdowns
function update_bmi_label(bmi) {
  var e = document.getElementById("heritage");
  var selected = e.options[e.selectedIndex].value;
  if (selected === "adult") {
    var limits = adult.limits;
    var descs = adult.desc;
  } else if (selected === "hk") {
    var limits = hk.limits;
    var descs = hk.desc;
  } else if (selected === "japan") {
    var limits = japan.limits;
    var descs = japan.desc;
  } else if (selected === "singapore") {
    var limits = singapore.limits;
    var descs = singapore.desc;
  } else if (selected === "girl" || selected === "boy") {
    update_bmi_label_child(bmi, selected);
    return;
  }

  var i = 0;
  while (i < limits.length) {
    if (limits[i] > bmi) {
      document.getElementById("desc_words").innerHTML = descs[i];
      break;
    }
    i += 1;
  }

  if (i === limits.length) {
    document.getElementById("desc_words").innerHTML = descs[i];
  }
}

// the bottom 5% of children are underweight, the top 5% are overweight
function update_bmi_label_child(bmi, sex) {
  var e = document.getElementById("age");
  var age = parseInt(e.options[e.selectedIndex].value);
  var desc = document.getElementById("desc_words");

  if (sex === "girl") {
    if (girls.bottom[age - 2] > bmi) {
      desc.innerHTML = "Underweight";
    } else if (girls.top[age - 2] < bmi) {
      desc.innerHTML = "Overweight";
    } else {
      desc.innerHTML = "Normal";
    }
  } else {
    if (boys.bottom[age - 2] > bmi) {
      desc.innerHTML = "Underweight";
    } else if (boys.top[age - 2] < bmi) {
      desc.innerHTML = "Overweight";
    } else {
      desc.innerHTML = "Normal";
    }
  }
}

// reset the labels, if the units change
function change_labels() {
  var is_metric = document.getElementById('units_metric').checked;
  if (is_metric) {
    document.getElementById('height_major_units').innerHTML = 'm';
    document.getElementById('height_minor_units').innerHTML = 'cm';
    document.getElementById('weight_units').innerHTML = 'kg';
    document.getElementById('weight').value = Math.round(document.getElementById('weight').value * 4.53592) / 10;
    var inches = 12.0 * document.getElementById('height_major').value + Number(document.getElementById('height_minor').value);
    var cm = inches * 2.54;
    var m = parseInt(cm / 100);
    cm -= 100 * m;
    document.getElementById('height_major').value = m;
    document.getElementById('height_minor').value = Math.round(10 * cm) / 10;
  } else {
    document.getElementById('height_major_units').innerHTML = 'ft';
    document.getElementById('height_minor_units').innerHTML = 'in';
    document.getElementById('weight_units').innerHTML = 'lbs';
    document.getElementById('weight').value = Math.round(document.getElementById('weight').value / 0.0453592) / 10;
    var cm = 100.0 * document.getElementById('height_major').value + Number(document.getElementById('height_minor').value);
    var inches = cm / 2.54;
    var feet = parseInt(inches / 12);
    inches -= feet * 12;
    document.getElementById('height_major').value = feet;
    document.getElementById('height_minor').value = Math.round(10 * inches) / 10;
  }
}
