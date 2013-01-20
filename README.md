# Matt Tabs

A simple, unobtrusive jQuery plugin for creating tabbed interfaces.

## Usage
Matt Tabs tries to be as lightweight and unobtrusive as possible. As such, it doesn't require any additional HTML to be added into your markup to use for a tabs menu. Instead, when `mtabs` is applied to an element it will use pre-existing markup for the tab text and then will build and insert all the HTML it needs.

The element used for the tab text, amongst other things, can be adjusted as described below. A full list of customisable options is also below.

### Basic
Basic usage is simple:

```javascript
$(".container").mtabs();
```
Converts all the children of `.container` into tabs and inserts the tabs menu before them.

### Adjusting the tab text element
If you need to you can change the element used to generate the tab text for the menu.

This is done by supplying a valid jQuery selector to the `tab_text_el` property when initialising Matt Tabs on an element.

```javascript
$(".container").mtabs({
	tab_text_el: ".heading"
});
```

The plugin will then find the first `.heading` element within each child of `.container` and use that instead.

Also, you can supply multiple selectors separated by a comma if, for example, `.heading` wasn't available in each element. Something like this: `.heading, .header`.

### Callbacks
```javascript
$(".container").mtabs({
	onTabSelect: function(idx) {
		// Do something here...
	}
});
```

The callback function, `onTabSelect`, is fired every time a tab is selected. The function is passed the index of the selected tab as an argument.

### Methods
####.mtabs('show', index)

Show particular tab in a given tab set. Index is 0-based.

For example, this will show the third tab in a tab set:

```javascript
$(".container").mtabs('show', 2);
```

### Options
* **container_class**: Specifies class name(s) applied to the overall wrapping element. Default is `tabs`.
* **tabs_container_class**: Specifies class name(s) applied to tabs content wrapping element. Default is `tabs-content`.
* **active_tab_class**: Specifies class name for currently active tab. Default is `active-tab`.
* **tab_text_el**: Specifies element to generate the text from for each tab name. Default is the first `h1-6` element within each element.
* **tabmenu_class**: Specifies class name(s) applied to the tabs menu element. Default is `tabs-menu`.
* **tabsmenu_el**: Specifies element to use as a wrapper for tabs menu items. Default is a `ul` element.
* **tmpl**: Templates used for building HTML structures.
* **onTabSelect**: Optional callback function to be executed when tab switch occurs. Receives the index of the selected tab as an argument. Default is no callback.

## Requires
* jQuery 1.7+

## Browser Support
* Chrome
* Firefox 3.6+
* Safari 4+
* Opera 10+
* IE6+

## Forecast
Here's a few of the features I had in mind for future releases of Matt Tabs:

* Show a tab based on URL parameters. This would allow linking to a URL and showing a specific possible with something like this: `http://example.com/?mtabs-1=3`. This would show tab number 3 in the first set of Matt Tabs on the page.
* Optional fade transitions for hiding and showing tab content.