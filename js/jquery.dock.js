/*
Apple Dock jQuery plugin
By Herman van der Maas, 28-9-2010, waywayway.nl
Dedicated to Benjamin Paap, benjaminpaap.de
This plugin works on a <div> containing <img>'s that are optionally wrapped in <a>'s
All <img>'s must have the same size, if not they will be resized to the size of the first <img>
In the html document, first include the .js file of jQuery 1.4.2, then this .js plugin file, then a .js script attaching the dock method to your <div>
*/

(function($) {
	$.fn.dock = function(settings) {
		
		// The config object contains default settings
		var config = {
			// zoomFactor is a percentage of magnification e.g. 1.00 is no zooming, 2.00 = 200%
			zoomFactor : 2.00, 
			// zoomWidth is the width of the magnification of the <img>'s
			zoomWidth : 90,
			// timeOut is the time (in milliseconds) that elapses between the mouseout and the sliding back of the <div id="dock">
			timeOut : 700			
		};
		
		// Merge the user settings object with the config object
		if (settings) $.extend(config, settings);
		// Put <div id="dock"> in a jQuery object, let the variable name start with a "$" to indicate a jQuery object
		$dock = $(this);
		// put all <img>'s in a jQuery object for future calculations
		$images = $(this).find('img');

		// apply the functions + return each element in the jQuery selection to maintain chainability
		return this.each(function() {
			// Put original <img>'s margin-top property in variable
			//originalMargintop = $images.eq(0).css('margin-top');
			
			// Put original <img>'s width in variable
			originalImgwidth = $images.eq(0).width();
			zoomedImgwidth = $images.eq(0).width() * 1.5;
			
			// Put original <img>'s width in variable
			originalImgheight = $images.eq(0).height();
			zoomedImgheight = $images.eq(0).height() * 1.5;

			initDockslide();
			
			// Create slide in / slide out of Dock <div>
			function initDockslide() {
				// variable below must be available to other functions (it must have global scope), so no "var" keyword to declare it
				originalLeftposition = $dock.css('left');

				originalDivwidth = $dock.width();
				originalDivposition = - parseInt($dock.css('margin-left').replace(/[^\d\.]/g, ''));
				t = '';

				$dock.hover(slideDockin, slideDockout);

				zoomIcons();
			};

			function zoomIcons() {
				$images.each(function(image) {
					$(this).hover(function () {
						$(this).animate({
						    // top: '-=' + $(this).height() / factor,
						    // left: '-=' + $(this).width() / factor,
						    width: zoomedImgwidth,
						    height: zoomedImgheight
						}, 200);
					}, function () {
					    $(this).animate({
					        // top: '-=' + $(this).height() / factor,
					        // left: '-=' + $(this).width() / factor,
					        width: originalImgwidth,
					        height: originalImgheight
					    }, 200);    
					});
				});
			};

			function slideDockin() {
				if(t) {
					clearTimeout(t);
				};
				// the keyword "this" refers to the "hovered" element (the <div> with <img>'s)
				$(this).animate({left : "0px"}, 500);
			};

			function slideDockout() {
				//exitZoom();
				var timerCallback = function() {
					$dock.animate({left : originalLeftposition}, 400);
					// unbind "mousemove" event from <div>
					$dock.unbind('mousemove');
				};
				t = setTimeout(timerCallback, config.timeOut);
			};

		});
	};
})(jQuery);