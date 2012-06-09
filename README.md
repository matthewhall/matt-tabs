# Matt Tabs

A simple, unobtrusive jQuery plugin for creating tabbed interfaces.

## Usage
Matt Tabs tries to be as lightweight and unobtrusive as possible. As such, it doesn't require any additional HTML to be added into your markup to use for a tabs menu. Instead, when `mtabs` is applied to an element it will to build and insert the HTML for the menu based on pre-existing markup within each child element.

### Basic
Basic usage is simple:

```javascript
$(".container").mtabs();
```
Converts all the children of .container into tabs using the first `h1-6` element of each as the text for the tab name.

### Callbacks
```javascript
$(".container").mtabs({
	onTabSelect: function(idx) {
		// Do something here...
	}
});
```

The callback function `onTabSelect` is fired every time a tab is selected. The function is passed the index of the selected tab as an argument.

### Options
* **container_class**: Specifies class name(s) applied to the overall wrapping element. Default is `tabs`.
* **tabs_container_class**: Specifies class name(s) applied to tabs content wrapping element. Default is `tabs-content`.
* **active_tab_class**: Specifies class name for currently active tab. Default is `active-tab`.
* **tab_text_el**: Specifies element to generate the text from for each tab name. Default is the first `h1-6` element in each element.
* **tabmenu_class**: Specifies class name(s) applied to the tabs menu element. Default is `tabs-menu`
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