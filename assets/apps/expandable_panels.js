(function($) {
	$(document).ready(function() {
		// Init variables
		var panelspeed = 500; //panel animate speed in milliseconds
		var totalpanels = document.getElementById("number_of_panels").value;
		var defaultopenpanel = 0; //leave 0 for no panel open
		var accordian = true; //set panels to behave like an accordian, with one panel only ever open at once
		var panelheight = new Array();
		var currentpanel = defaultopenpanel;
		var iconheight = parseInt($('.icon-close-open').css('height'));
		var highlightopen = true;

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

			// init user count value for each panel
			for (var k=1; k <= totalpanels; k++) {
					document.getElementById("cp-" + k.toString() + "-panel-userCount").value = 0;
			}
		}

		// on-click
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

		// Reset
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

		// Uncomment these lines if the panels are not fixed width and need to resize
		$( window ).resize(function() {
			 panelinit();
		 });

		// on load
		$(window).load(function() {
			panelinit();
		});

	}); // end ready
})(jQuery);
