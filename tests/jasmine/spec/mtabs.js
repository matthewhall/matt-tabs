describe("Matt Tabs spec", function() {
	var tab_details = [
		{
			heading: "<h2>Panel 1</h2>",
			content: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
		},
		{
			heading: "<h2>Panel 2</h2>",
			content: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"
		},
		{
			heading: "<h2>Panel 3</h2>",
			content: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>"
		},
		{
			heading: "<h2>Panel 4</h2>",
			content: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"
		}
	];
	
	beforeEach(function() {
		var $container = $('<div class="set set-1" />').appendTo("body"),
			i = 0,
			len = tab_details.length;
		
		for (; i < len; i++) {
			$container.append('<div class="panel">' + tab_details[i].heading + tab_details[i].content + '</div>');
		}
	});
	
	afterEach(function() {
		$(".set").remove();
	});
	
	it("Should create a tabs menu from each element within the container", function() {
		var $container = $(".set-1"),
			tabs_menu_len = 0;
		
		$container.mtabs();
		
		tabs_menu_len = $container.find(".tabs-menu").children().length;
		
		expect(tabs_menu_len).toBe(tab_details.length);
	});
});