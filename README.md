# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)
[![Ember Observer Score](http://emberobserver.com/badges/ivy-tabs.svg)](http://emberobserver.com/addons/ivy-tabs)

A group of Ember.js Components that interact to create a [WAI-ARIA tab] interface.

Special thanks to [ic-tabs], which this addon is based on.

**NOTE: This addon uses contextual components, which require Ember >= 2.3. For
older versions of Ember, use the 1.x release series of this addon.**

## Installation

```sh
$ ember install ivy-tabs
```

## Usage

```handlebars
{{#ivy-tabs as |tabs|}}
  {{#tabs.tablist as |tablist|}}
    {{#tablist.tab}}Foo{{/tablist.tab}}
    {{#tablist.tab}}Bar{{/tablist.tab}}
    {{#tablist.tab}}Baz{{/tablist.tab}}
  {{/tabs.tablist}}

  {{#tabs.tabpanel}}
    <h2>Foo</h2>
  {{/tabs.tabpanel}}

  {{#tabs.tabpanel}}
    <h2>Bar</h2>
  {{/tabs.tabpanel}}

  {{#tabs.tabpanel}}
    <h2>Baz</h2>
  {{/tabs.tabpanel}}
{{/ivy-tabs}}
```

Some things to note:

  * Associations between tabs and panels are inferred by order.

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

### Building

```sh
ember build
```

For more information on using ember-cli, visit
[http://ember-cli.com/](http://ember-cli.com/).

[WAI-ARIA tab]: http://www.w3.org/TR/wai-aria/roles#tab
[ic-tabs]: https://github.com/instructure/ic-tabs
