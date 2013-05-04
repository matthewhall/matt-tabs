describe('Matt Tabs spec', function() {
	beforeEach(function() {
		var $container = $('<div class="set set-1" />').appendTo('body'),
			$empty = $('<div class="set set-2" />').appendTo('body'),
			i = 0;

		for (; i < 4; i++) {
			$container.append('<div class="panel"><h2>Panel ' + i + '</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>');
		}
	});

	afterEach(function() {
		$('.set').remove();
	});
});