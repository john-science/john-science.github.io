// repeat the string N times
String.prototype.repeat = function(count) {
  if (count < 1) return '';
  var result = '',
    pattern = this.valueOf();
  while (count > 1) {
    if (count & 1) result += pattern;
    count >>= 1, pattern += pattern;
  }
  return result + pattern;
};


var CalcQ = (function() {
  // Count number of panels, stories, etc
  var totalPanels = document.getElementsByClassName('expandable-panel').length;
  var panelCounts = [];
  var storyLimits = [0];
  var numStories = 0;
  for (var p = 0; p < totalPanels; p += 1) {
    panelCounts.push(document.getElementsByClassName('cp-' + (p + 1).toString() + '-panel').length);
    numStories += panelCounts[panelCounts.length - 1];
    storyLimits.push(numStories);
  }
  document.getElementById('displayTotal').innerHTML = numStories.toString();

  // cross-browser fix for very large form
  var form = {};
  // ensure the form is not meddled with by the browser
  var qForm = document.getElementById('qForm');
  qForm.addEventListener("submit", function(e) {
    e.preventDefault();
  });
  qForm.addEventListener("reset", function(e) {
    e.preventDefault();
  });

  // hash parsing
  var hashLen = Math.ceil(numStories / 5);
  var hasStorage = false;
  var hash = "0".repeat(hashLen);
  var load = document.getElementById('load');

  // helper method, to determine if localStorage is active in browser
  var hasLocalStorage = function() {
    if (typeof(localStorage) !== 'undefined') {
      try {
        localStorage.setItem('test', 'yes');
        if (localStorage.getItem('test') === 'yes') {
          localStorage.removeItem('test');
          // localStorage is enabled
          return true;
        } else {
          // localStorage is disabled
          return false;
        }
      } catch (e) {
        // localStorage is disabled
        return false;
      }
    } else {
      // localStorage is not available
      return false;
    }
  };

  // load hash from local storage, if possible
  hasStorage = hasLocalStorage();
  if (hasStorage && localStorage.getItem('hash')) {
    hash = localStorage.getItem('hash');
    load.value = hash;
  }

  // set the N-th character in a string (strings are zero-indexed)
  var setCharAt = function(str, index, chr) {
    if (index > str.length - 1) {
      return str;
    }
    return str.substr(0, index) + chr + str.substr(index + 1);
  };

  // format val to n number of decimal places
  // modified version of Danny Goodman's (JS Bible)
  var formatDecimal = function(val, n) {
    n = n || 2;
    var str = "" + Math.round(parseFloat(val) * Math.pow(10, n));
    while (str.length <= n) {
      str = "0" + str;
    }
    var pt = str.length - n;
    return str.slice(0, pt) + "." + str.slice(pt);
  };

  // call onclick for group checkboxes
  var updateGroupTotal = function(e) {
    ind = parseInt(this.id.substr(5));
    for (var k = storyLimits[ind - 1] + 1; k <= storyLimits[ind]; k += 1) {
      box = document.getElementById('story' + k.toString());
      // Is the box currently checked?
      if (this.checked) {
        if (!box.checked) {
          box.click();
        }
      } else {
        if (box.checked) {
          box.click();
        }
      }
    }
  };

  // set a new hash value, given by user input
  var setHash = function(hIn) {
    // a little hash validation
    h = JSON.parse(JSON.stringify(hIn)).toLowerCase().replace(/[^a-v0-9]+/g, '');
    if (h.length < hashLen) {
      h += "0".repeat(hashLen - h.length);
    }
    h = h.substring(0, hashLen);

    // use the new hash
    hash = h;
    load.value = h;
    if (hasStorage) {
      localStorage.setItem('hash', h);
    }
  };

  return {
    attachHandlers: function() {
      // assign updateTotal function to onclick property of each checkbox
      for (var i = 1, len = numStories; i <= len; i += 1) {
        document.getElementById('story' + i).onclick = CalcQ.updateTotal;
      }

      // assign updateGroupTotal function to onclick for group checkbox
      for (var j = 1; j <= totalPanels; j += 1) {
        document.getElementById('group' + j).onclick = updateGroupTotal;
      }

      // attach handler to load input
      document.getElementById('load').addEventListener('blur', function(){
        var newHash = this.value;
        setHash(newHash);
        CalcQ.init();
      });
    },
    init: function() {
      var hashChar = '';
      var hashBin = '';
      var hashBit = '';
      var storyIndex = 0;
      var totalInit = 0;
      var count = 'cp-1-panel-count';
      var countInit = 0;

      // loop through each character in the hash string
      // check relevant story box
      for (var i = 0; i <= totalPanels; i += 1) {
        form['cp-' + i + '-panel-count'] = 0;
      }
      for (var i = 0; i < hashLen; i += 1) {
        hashChar = hash[i];
        hashBin = ('00000' + parseInt(hashChar, 36).toString(2)).substring(-5);
        // loop through each bit in the 5-bit hash letter
        for (var j = 1; j <= 5; j += 1) {
          storyIndex = 5 * i + j;
          if (storyIndex > numStories) {
            break;
          }
          hashBit = hashBin[hashBin.length - j];
          if (hashBit === '1') {
            document.getElementById('story' + storyIndex).checked = true;
            count = document.getElementById('story' + storyIndex).className + "-count";
            countInit = document.getElementById(count);
            form[count] += 1;
            countInit.value = form[count];
            totalInit += 1;
          } else {
            document.getElementById('story' + storyIndex).checked = false;
          }
        }
      }

      // init count and Q at top of page
      document.getElementById('total').value = Math.round(totalInit).toString();
      document.getElementById('q').value = formatDecimal(totalInit / numStories);
      form['total'] = totalInit;
      form['q'] = totalInit / numStories;

      // init counter labels
      var panUseCount = 0;
      var panTotal = 1;
      var panLabel = '';
      for (var k = 1; k <= totalPanels; k += 1) {
        panUseCount = form["cp-" + k.toString() + "-panel-count"];
        panTotal = parseInt(panelCounts[k - 1]);
        panLabel = document.getElementById("cp-" + k.toString() + "-panelLabel");
        if (panUseCount === 0) {
          panLabel.innerHTML = "";
        } else if (panUseCount === panTotal) {
          panLabel.innerHTML = "&#10004;";
        } else {
          panLabel.innerHTML = "(" + panUseCount.toString() + "/" + panTotal.toString() + ")";
        }
      }
    },
    updateTotal: function(e) {
      // get current value in total text box
      var total = form['total'];

      // 'this' is reference to checkbox clicked on
      // if check box is checked, add its value to val, otherwise subtract it
      total += this.checked ? 1.0 : -1.0;

      // format val with correct number of decimal places
      // and use it to update value of total text box
      document.getElementById('total').value = Math.round(total).toString();
      document.getElementById('q').value = formatDecimal(total / numStories);
      form['total'] = total;
      form['q'] = total / numStories;

      // Hashing: On box (un)check, change hash value in storage
      var storyNumber = parseInt(this.id.split("story")[1]);
      var hashPosition = Math.floor((storyNumber - 1) / 5);
      var thisBinary = ('00000' + parseInt(hash[hashPosition], 36).toString(2)).substr(-5);
      var binaryPosition = 5 - (storyNumber % 5);
      if (binaryPosition === 5) {
        binaryPosition = 0;
      }

      if (document.getElementById(this.id).checked) {
        thisBinary = setCharAt(thisBinary, binaryPosition, '1');
      } else {
        thisBinary = setCharAt(thisBinary, binaryPosition, '0');
      }
      hash = setCharAt(hash, hashPosition, parseInt(thisBinary, 2).toString(36));
      if (hasStorage) {
        localStorage.setItem('hash', hash);
      }
      load.value = hash;

      // Update panel Count
      var panelName = this.className
      var panelLabel = document.getElementById(panelName + "Label");
      var panelCount = panelName + "-count";
      var panelTotal = parseInt(panelCounts[panelName.split('-')[1] - 1]);

      if (document.getElementById(this.id).checked) {
        form[panelCount] += 1
      } else {
        form[panelCount] -= 1
      }

      // update panel label
      if (form[panelCount] === 0) {
        panelLabel.innerHTML = "";
      } else if (form[panelCount] === panelTotal) {
        panelLabel.innerHTML = "&#10004;";
      } else {
        panelLabel.innerHTML = "(" + form[panelCount].toString() + "/" + panelTotal.toString() + ")";
      }
    }
  };
}());


// helper function, to aid onload
var qInit = function() {
  CalcQ.attachHandlers();
  CalcQ.init();
};

// onload hack: https://ckon.wordpress.com/2008/07/25/stop-using-windowonload-in-javascript/
if (window.attachEvent) {
  window.attachEvent('onload', qInit);
} else if (window.addEventListener) {
  window.addEventListener('load', qInit, false);
} else {
  document.addEventListener('load', qInit, false);
}
