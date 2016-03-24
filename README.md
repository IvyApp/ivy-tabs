# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)

A group of [Ember.js Components] that interact to create a [WAI-ARIA tab] interface.

Special thanks to [ic-tabs], which this addon is based on.

## Installation

```sh
$ ember install ivy-tabs
```

## Usage

```handlebars
{{#ivy-tabs as |tabsContainer|}}
  {{#ivy-tab-list tabsContainer=tabsContainer as |tabList|}}
    {{#ivy-tab tabList=tabList}}Foo{{/ivy-tab}}
    {{#ivy-tab tabList=tabList}}Bar{{/ivy-tab}}
    {{#ivy-tab tabList=tabList}}Baz{{/ivy-tab}}
  {{/ivy-tab-list}}

  {{#ivy-tab-panel tabsContainer=tabsContainer}}
    <h2>Foo</h2>
  {{/ivy-tab-panel}}

  {{#ivy-tab-panel tabsContainer=tabsContainer}}
    <h2>Bar</h2>
  {{/ivy-tab-panel}}

  {{#ivy-tab-panel tabsContainer=tabsContainer}}
    <h2>Baz</h2>
  {{/ivy-tab-panel}}
{{/ivy-tabs}}
```

Some things to note:

  * Associations between tabs and tab-panes are inferred by order.
  * Both `ivy-tabs` and `ivy-tab-list` yield themselves as a parameter, which
    should be passed down to their children as `tabsContainer` and `tabList`,
    respectively.

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
[http://www.ember-cli.com/](http://www.ember-cli.com/).

[Ember.js Components]: http://emberjs.com/guides/components/
[WAI-ARIA tab]: http://www.w3.org/TR/wai-aria/roles#tab
[ic-tabs]: https://github.com/instructure/ic-tabs
