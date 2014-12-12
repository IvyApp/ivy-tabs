# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)

A group of [Ember.js Components] that interact to create a [WAI-ARIA tab] interface.

Special thanks to [ic-tabs], which this addon is based on.

## Installation

### As an Ember CLI addon

Use this addon in your ember-cli application:

```sh
npm install --save-dev IvyApp/ivy-tabs
```

### As a standalone library

Copy to your vendor directory and link up the .js file.

## Usage

```handlebars
{{#ivy-tabs}}
  {{#ivy-tab-list}}
    {{#ivy-tab}}Foo{{/ivy-tab}}
    {{#ivy-tab}}Bar{{/ivy-tab}}
    {{#ivy-tab}}Baz{{/ivy-tab}}
  {{/ivy-tab-list}}

  {{#ivy-tab-panel}}
    <h2>Foo</h2>
  {{/ivy-tab-panel}}

  {{#ivy-tab-panel}}
    <h2>Bar</h2>
  {{/ivy-tab-panel}}

  {{#ivy-tab-panel}}
    <h2>Baz</h2>
  {{/ivy-tab-panel}}
{{/ivy-tabs}}
```

Some things to note:

  * Associations between tabs and tab-panes are inferred by order.
  * `ivy-tab-list` must be an immediate child of `ivy-tabs`.
  * `ivy-tab` must be an immediate child of `ivy-tab-list`.
  * `ivy-tab-panel` must be an immediate child of `ivy-tabs`.

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

Also see the [standalone] readme file for a non Ember CLI release.

[Ember.js Components]: http://emberjs.com/guides/components/
[WAI-ARIA tab]: http://www.w3.org/TR/wai-aria/roles#tab
[ic-tabs]: https://github.com/instructure/ic-tabs
[standalone]: https://github.com/IvyApp/ivy-tabs/blob/master/standalone/README.md
