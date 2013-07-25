/*!
	Matt Tabs v2.2.1
	A simple jQuery plugin for creating tabbed interfaces.
	
	https://github.com/matthewhall/matt-tabs
*/

;(function ($, window, document, undefined) {
	"use strict";

	var MattTabs = function (element, options) {
		var self = this;

		self.element = element;
		self.$element = $(element);
		self.tabs = self.$element.children();
		self.options = $.extend({}, $.fn.mtabs.defaults, options);
		self.current_tab = 0;

		self.init();
	};

	MattTabs.prototype = {
		init: function () {
			var self = this;
			
			if (self.tabs.length) {
				// Build.
				self.build();
				self.buildTabMenu();
			}
		},

		build: function () {
			var self = this,
				opts = self.options,
				tab_text_el = opts.tab_text_el,
				container_class = opts.container_class;

			// Array to collect tab names.
			self.tab_names = [];

			// Wrap everything in a container element.
			self.$wrapper = self.$element.wrapInner('<div class="' + container_class + '" />').find('.' + container_class);

			// Wrap all tabs in a container element.
			self.tabs.wrapAll('<div class="' + opts.tabs_container_class + '" />');

			self.tabs.each(function (idx, element) {
				var name,
					$element = $(element),
					name_selector = tab_text_el;

				// Use the set element for the tab text or get
				// the first heading element and use that.
				name = $element.find(name_selector).filter(':first').hide().text();

				self.tab_names.push(name);
			});

			if ($.isFunction(opts.onReady)) {
				opts.onReady.call(self.element);
			}
		},

		// Generates the HTML markup for the tabs menu and
		// appends it to the relevant page of the page.
		buildTabMenu: function () {
			var self = this,
				opts = self.options,
				element = opts.tabsmenu_el,
				tab_names = self.tab_names,
				html = '<' + element + ' class="' + opts.tabsmenu_class + '">',
				i = 0,
				len = tab_names.length,
				child_node_name,

				// Private func to build the tab HTML.
				buildMenuHTML = function () {
					var args = arguments;

					// Replace any {0} placeholders with any text passed in as arguments.
					return opts.tmpl.tabsmenu_tab.replace(/\{[0-9]\}/g, function (str) {
						// Replace non-numeric chars and convert to number.
						var num = Number(str.replace(/\D/g, ''));

						// Return the relevant string from the args array based
						// on the placeholder number we're currently replacing.
						return args[num] || '';
					});
				};

			for (; i < len; i++) {
				// Build HTML for each tab passing in the idx and the name.
				html += buildMenuHTML((i + 1), tab_names[i]);
			}

			// Close the container.
			html += '</' + element + '>';

			// Append it before the element and assign
			// to the prototype chain for use later.
			self.$tabs_menu = $(html).prependTo(self.$wrapper);

			// Get nodeName of the tab menu children
			// so we can delegate the click event to them.
			child_node_name = self.$tabs_menu.find(':first')[0].nodeName.toLowerCase();

			// Delegate click evens to each tab.
			self.$tabs_menu.on('click', child_node_name, function (e) {
					var $this = $(this),
						// Use the tab's index to associate it with it's content.
						idx = $this.index();

					// Select the tab.
					self.show(idx);

					// Just in case an a element has been supplied as a template.
					e.preventDefault();
				})
				// Select and show the first tab.
				.find(':first').trigger('click');
		},

		// Toggle tab passing the relevant index
		show: function (idx) {
			var self = this,
				opts = self.options,
				active_tab_class = opts.active_tab_class;

			// Show the relevant tab content.
			self.tabs.hide().filter(':eq(' + idx + ')').show();

			// Switch tab class names.
			self.$tabs_menu.children().removeClass(active_tab_class).filter(':eq(' + idx + ')').addClass(active_tab_class);

			// Fire callback if defined and current tab has changed.
			if ($.isFunction(opts.onTabSelect) && idx !== self.current_tab) {
				opts.onTabSelect.call(self.element, idx);
			}

			// Update current tab reference.
			self.current_tab = idx;
		},
		
		destroy: function () {
			var self = this,
				name_selector = self.options.tab_text_el;

			self.$tabs_menu.remove();
			self.tabs.unwrap().unwrap();

			self.tabs.removeAttr('style');
			self.tabs.children(name_selector + ':first').removeAttr('style');

			self.$element.removeData('mtabs');
		}
	};

	// Add to $.fn namespace.
	$.fn.mtabs = function (options, idx) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('mtabs'),
				opts;

			opts = typeof options === 'object' && options;

			// Check if mtabs has already been applied.
			if (!data) {
				// Initialise new instance of MattTabs.
				$this.data('mtabs', (data = new MattTabs(this, opts)));
			}

			// Check for method invocation
			if (typeof options === 'string') {
				data[options](idx);
			}
		});
	};

	// Default options.
	$.fn.mtabs.defaults = {
		container_class: 'tabs', // Specifies class name(s) applied to the overall wrapping element.
		tabs_container_class: 'tabs-content', // Specifies class name(s) applied to tabs content wrapping element.
		active_tab_class: 'active-tab', // Specifies class name for currently active tab.
		tab_text_el: 'h1, h2, h3, h4, h5, h6', // Specifies element to generate the text from for each tab name.
		tabsmenu_class: 'tabs-menu', // Specifies class name(s) applied to the tabs menu element.
		tabsmenu_el: 'ul', // Specifies element to use as a wrapper for tabs menu items.
		tmpl: { // Templates used for building HTML structures. {0}: index of the menu item; {1}: Menu item text
			tabsmenu_tab: '<li class="tab-{0}"><span>{1}</span></li>'
		},
		onTabSelect: null // Optional callback function to be executed when tab switch occurs. Receives the index of the selected tab as an argument. Default is no callback.
	};
}(window.jQuery, window, document));