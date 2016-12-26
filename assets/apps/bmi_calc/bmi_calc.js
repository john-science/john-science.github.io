// CONSTANTS from reference: https://en.wikipedia.org/wiki/Body_mass_index
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

// Check browser support
var hasStorage = false;
if (typeof(Storage) !== "undefined") {
  hasStorage = true;
}

// grab form elements
form_units_metric = document.getElementById('units_metric');
form_units_us = document.getElementById('units_us');
form_height_major = document.getElementById('height_major');
form_height_minor = document.getElementById('height_minor');
form_weight = document.getElementById('weight');
form_heritage = document.getElementById('heritage');
form_bmi = document.getElementById('bmi');

// remove quick bloop CSS from output calc
var deBloop = function(e) {
  if (e.propertyName === 'transform') {
    this.classList.remove('playing');
  }
};

// allow heriage selector to have two onchange functions
var herigate_helper = function() {
  handle_yr_selector();
  calc_bmi();
};

// We need an age selector, but only for children
var handle_yr_selector = function() {
  var selected = form_heritage.options[form_heritage.selectedIndex].value;
  var age = document.getElementById("age_selector");
  var i = 2;
  var yr = "2";
  var options = "";

  if (selected === "girl" || selected === "boy") {
    // build the options selector
    options = ' &nbsp;<select id="age" onchange="calc_bmi();">';
    for (i = 2; i < 21; i += 1) {
      yr = i.toString();
      options += '<option value="' + yr + '" selected="selected">' + yr + '</option>';
    }
    options += ' yrs';
    age.innerHTML = options;
  } else {
    age.innerHTML = "";
  }
};

// do that actual BMI calculating
var calc_bmi = function() {
  // grab major form fields
  var is_metric = form_units_metric.checked;
  var h_major = parseFloat(form_height_major.value);
  var h = parseFloat(form_height_minor.value);
  var w = parseFloat(form_weight.value);
  var bmi = 0.0;

  // calc & update BMT
  if (is_metric) {
    h = h_major + h / 100.0;
    bmi = w / (h * h);
  } else {
    h += 12.0 * h_major;
    bmi = 703 * w / (h * h);
  }
  form_bmi.value = (bmi).toFixed(1);
  form_bmi.classList.add('playing');
  update_bmi_label(bmi);

  // throw form fields into storage
  if (hasStorage) {
    localStorage.setItem("is_metric", is_metric);
    localStorage.setItem("h_major", h_major);
    localStorage.setItem("h_minor", parseFloat(form_height_minor.value));
    localStorage.setItem("w", w);
    localStorage.setItem("bmi", bmi);
  }
};

// helper function to catch enter key
var calc_bmi_on_enter = function(e) {
  if (e.keyCode === 13) {
    calc_bmi();
    return false;
  }
};

// update the bmi label, based on "official" breakdowns
var update_bmi_label = function(bmi) {
  var selected = form_heritage.options[form_heritage.selectedIndex].value;
  var limits = adult.limits;
  var descs = adult.desc;
  var i = 0;

  // if heritage selector isn't default adults
  if (selected === "hk") {
    limits = hk.limits;
    descs = hk.desc;
  } else if (selected === "japan") {
    limits = japan.limits;
    descs = japan.desc;
  } else if (selected === "singapore") {
    limits = singapore.limits;
    descs = singapore.desc;
  } else if (selected === "girl" || selected === "boy") {
    update_bmi_label_child(bmi, selected);
    return;
  }

  //i = 0;  // above
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
};

// the bottom 5% of children are underweight, the top 5% are overweight
var update_bmi_label_child = function(bmi, sex) {
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
};

// reset the labels, if the units change
var change_labels = function() {
  var is_metric = form_units_metric.checked;
  var inches, feet, cm, m;
  if (is_metric) {
    document.getElementById('height_major_units').innerHTML = 'm';
    document.getElementById('height_minor_units').innerHTML = 'cm';
    document.getElementById('weight_units').innerHTML = 'kg';
    form_weight.value = Math.round(form_weight.value * 4.53592) / 10;
    inches = 12.0 * form_height_major.value + Number(form_height_minor.value);
    cm = inches * 2.54;
    m = parseInt(cm / 100);
    cm -= 100 * m;
    form_height_major.value = m;
    form_height_minor.value = Math.round(10 * cm) / 10;
  } else {
    document.getElementById('height_major_units').innerHTML = 'ft';
    document.getElementById('height_minor_units').innerHTML = 'in';
    document.getElementById('weight_units').innerHTML = 'lbs';
    form_weight.value = Math.round(document.getElementById('weight').value / 0.0453592) / 10;
    cm = 100.0 * form_height_major.value + Number(form_height_minor.value);
    inches = cm / 2.54;
    feet = parseInt(inches / 12);
    inches -= feet * 12;
    form_height_major.value = feet;
    form_height_minor.value = Math.round(10 * inches) / 10;
  }
};

var useStorage = function() {
  // validate storage
  if (!hasStorage) {
    return;
  }
  var hasAll = ['h_major', 'h_minor', 'w', 'bmi', 'is_metric'].reduce(function(result, key) {
    return result && (localStorage.getItem(key) !== null)
  }, true);
  if (!hasAll) {
    return;
  }

  // deal with units
  is_met = localStorage.getItem("is_metric") === 'true';
  if (is_met) {
    form_units_metric.checked = true;
    form_units_us.checked = false;
    document.getElementById('height_major_units').innerHTML = 'm';
    document.getElementById('height_minor_units').innerHTML = 'cm';
    document.getElementById('weight_units').innerHTML = 'kg';
  } else {
    form_units_metric.checked = false;
    form_units_us.checked = true;
    document.getElementById('height_major_units').innerHTML = 'ft';
    document.getElementById('height_minor_units').innerHTML = 'in';
    document.getElementById('weight_units').innerHTML = 'lbs';
  }
  // load the rest of the major form elements
  form_height_major.value = parseFloat(localStorage.getItem("h_major"));
  form_height_minor.value = parseFloat(localStorage.getItem("h_minor"));
  form_weight.value = parseFloat(localStorage.getItem("w"));
  form_bmi.value = parseFloat(localStorage.getItem("bmi")).toFixed(1);
};
useStorage();

// attach JS to buttons
form_units_metric.addEventListener("click", change_labels);
form_units_us.addEventListener("click", change_labels);
form_height_major.addEventListener("keypress", calc_bmi_on_enter);
form_height_minor.addEventListener("keypress", calc_bmi_on_enter);
form_weight.addEventListener("keypress", calc_bmi_on_enter);
form_height_major.onblur = calc_bmi;
form_height_minor.onblur = calc_bmi;
form_weight.onblur = calc_bmi;
form_heritage.onchange = herigate_helper;
form_bmi.addEventListener('transitionend', deBloop);
