/*!
	Matt Tabs v2.0
	A simple jQuery plugin for creating tabbed interfaces.
	
	https://github.com/matthewhall/matt-tabs
*/

;(function($, win, doc) {
	$.fn.mtabs = function(options) {
		// Set up the default plugin options
		var opts = $.extend({}, $.fn.mtabs.defaults, options),
			// Logging.
			log = function(message) {
				if (win.console && win.console.log) {
					win.console.log(message);
				}
			},
			// 
			_build_tabs = function($cont, tab_names) {
				var tabs = "",
					i = 0,
					len = tab_names.length,
					$tab_menu = $('<ul class="tabs-menu" />').delegate("li", "click", function(e) {
						var $this = $(this),
							idx = $this.index();
						
						$cont.children().hide().end().children(":eq(" + idx + ")").show();
					});
			
				for (; i < len; i++) {
					tabs += '<li class="tab tab-' + i + '">' + tab_names[i] + '</li>';
				}
			
				$tab_menu.html(tabs);
			
				$cont.before($tab_menu);
			};
		
		return this.each(function() {
			var $cont = $(this),
				$tabs = $cont.children().not(":empty"),
				tabs_len = $tabs.length,
				set = opts.sets,
				tab_names = [];
			
			if (tabs_len) {
				$.each($tabs, function(idx, $tab) {
					var $tab = $($tab),
						tab_text = tab_text ? $(tab_text).text() : $tab.children().filter(function() {
							return /h[1-6]/i.test($(this)[0].nodeName);
						})
						.filter(":first").hide().text();
					
					tab_names.push(tab_text);
					
					if (idx > 0) {
						$tab.hide();
					}
				});
				
				_build_tabs($cont, tab_names);
			}
		});
	};

	$.fn.mtabs.defaults = {
		sets: 1, // Define the tabs set. Default number of sets is 1.
		history: true, // 
		tab_text: false // 
	};
})(window.jQuery, window, document, undefined);