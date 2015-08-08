describe('Matt Tabs spec', function () {
	var $container;

	beforeEach(function () {
		$container = $('<div class="set set-1" />').appendTo('body');

		for (var i = 0; i < 4; i++) {
			$container.append('<div class="panel"><h2>Panel ' + (i + 1) + '</h2><header class="alt-head">Heading ' + (i + 1) + '</header><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>');
		}
	});

	afterEach(function () {
		$('.set').remove();
	});

	it('Should wrap all the children in wrapping div with a class of "tabs"', function () {
		$container.mtabs();

		expect($container.children(':first')).toHaveClass('tabs');
	});

	it('Should hide all children except for the first', function () {
		var $panels = $container.children();

		$container.mtabs();

		expect($panels.filter(':first')).toBeVisible();
		expect($panels.filter(':not(:first)')).toBeHidden();
	});

	it('Should do nothing if the container is empty', function () {
		$container.children().remove();

		$container.mtabs();

		expect($container.find('.tabs')).not.toExist();
		expect($container.find('.tabs-menu')).not.toExist();
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

		xit('Should apply a click event to each tab item in the menu', function () {
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

	describe('Plugin customization', function () {
		it('Should allow the container class to be adjusted', function () {
			$container.mtabs({
				container_class: 'some-class'
			});

			expect($container.children(':first')).toHaveClass('some-class');
		});

		it('Should allow the tabs container class to be adjusted', function () {
			$container.mtabs({
				tabs_container_class: 'content'
			});

			expect($container.find('.tabs').children(':last')).toHaveClass('content');
		});

		it('Should allow the tabs-menu class to be adjusted', function () {
			$container.mtabs({
				tabsmenu_class: 'menu'
			});

			expect($container.find('.tabs').children(':first')).toHaveClass('menu');
		});

		it('Should allow the active tab class to be adjusted', function () {
			var $menuItems;

			$container.mtabs({
				active_tab_class: 'current'
			});

			$menuItems = $container.find('.tabs-menu').children();

			expect($menuItems.filter(':first')).toHaveClass('current');

			$menuItems.filter(':last').trigger('click');

			expect($menuItems.filter(':first')).not.toHaveClass('current');
			expect($menuItems.filter(':last')).toHaveClass('current');
		});

		it('Should allow the element used for the tab menu text to be adjusted', function () {
			var $menuItems,
				headingText = $container.children().map(function (idx, element) {
					element = $(element);

					return element.find('.alt-head').text();
				}).get();

			$container.mtabs({
				tab_text_el: '.alt-head'
			});
			$menuItems = $container.find('.tabs-menu').children();

			$menuItems.each(function (idx) {
				var tabText = $(this).text();

				expect(tabText).toMatch(headingText[idx]);
			});
		});

		it('Should allow the tabs menu element to be adjusted', function () {
			$container.mtabs({
				tabsmenu_el: 'ol'
			});

			expect($container.find('ol.tabs-menu')).toExist();
		});

		it('Should allow the HTML used for the tab menu items to be adjusted', function () {
			var $menuItems;

			$container.mtabs({
				tabsmenu_el: 'div',
				tmpl: {
					tabsmenu_tab: '<div id="tab-{0}" class="item"><span class="item-inner">{1}</span></div>'
				}
			});

			$menuItems = $container.find('.tabs-menu').children();

			$menuItems.each(function (idx) {
				var $this = $(this);

				idx += 1;

				expect($this.is('div')).toBe(true);
				expect($this).toHaveClass('item');
				expect($this).toHaveId('tab-' + idx);
				expect($this).toHaveHtml('<span class="item-inner">Panel ' + idx + '</span>');
			});
		});

		it('Should invoke a callback function (if one is provided) when a tab menu item is clicked, passing the index of the clicked tab as an argument', function () {
			var dummyFunc = {
					func: function (idx) {
						var i = idx;
					}
				},
				spy,
				$menuItems;

			spyOn(dummyFunc, 'func');

			$container.mtabs({
				onTabSelect: dummyFunc.func
			});

			$menuItems = $container.find('.tabs-menu').children();

			$menuItems.filter(':last').trigger('click');

			expect(dummyFunc.func).toHaveBeenCalled();
			expect(dummyFunc.func).toHaveBeenCalledWith(3);

			$menuItems.filter(':eq(1)').trigger('click');

			expect(dummyFunc.func).toHaveBeenCalled();
			expect(dummyFunc.func).toHaveBeenCalledWith(1);
		});

		it('Should invoke a callback function (if one is provided) when mtabs has been instantiated', function () {
			var dummyFunc = {
					func: function () {}
				};

			spyOn(dummyFunc, 'func');

			$container.mtabs({
				onReady: dummyFunc.func
			});

			expect(dummyFunc.func).toHaveBeenCalled();
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
