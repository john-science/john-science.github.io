
var exPanels = (function() {
  // Init variables
  var totalPanels = document.getElementsByClassName('expandable-panel').length;
  var defaultOpenPanel = 0; //leave 0 for no panel open
  var accordian = true; //set panels to behave like an accordian, with one panel only ever open at once
  var panelHeight = [];
  var currentPanel = defaultOpenPanel;
  var iconHeight = parseInt(window.getComputedStyle(document.getElementsByClassName('icon-close-open')[0]).getPropertyValue('height'));
  var highlightOpen = true;

  return {
    resetPanels: function() {
      for (var i = 1; i <= totalPanels; i += 1) {
        if (currentPanel !== i.toString()) {
          document.getElementById('cp-' + i + '-icon').setAttribute("style", "background-position: 0px 0px;");
          document.getElementById('cp-' + i + '-expandable-panel-content').setAttribute("style", "margin-top: -" + panelHeight[i] + "px;")
          if (highlightOpen) {
            document.getElementById('cp-' + i + '-expandable-panel-heading').classList.remove("header-active");
          }
        }
      }
    },
    init: function() {
      for (var i = 1; i <= totalPanels; i += 1) {
        var thisPanel = document.getElementById("cp-" + i + "-expandable-panel-content");
        panelHeight[i] = parseInt(window.getComputedStyle(thisPanel).height);
        thisPanel.setAttribute("style", "margin-top: " + -panelHeight[i] + ";");
        if (defaultOpenPanel === i) {
          document.getElementById('cp-' + i + '-icon').setAttribute("style", "background-position: 0px -" + iconHeight + "px;");
          thisPanel.setAttribute("style", "margin-top: 0;");
        }
      }

      // init user count value for each panel
      for (var k = 1; k <= totalPanels; k += 1) {
        document.getElementById("cp-" + k.toString() + "-panel-userCount").value = 0;
        document.getElementById("cp-" + k +  "-expandable-panel-heading").addEventListener("click", exPanels.panelClick);
      }
    },
    panelClick: function() {
      var objid = this.id.split('-')[1];
      currentPanel = objid;
      if (accordian) {
        exPanels.resetPanels();
      }

      var contentPanel = document.getElementById('cp-' + objid + '-expandable-panel-content');
      if (parseInt(window.getComputedStyle(contentPanel).getPropertyValue('margin-top')) <= -panelHeight[objid]) {
        // open panel
        document.getElementById('cp-' + objid + '-icon').setAttribute("style", "background-position: 0px -" + iconHeight + "px;");
        contentPanel.setAttribute("style", "margin-top: 0px;")
        if (highlightOpen) {
          document.getElementById('cp-' + currentPanel + '-expandable-panel-heading').classList.add("header-active");
        }
      } else {
        // close panel
        document.getElementById('cp-' + objid + '-icon').setAttribute("style", "background-position: 0px 0px;");
        contentPanel.setAttribute("style", "margin-top: -" + panelHeight[objid] + "px;")
        if (highlightOpen) {
          document.getElementById('cp-' + currentPanel + '-expandable-panel-heading').classList.remove("header-active");
        }
      }
    }
  };
}());


window.onresize = exPanels.init;
window.onload = exPanels.init;
