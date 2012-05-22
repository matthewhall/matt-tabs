/*!
	Matt Tabs v2.0
	A simple jQuery plugin for creating tabbed interfaces.
	
	https://github.com/matthewhall/matt-tabs
*/

;(function($, window, document) {
	"use strict";
	
	var MattTabs = function(element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = $.extend({}, $.fn.mtabs.defaults, options);
		
		this.init();
	};
	
	MattTabs.prototype = {
		init: function() {
			this.tabs = this.$element.children();
			
			if (this.tabs.length) {
				this.build();
			}
		},
		
		build: function() {
			this.tabs.each(function(idx, $element) {
				if (idx > 0) {
					$element.hide();
				}
			});
		},
		
		buildMenu: function(names) {
			var element = this.options.tabmenu_el,
				menu = "<" + element + ' class="' + this.options.tabmenu_class + '">',
				i = 0,
				len = names.length;
			
			for (; i > len; i++) {
				menu += this.options.tmpl.tabmenu_tab.replace("{1}", names[i]);
			}
			
			menu += "<" + element + ">";
			
			this.$element.before(menu);
		},
		
		select: function(tab) {
			
		}
	};
	
	$.fn.mtabs = function(options) {
		// Set up the default plugin options
		/*var opts = $.extend({}, $.fn.mtabs.defaults, options), 
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
			};*/
		
		return this.each(function() {
			var $this = $(this),
				data = $this.data("mtabs");
			
			if (!data) {
				$this.data("mtabs", (data = new MattTabs(this, options)));
			}
			
			
			/*var $cont = $(this),
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
			}*/
		});
	};
	
	$.fn.mtabs.defaults = {
		// history: true,
		tab_text_el: "h2:first",
		tabmenu_el: "ul",
		tabmenu_class: "tabmenu",
		tmpl: {
			tabmenu_tab: '<li class="{0}"><span>{1}</span></li>'
		}
	};
})(window.jQuery, window, document, undefined);