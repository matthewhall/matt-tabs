/*!
	Matt Tabs v2.0
	A simple jQuery plugin for creating tabbed interfaces.
	
	https://github.com/matthewhall/matt-tabs
*/

;(function($, win, doc) {
	$.fn.mtabs = function(options) {
		var opts = $.extend({}, $.fn.mtabs.defaults, options);
		
		return this.each(function() {
			var $this = $(this),
				sets = opts.sets,
				$tab_content = opts.tabContent ? $(opts.tabContent, this) : $this.children().not(opts.tabName);
			
			if ($tab_content.length) { // Check our container actually contains something.
				for (var i = 0, len = sets.length; i < len; i++) {
					// Revert "user-friendly" array.
					sets[i] -= 1;
					
					// Create tab set containers.
					var set = $('<div class="tabs" rel="' + sets[i] + '" />');
					
					$this.append(set);
					
					$tab_content.each(function(j) {
						var index = $tab_content.index(this);
						
						// Check the tab's index and append it to the relevant tab set.
						if ((index >= sets[i] && index < sets[i + 1]) || index >= sets[len - 1]) {
							$(".tabs[rel='" + sets[i] + "']").append(this);
						}
					});
				}
				
				$this.find(".tabs").each(function(i) {
					var that = $(this),
						$sets_tab_content = opts.tabContent ? $(opts.tabContent, this) : that.children().not(opts.tabName);
					
					// Hide all tabName elements that we don't need
					// now and just show the first tabContent element.
					$sets_tab_content.filter(":gt(0)").hide().end().find(opts.tabName).hide();
					
					// Build ul for tab sets.
					that.before('<ul class="tabs-menu"></ul>');
					
					var tabmenuset = $this.find('.tabs-menu:eq(' + i + ')'),
						tabs = "";
					
					$sets_tab_content.find(opts.tabName).each(function(j) {
						var $tabtitle = $(this);
						
						// Check panel title contains text and insert 'dummy text' if required.
						if ($tabtitle.text() === "") {
							$tabtitle.text("Tab " + (j + 1));
						}
						
						// Build up tab menu.
						tabs += '<li class="tab t' + (j + 1) + '"><span>' + $tabtitle.text() + '</span></li>';
					});
					
					// Insert tab menu and add 'livetab' class to first tab.
					tabmenuset.append(tabs).find("li:first").addClass("first live-tab").find("span").addClass("live-tab").end().find("li:last").addClass("last");
					
					// Handle clicks and panel toggling.
					tabmenuset.find("li").click(function() {
						var j = tabmenuset.find("li").index(this);
						
						// Remove 'livetab' class from all tabs.
						tabmenuset.find("li").removeClass("live-tab").find("span").removeClass("live-tab");
						
						// Re-apply 'livetab' class to the relevant, active tab.
						$(this).addClass("live-tab").find("span").addClass("live-tab");
						
						// Hide all tab contents and only show relevant one.
						$sets_tab_content.hide().filter(":eq(" + j + ")").show();
					});
				});
			}
		});
	};

	$.fn.mtabs.defaults = {
		sets: [""], // Define the tabs set. Default number of sets is 1.
		tabContent: "", // Define the content to show for each tab. Leave blank to use first set of children in the container.
		tabName: "h2:first" // Define the text to use as the tab name.
	};
})(jQuery, window, document, undefined);