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
			});
		},
		
		// Generates the HTML markup for the tabs menu and
		// appends it to the relevant page of the page.
		buildTabMenu: function() {
			var self = this,
				element = this.options.tabmenu_el,
				tab_names = this.tab_names,
				html = "<" + element + ' class="' + this.options.tabmenu_class + '">',
				tab_class,
				i = 0,
				len = tab_names.length,
				child_node_name,
				
				// Private func to build the tab HTML.
				buildTabs = function() {
					var args = arguments;
					
					// Replace any {0} placeholders with any text passed in as arguments.
					return self.options.tmpl.tabmenu_tab.replace(/\{[0-9]\}/g, function(str) {
						// Replace non-numeric chars and convert to number.
						var num = Number(str.replace(/\D/g, ""));
						
						// Return the relevant string from the args array based
						// on the placeholder number we're currently replacing.
						return args[num] || "";
					});
				};
			
			for (; i < len; i++) {
				// Create specific class name for each tab.
				tab_class = "tab-" + (i + 1);
				
				// Build HTML for each tab.
				html += buildTabs(tab_class, tab_names[i]);
			}
			
			// Close the container.
			html += "</" + element + ">";
			
			// Append it before the element and assign
			// to the prototype chain for use later.
			this.$tab_menu = $(html).insertBefore(this.$element);
			
			// Get nodeName of the tab menu children
			// so we can delegate the click event to them.
			child_node_name = this.$tab_menu.find(":first")[0].nodeName.toLowerCase();
			
			// Delegate click evens to each tab.
			this.$tab_menu.on("click", child_node_name, function(e) {
					var $this = $(this),
						// Use the tab's index to associate it with it's content.
						idx = $this.index();
					
					// Select the tab.
					self.selectTab(idx);
					
					// Just in case an a element has been supplied as a template.
					e.preventDefault();
				})
				// Select and show the first tab.
				.find(":first")
				.trigger("click");
		},
		
		// Toggle relevant tab based on the index passed in.
		selectTab: function(idx) {
			// idx = typeof idx === "string" ? idx.replace(/\D/g, "") : idx;
			
			this.tabs.hide().filter(":eq(" + idx + ")").show();
		}
	};
	
	// Add to $.fn namespace.
	$.fn.mtabs = function(options) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data("mtabs");
			
			// Check is mtabs has already been applied.
			if (!data) {
				// Initialise new instance of MattTabs;
				$this.data("mtabs", (data = new MattTabs(this, options)));
			}
		});
	};
	
	// Default options.
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