var LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
var UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var NUMBERS = "0123456789";
var WARN_COLORS = {
  1: "#DF0101",
  2: "#DF7401",
  3: "#D7DF01",
  4: "#003b6f"
};
var WARN_TITLE = {
  1: "EXTREMELY bad.",
  2: "Not good.",
  3: "Okay. Could be better."
};
var COMPLEX_CUTS = [1e9, 1e15, 1e20];
var STRENGTH_WORDS = ['TERRIBLE', 'BAD', 'OKAY', 'GOOD'];

var isLowercase = function(str) {
  return LOWERCASE.indexOf(str) > -1;
};

var isUppercase = function(str) {
  return UPPERCASE.indexOf(str) > -1;
};

var isNumber = function(str) {
  return NUMBERS.indexOf(str) > -1;
};

var password_complexity = function(str) {
  var contains_lowercase = false;
  var contains_uppercase = false;
  var contains_numbers = false;
  var contains_special = false;

  var i = 0;
  while (i < str.length) {
    if (isLowercase(str[i])) {
      contains_lowercase = true;
    } else if (isUppercase(str[i])) {
      contains_uppercase = true;
    } else if (isNumber(str[i])) {
      contains_numbers = true;
    } else {
      contains_special = true;
    }
    i += 1;
  }

  var complexity = 0;
  if (contains_lowercase) {
    complexity += 26;
  }
  if (contains_uppercase) {
    complexity += 26;
  }
  if (contains_numbers) {
    complexity += 10;
  }
  if (contains_special) {
    complexity += 22;
  }

  return Math.pow(complexity, str.length);
};

var test_is_password = function(str, len) {
  if (str.toLowerCase().includes("password")) {
    return {'rank': len > 16 ? 2 : 1, 'msg': 'TOO COMMON: Includes the word "password".'};
  }
  return false;
};

var test_length = function(len) {
  if (len < 7) {
    return {'rank': 1, 'msg': 'TOO SHORT: Under 7 characters.'};
  } else if (len < 9) {
    return {'rank': 2, 'msg': 'TOO SHORT: Under 9 characters.'};
  } else if (len < 13) {
    return {'rank': 3, 'msg': 'TOO SHORT: Under 13 characters.'};
  };
  return false;
};

var test_in_array = function(arr, str, rank, msg) {
  /** abstract test for a string in an array */
  if (arr.indexOf(str.toLowerCase()) > -1) {
    return {'rank': rank, 'msg': 'TOO COMMON: ' + msg};
  };
  return false;
};

var test_int = function(str) {
  /** passwords are not pin numbers */
  if (/^\+?\d+$/.test(str)) {
    return {'rank': 1, 'msg': 'TOO SIMPLE: Just a number.'};
  }
  return false;
};

var test_date = function(str) {
  /** Test if the start or end of the password looks like a year. */
  if (/^\+?\d+$/.test(str)) {
    var yrs = [parseInt(str.slice(0, 4)), parseInt(str.slice(4))];
    for (var y = 0; y < 2; y++) {
      if (yrs[y] > 1775 && yrs[y] < 2100) {
        return {'rank': 1, 'msg': 'TOO SIMPLE: Looks like a year or date.'};
      };
    };
  };
  return false;
};

var test_repeat = function(str, len) {
  /** Test if the password is repetitive */
  var last = '';
  var count = 0;
  var max_count = 1;
  /** loop through all the characters in the string */
  for (var i = 0; i < len; i++) {
    if (str[i] == last) {
      count += 1;
    } else {
      last = str[i];
      if (count > max_count) {
        max_count = count;
      }
      count = 1;
    }
  }
  if (count > max_count) {
    max_count = count;
  }
  /** determine if the string is overly repetitive. */
  if (max_count === len) {
    return {'rank': 1, 'msg': 'TOO SIMPLE: Password just repeated character.'};
  } else if (max_count >= 4) {
    return {'rank': len > (4 * max_count) ? 2 : 1, 'msg': 'TOO SIMPLE: Repeated a character more than 3 times.'};
  }else if (max_count === 3) {
    return {'rank': len > (4 * max_count) ? 3 : 2, 'msg': 'TOO SIMPLE: Repeated a character 3 times.'};
  }
  return false;
};

var test_complexity = function(comp) {
  /** Test the passwords complexity against the rubriks */
  if (comp < COMPLEX_CUTS[0]) {
    return {'rank': 1, 'msg': 'TOO SIMPLE: Terrible complexity score.'};
  } else if (comp < COMPLEX_CUTS[1]) {
    return {'rank': 2, 'msg': 'TOO SIMPLE: Bad complexity score.'};
  } else if (comp < COMPLEX_CUTS[2]) {
    return {'rank': 3, 'msg': 'TOO SIMPLE: Iffy complexity score.'};
  }
  return false;
}

var full_test = function() {
  /** test password strength, then update the GUI */
  // get UI elements of interest
  var probs = document.getElementById('problems');
  var prob_list = document.getElementById('prob_list');
  probs.style.display = 'none';
  prob_list.innerHTML = '';
  var stats = document.getElementById('stats');
  var stat_list = document.getElementById('stat_list');
  var strength_word = document.getElementById('strength_word');

  // analyze the password
  var str = document.getElementById('pass_string').value;
  var len = str.length;
  var comp = password_complexity(str);
  var strength = test_complexity(comp);
  strength = (strength !== false) ? strength['rank'] : 4;

  // start showing results
  strength_word.innerHTML = STRENGTH_WORDS[strength - 1];
  strength_word.style.color = WARN_COLORS[strength];
  document.getElementById('strength').style.display = '';
  stats.style.display = '';
  stat_list.innerHTML = "<li>Complexity Score: " + comp.toExponential(1) + "</li>";
  stat_list.innerHTML += "<li>Length: " + len + "</li>";

  // run all tests and update any results as you find them
  var results = [test_complexity(comp), test_is_password(str, len), test_length(len), test_int(str), test_date(str), test_repeat(str, len), test_in_array(TOP1000, str, 2, "In the top 1000 most common passwords."), test_in_array(ENG1000, str, 2, "In the English dictionary."), test_in_array(DIRTY, str, 1, "Profanity and sexual words are too obvious."), test_in_array(KNOWN_DEFAULTS, str, 1, "This is a commonly known default password.")];
  for (var i = 0; i < results.length; i++) {
    var res = results[i];
    if (res) {
      probs.style.display = '';
      prob_list.innerHTML += '<li title="' + WARN_TITLE[res['rank']] + '" style="color:' + WARN_COLORS[res['rank']] + '">' + res['msg'] + '</li>';
      if (res['rank'] < strength) {
        strength = res['rank'];
        strength_word.style.color = WARN_COLORS[strength];
        strength_word.innerHTML = STRENGTH_WORDS[strength - 1];
      }
    };
  };
};

var text_entry = function(e) {
  /** helper function to catch enter key */
  if (e.keyCode === 13) {
    full_test();
  }
};

/** Attach event listeners to the screen */
document.getElementById('pass_string').addEventListener("keypress", text_entry);
document.getElementById('test_button').addEventListener("click", full_test);
