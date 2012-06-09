# Matt Tabs

A simple jQuery plugin for creating tabbed interfaces.

## Usage

### Basic
Basic usage is simple:

```javascript
$(".container").mtabs();
```
Converts all the children of .container into tabs using the first h2 element of each as the text for the tab name.

### Callbacks
```javascript
$(".container").mtabs({
	onTabSelect: function(idx) {
		// Do something here...
	}
});
```

The callback function "onTabSelect" is fired every time a tab is selected. The function is passed the index of the selected tab as an argument.

### Options
* **container_class**: Specifies class name(s) applied to the overall wrapping element.
* **tabs_container_class**: Specifies class name(s) applied to tabs content wrapping element.
* **active_tab_class**: Specifies class name for currently active tab.
* **tab_text_el**: Specifies element to generate the text from for each tab name.
* **tabmenu_class**: Specifies class name(s) applied to the tabs menu element.
* **tabsmenu_el**: Specifies element to use as a wrapper for tabs menu items.
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