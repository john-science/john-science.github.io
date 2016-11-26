// Init variables
var totalpanels = document.getElementById("number_of_panels").value;
var defaultopenpanel = 0; //leave 0 for no panel open
var accordian = true; //set panels to behave like an accordian, with one panel only ever open at once
var panelheight = new Array();
var currentpanel = defaultopenpanel;
var iconheight = parseInt(window.getComputedStyle(document.getElementsByClassName('icon-close-open')[0]).getPropertyValue('height'));
var highlightopen = true;

// Initialise collapsible panels
function panelinit() {
  for (var i = 1; i <= totalpanels; i++) {
    var thisPanel = document.getElementById("cp-" + i + "-expandable-panel-content");
    panelheight[i] = parseInt(window.getComputedStyle(thisPanel).height);
    thisPanel.setAttribute("style", "margin-top: " + -panelheight[i] + ";");
    if (defaultopenpanel == i) {
      document.getElementById('cp-' + i + '-icon').setAttribute("style", "background-position: 0px -" + iconheight + "px;");
      thisPanel.setAttribute("style", "margin-top: 0;");
    }
  }

  // init user count value for each panel
  for (var k = 1; k <= totalpanels; k++) {
    document.getElementById("cp-" + k.toString() + "-panel-userCount").value = 0;
    document.getElementById("cp-" + k + "-expandable-panel-heading").addEventListener("click", panelClick);
  }
}

// on-click
function panelClick() {
  var objid = this.id.split('-')[1];
  currentpanel = objid;
  if (accordian == true) {
    resetpanels();
  }

  var contentPanel = document.getElementById('cp-' + objid + '-expandable-panel-content');
  if (parseInt(window.getComputedStyle(contentPanel).getPropertyValue('margin-top')) <= (panelheight[objid] * -1)) {
    document.getElementById('cp-' + objid + '-icon').setAttribute("style", "background-position: 0px -" + iconheight + "px;");
    contentPanel.setAttribute("style", "margin-top: 0px;")
    if (highlightopen == true) {
      document.getElementById('cp-' + currentpanel + '-expandable-panel-heading').classList.add("header-active");
    }
  } else {
    document.getElementById('cp-' + objid + '-icon').setAttribute("style", "background-position: 0px 0px;");
    contentPanel.setAttribute("style", "margin-top: -" + panelheight[objid] + "px;")
    if (highlightopen == true) {
      document.getElementById('cp-' + currentpanel + '-expandable-panel-heading').classList.remove("header-active");
    }
  }
}

// Reset
function resetpanels() {
  for (var i = 1; i <= totalpanels; i++) {
    if (currentpanel != i) {
      document.getElementById('cp-' + i + '-icon').setAttribute("style", "background-position: 0px 0px;");
      document.getElementById('cp-' + i + '-expandable-panel-content').setAttribute("style", "margin-top: -" + panelheight[i] + "px;")
      if (highlightopen == true) {
        document.getElementById('cp-' + i + '-expandable-panel-heading').classList.remove("header-active");
      }
    }
  }
}

window.onresize = panelinit;
window.onload = panelinit;
