# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=IvyApp/ivy-tabs)](https://dependabot.com)
[![Ember Observer Score](http://emberobserver.com/badges/ivy-tabs.svg)](http://emberobserver.com/addons/ivy-tabs)

A group of Ember.js Components that interact to create a [WAI-ARIA tab] interface.

Special thanks to [ic-tabs], which this addon is based on.

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Installation

```sh
$ ember install ivy-tabs
```

## Usage

### Templates

```handlebars
<IvyTabs @selection={{this.selection}} as |tabs|}}
  <tabs.tablist @tagName="ul" as |tablist|>
    <li>
      <tablist.tab @model="TabA" @onSelect={{action (mut this.selection)}}>Foo</tablist.tab>
    </li>
    <li>
      <tablist.tab @model="TabB" @onSelect={{action (mut this.selection)}}>Bar</tablist.tab>
    </li>
    <li>
      <tablist.tab @model="TabC" @onSelect={{action (mut this.selection)}}>Baz</tablist.tab>
    </li>
  </tabs.tablist>

  <tabs.tabpanel @model="TabA">
    <h2>Foo</h2>
  </tabs.tabpanel>

  <tabs.tabpanel @model="TabB">
    <h2>Bar</h2>
  </tabs.tabpanel>

  <tabs.tabpanel @model="TabC">
    <h2>Baz</h2>
  </tabs.tabpanel>
</IvyTabs>
```

Some things to note:

  * Associations between tabs and panels are explicitly defined by the "models"
    given to them. In the above example, the
    given tab models are "TabA", "TabB", and "TabC". This model could be any
    JavaScript Object that you'd like, they are not required to be strings.
  * An `onSelect` action is sent when a tab is selected. As an argument, it
    receives the model defined on the tab (for example, when the Foo tab is
    selected, the `onSelect` event will carry "TabA" as an argument).

### Presentation

ivy-tabs does not make any assumptions about how you will present your tabs.
Specifically, this means that ivy-tabs will not automatically hide unselected
tab panels. Rather, you should update your application styles to reflect your
needs.

In an ideal world, your application would carry a CSS rule similar to the
following:

```css
[aria-hidden="true"] {
  display: none;
}
```

If, for some reason, your target audience does not support CSS attribute
selectors, you may also opt to instead rely on the ivy-tabs classes by
defaulting all panels to being hidden and only displaying the active panel
using CSS rules similar to (remember, `.active` will be different if you
override the `activeClass` property of your ivy-tabs-tabpanel):

```css
.ivy-tabs-tabpanel {
  display: none;
}

.ivy-tabs-tabpanel.active {
  display: block;
}
```


## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your
change is tested or it won't be merged.

### Installation

```sh
git clone git@github.com:IvyApp/ivy-tabs.git
cd ivy-tabs
npm install
```

### Running

```sh
ember server
```

Then visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

```sh
ember test
```

Or, to start a test server:

```sh
ember test --server
```

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

```sh
ember build
```

For more information on using ember-cli, visit
[http://ember-cli.com/](http://ember-cli.com/).

[WAI-ARIA tab]: http://www.w3.org/TR/wai-aria/roles#tab
[ic-tabs]: https://github.com/instructure/ic-tabs
