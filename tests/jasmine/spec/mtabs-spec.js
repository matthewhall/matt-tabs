describe('Matt Tabs spec', function() {
	var $container;

	beforeEach(function() {
		$container = $('<div class="set set-1" />').appendTo('body');

		for (var i = 0; i < 4; i++) {
			$container.append('<div class="panel"><h2>Panel ' + i + '</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>');
		}
	});

	afterEach(function() {
		$('.set').remove();
	});

	describe("Initialising Matt Tabs on an element should build a new tab menu from that element's children", function() {
		it('Should create a new menu', function() {
			$container.mtabs();

			expect($container.find('.tabs-menu')).toExist();
		});

		it('Should create a tab menu item for each child', function() {
			var $menuItemsLen,
				$childrenLen = $container.children().length;

			$container.mtabs();
			$menuItemsLen = $container.find('.tabs-menu').children().length;

			expect($menuItemsLen).toEqual($childrenLen);
		});

		it('Should use the heading text from each child as the tab name', function() {
			var $menuItems,
				headingText = $container.children().map(function(idx, element) {
					element = $(element);

					return element.find('h2').text();
				}).get();

			$container.mtabs();
			$menuItems = $container.find('.tabs-menu').children();

			$menuItems.each(function(idx) {
				var tabText = $(this).text();

				expect(tabText).toMatch(headingText[idx]);
			});
		});
	});
});