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
		this.tabs = this.$element.children();
		this.options = $.extend({}, $.fn.mtabs.defaults, options);
		
		this.init();
	};
	
	MattTabs.prototype = {
		init: function() {
			if (this.tabs.length) {
				this.build();
				this.buildTabMenu();
			}
		},
		
		build: function() {
			var name,
				self = this,
				tab_text_el = this.options.tab_text_el;
			
			this.tab_names = [];
			
			this.tabs.each(function(idx, element) {
				var $element = $(element);
				
				name = tab_text_el ? $element.find(tab_text_el).hide().text() : $element.children().filter(function() {
						return (/h[1-6]/i).test($(this)[0].nodeName);
					})
					.filter(":first").hide().text();
				
				self.tab_names.push(name);
				
				if (idx > 0) {
					$element.hide();
				}
			});
		},
		
		buildTabMenu: function() {
			var self = this,
				element = this.options.tabmenu_el,
				tab_names = this.tab_names,
				html = "<" + element + ' class="' + this.options.tabmenu_class + '">',
				tab_class,
				i = 0,
				len = tab_names.length,
				
				buildTabs = function() {
					var args = arguments;
					
					return self.options.tmpl.tabmenu_tab.replace(/\{[0-9]\}/g, function(str) {
						// Replace non-numeric chars and convert to number.
						var num = Number(str.replace(/\D/g, ""));
							
						return args[num] || "";
					});
				};
			
			for (; i < len; i++) {
				tab_class = "tab-" + (i + 1);
				
				html += buildTabs(tab_class, tab_names[i]);
			}
			
			html += "</" + element + ">";
			
			this.$element.before(html);
		},
		
		selectTab: function() {
			
		}
	};
	
	$.fn.mtabs = function(options) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data("mtabs");
			
			if (!data) {
				$this.data("mtabs", (data = new MattTabs(this, options)));
			}
		});
	};
	
	$.fn.mtabs.defaults = {
		// history: true,
		tab_text_el: "h2:first",
		tabmenu_class: "tabs-menu",
		tabmenu_el: "ul",
		tmpl: {
			tabmenu_tab: '<li class="{0}"><span>{1}</span></li>'
		}
	};
})(window.jQuery, window, document, undefined);