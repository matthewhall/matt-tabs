# Matt Tabs

A simple jQuery plugin for creating tabbed interfaces.

## Usage

Basic usage is simple:

```javascript
$(".container").mtabs();
```

##Options

###Sets

You can define multiple sets of tabs in one container. Use the "sets" option like so:

```javascript
$(".container").mtabs({
	sets: [1, 5]
});
```

This will define one set of tabs from child elements 1 to 4 and the other from child elements 5 to the last. Default is one set only.

###Tab Name

Redefine the element text used for the tab name like so:

```javascript
$(".container").mtabs({
	tabName: ".heading:first"
});
```

The default is the first h2 text.

###Tab Content

Redefine the element content used for the tab content:

```javascript
$(".container").mtabs({
	tabContent: ".body"
});
```

## Browser Support

* Chrome
* Firefox 3.6+
* Safari 4+
* Opera 10+
* IE6+