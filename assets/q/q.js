(function($) {
  $(document).ready(function() {
    /*-------------------- EXPANDABLE PANELS ----------------------*/
    var panelspeed = 500; //panel animate speed in milliseconds
    var totalpanels = 37; //total number of collapsible panels
    var defaultopenpanel = 0; //leave 0 for no panel open
    var accordian = true; //set panels to behave like an accordian, with one panel only ever open at once
    var panelheight = new Array();
    var currentpanel = defaultopenpanel;
    var iconheight = parseInt($('.icon-close-open').css('height'));
    var highlightopen = true;

    // Hash Step 1: On Page Load, read URL hash and parse it, checking boxes where available.
    var numStories = 263;
    var hashLen = Math.ceil(numStories / 5);
    // read hash string from URL
    var hash = (window.location.hash.slice(1) + "00000000000000000000000000000000000000000000000000000").substr(0, hashLen);

    // set the N-th character in a string (strings are zero-indexed)
    function setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substr(0, index) + chr + str.substr(index + 1);
    }

    // Initialize checkbox states
    function checkboxInit() {
      var hashChar = '';
      var hashBin = '';
      var hashBit = '';
      var storyIndex = 0;
      var totalInit = 0;

      // loop through each character in the hash string
      for (i = 0; i < hashLen; i++) {
        hashChar = hash[i];
        hashBin = ('00000' + parseInt(hashChar, 36).toString(2)).substring(-5);
        // loop through each bit in the 5-bit hash letter
        for (j = 1; j <= 5; j++) {
          storyIndex = 5 * i + j;
          if (storyIndex >= numStories) {
            break;
          }
          hashBit = hashBin[hashBin.length - j];
          if (hashBit == '1') {
            document.getElementById('story' + storyIndex).checked = true;
            totalInit += 1;
          } else {
            document.getElementById('story' + storyIndex).checked = false;
          }
        }
      }

      document.getElementById('total').value = '' + Math.round(totalInit);
      document.getElementById('q').value = formatDecimal(totalInit / numStories);
    }

    // Initialise collapsible panels
    function panelinit() {
      for (var i = 1; i <= totalpanels; i++) {
        panelheight[i] = parseInt($('#cp-' + i).find('.expandable-panel-content').css('height'));
        $('#cp-' + i).find('.expandable-panel-content').css('margin-top', -panelheight[i]);
        if (defaultopenpanel == i) {
          $('#cp-' + i).find('.icon-close-open').css('background-position', '0px -' + iconheight + 'px');
          $('#cp-' + i).find('.expandable-panel-content').css('margin-top', 0);
        }
      }
    }

    $('.expandable-panel-heading').click(function() {
      var obj = $(this).next();
      var objid = parseInt($(this).parent().attr('ID').substr(3, 2));
      currentpanel = objid;
      if (accordian == true) {
        resetpanels();
      }

      if (parseInt(obj.css('margin-top')) <= (panelheight[objid] * -1)) {
        obj.clearQueue();
        obj.stop();
        obj.prev().find('.icon-close-open').css('background-position', '0px -' + iconheight + 'px');
        obj.animate({
          'margin-top': 0
        }, panelspeed);
        if (highlightopen == true) {
          $('#cp-' + currentpanel + ' .expandable-panel-heading').addClass('header-active');
        }
      } else {
        obj.clearQueue();
        obj.stop();
        obj.prev().find('.icon-close-open').css('background-position', '0px 0px');
        obj.animate({
          'margin-top': (panelheight[objid] * -1)
        }, panelspeed);
        if (highlightopen == true) {
          $('#cp-' + currentpanel + ' .expandable-panel-heading').removeClass('header-active');
        }
      }
    });

    function resetpanels() {
      for (var i = 1; i <= totalpanels; i++) {
        if (currentpanel != i) {
          $('#cp-' + i).find('.icon-close-open').css('background-position', '0px 0px');
          $('#cp-' + i).find('.expandable-panel-content').animate({
            'margin-top': -panelheight[i]
          }, panelspeed);
          if (highlightopen == true) {
            $('#cp-' + i + ' .expandable-panel-heading').removeClass('header-active');
          }
        }
      }
    }

    //Uncomment these lines if the expandable panels are not a fixed width and need to resize
    /* $( window ).resize(function() {
       panelinit();
     });*/

    $(window).load(function() {
      panelinit();
      checkboxInit();
    }); //END LOAD

    // call onload or in script segment below form
    function attachCheckboxHandlers() {
      // assign updateTotal function to onclick property of each checkbox
      for (var i = 1, len = numStories; i <= len; i++) {
        box = document.getElementById('story' + i);
        box.onclick = updateTotal;
      }
    }

    // called onclick of toppings checkboxes
    function updateTotal(e) {
      // 'this' is reference to checkbox clicked on
      var form = this.form;

      // get current value in total text box, using parseFloat since it is a string
      var total = parseFloat(form.elements['total'].value);

      // if check box is checked, add its value to val, otherwise subtract it
      if (this.checked) {
        total += 1.0;
      } else {
        total -= 1.0;
      }

      // format val with correct number of decimal places
      // and use it to update value of total text box
      form.elements['total'].value = '' + Math.round(total);
      form.elements['q'].value = formatDecimal(total / numStories);

      // Hash Step 2: On box (un)check, change hash value in URL.
      var storyNumber = parseInt(this.id.split("story")[1]);
      var hashPosition = Math.floor((storyNumber - 1) / 5);
      var thisBinary = ('00000' + parseInt(hash[hashPosition], 36).toString(2)).substr(-5);
      var binaryPosition = 5 - (storyNumber % 5);
      if (binaryPosition == 5) {
        binaryPosition = 0;
      }

      if (document.getElementById(this.id).checked) {
        thisBinary = setCharAt(thisBinary, binaryPosition, '1');
      } else {
        thisBinary = setCharAt(thisBinary, binaryPosition, '0');
      }
      hash = setCharAt(hash, hashPosition, parseInt(thisBinary, 2).toString(36));
      window.location.hash = hash;
    }

    // format val to n number of decimal places
    // modified version of Danny Goodman's (JS Bible)
    function formatDecimal(val, n) {
      n = n || 2;
      var str = "" + Math.round(parseFloat(val) * Math.pow(10, n));
      while (str.length <= n) {
        str = "0" + str;
      }
      var pt = str.length - n;
      return str.slice(0, pt) + "." + str.slice(pt);
    }

    // in script segment below form
    attachCheckboxHandlers();
  }); //END READY
})(jQuery);
