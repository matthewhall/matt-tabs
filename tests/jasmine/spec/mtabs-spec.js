describe('Matt Tabs spec', function () {
	var $container;

	beforeEach(function () {
		$container = $('<div class="set set-1" />').appendTo('body');

		for (var i = 0; i < 4; i++) {
			$container.append('<div class="panel"><h2>Panel ' + i + '</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>');
		}
	});

	afterEach(function () {
		$('.set').remove();
	});

	describe("Initialising Matt Tabs on an element should build a new tab menu from that element's children", function () {
		it('Should create a new menu', function () {
			$container.mtabs();

			expect($container.find('.tabs-menu')).toExist();
		});

		it('Should create a tab menu item for each child', function () {
			var $menuItems,
				childrenLen = $container.children().length;

			$container.mtabs();
			$menuItems = $container.find('.tabs-menu').children();

			expect($menuItems).toHaveLength(childrenLen);
		});

		it('Should use the heading text from each child as the tab name', function () {
			var $menuItems,
				headingText = $container.children().map(function (idx, element) {
					element = $(element);

					return element.find('h2').text();
				}).get();

			$container.mtabs();
			$menuItems = $container.find('.tabs-menu').children();

			$menuItems.each(function (idx) {
				var tabText = $(this).text();

				expect(tabText).toMatch(headingText[idx]);
			});
		});

		it('Should apply a click event to each tab item in the menu', function () {
			var spy,
				$menuItems;

			$container.mtabs();
			$menuItems = $container.find('.tabs-menu').children();

			spy = spyOnEvent($menuItems, 'click');
			$menuItems.filter(':last').trigger('click');

			expect(spy).toHaveBeenTriggered();
		});

		it('Should switch the "active-tab" class to the relevant tab menu item when it is clicked', function () {
			var $menuItems;

			$container.mtabs();
			$menuItems = $container.find('.tabs-menu').children();

			expect($menuItems.filter(':first')).toHaveClass('active-tab');

			$menuItems.filter(':last').trigger('click');

			expect($menuItems.filter(':first')).not.toHaveClass('active-tab');
			expect($menuItems.filter(':last')).toHaveClass('active-tab');
		});

		it('Should show the relevant content when a tab is clicked', function () {
			$container.mtabs();

			$container.find('.tabs-menu').children(':last').trigger('click');

			expect($container.find('.panel:last')).toBeVisible();

			$container.find('.tabs-menu').children(':eq(2)').trigger('click');

			expect($container.find('.panel:eq(2)')).toBeVisible();
		});
	});

	describe('Matt Tabs public methods', function () {
		it('Should show relevent tab when .mtabs("show") is invoked', function () {
			$container.mtabs();

			$container.mtabs('show', 3);

			expect($container.find('.panel:first')).not.toBeVisible();
			expect($container.find('.panel:last')).toBeVisible();

			$container.mtabs('show', 2);

			expect($container.find('.panel:last')).not.toBeVisible();
			expect($container.find('.panel:eq(2)')).toBeVisible();
		});

		it('Should destroy all traces of Matt Tabs plugin when .mtabs("destroy") is invoked', function () {
			$container.mtabs();
			$container.mtabs('destroy');

			expect($container).not.toHaveData('mtabs');
			expect($container.find('.tabs')).not.toExist();
			expect($container.find('.tabs-menu')).not.toExist();
			expect($container.find('.panel h2')).toBeVisible();
		});
	});
});