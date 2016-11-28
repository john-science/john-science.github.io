// https://en.wikipedia.org/wiki/Body_mass_index
var adult = {limits: [15, 16, 18.5, 25, 30, 35, 40],
             desc: ["Very severely underweight","Severely underweight","Underweight","Normal (healthy weight)","Overweight","Obese Class I (Moderately obese)","Obese Class II (Severely obese)","Obese Class III (Very severely obese)"]};
//var child = {limits: [],
//             desc: []};
var hk = {limits: [18.5, 23, 25, 30],
          desc: ["Underweight","Normal Range","Overweight—At Risk","Overweight—Moderately Obese","Overweight—Severely Obese"]};
var japan = {limits: [18.5,25,30,35,40],
             desc: ["Low","Normal","Obese (Level 1)","Obese (Level 2)","Obese (Level 3)","Obese (Level 4)"]};
var singapore = {limits: [18.5,23,27.5],
                 desc: ["Risk of developing problems such as <br /> nutritional deficiency and osteoporosis","Low Risk (healthy range)","Moderate risk of developing heart disease, <br />high blood pressure, stroke, diabetes","High risk of developing heart disease, <br />high blood pressure, stroke, diabetes"]};

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
document.getElementById('region_age').onchange = update_bmi_label;

// do that actual BMI calculating
function calc_bmi() {
  var is_metric = document.getElementById('units_metric').checked;
  var h_major = document.getElementById('height_major');
  var h = document.getElementById('height_minor');
  var w = document.getElementById('weight');
  var height = Number(h.value);
  var bmi = 0.0;
  
  if (is_metric) {
    height += 100.0 * h_major.value;
    bmi = w.value / (height * height);
  } else {
    height += 12.0 * h_major.value;
    bmi = 703 * w.value / (height * height);
  }
  document.getElementById('bmi').value = (bmi).toFixed(1);
  
  update_bmi_label(bmi);
}

// helper function to catch enter key
function calc_bmi_on_enter(e) {
    if (e.keyCode == 13) {
        calc_bmi();
        return false;
    }
}

// update the bmi label, based on "official" breakdowns
function update_bmi_label(bmi) {
  var e = document.getElementById("region_age");
  var selected = e.options[e.selectedIndex].value;
  if (selected === "hk") {
  	var limits = hk.limits;
  	var descs = hk.desc;
  } else if (selected === "japan") {
  	var limits = japan.limits;
  	var descs = japan.desc;
  } else if (selected === "singapore") {
  	var limits = singapore.limits;
  	var descs = singapore.desc;
  } else {
  	var limits = adult.limits;
  	var descs = adult.desc;
  }

  var i = 0;
  while (i < limits.length) {
    if (limits[i] > bmi) {
      document.getElementById("desc_words").innerHTML = descs[i];
      break;
    }
    i += 1;
  }

  if (i == limits.length) {
    document.getElementById("desc_words").innerHTML = descs[i];
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
