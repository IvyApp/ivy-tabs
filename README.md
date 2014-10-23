# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)

[WAI-ARIA][1] accessible tab component for [Ember][2]. Based on [ic-tabs][3].

## Installation

```sh
$ npm install ivy-tabs
```

or...

```sh
$ bower install ivy-tabs
```

Then include the script(s) into your application.

### npm + browserify

```js
require('ivy-tabs');
```

### amd

Register `ivy-tabs` as a [package][4], then:

```js
define(['ivy-tabs'], ...)
```

### named-amd

You ought to know what you're doing if this is the case.

### globals

```html
<script src="bower_components/ivy-tabs/dist/globals/main.js"></script>
```

You'll also need to install the initializer to make the components available in
your templates:

```js
App = Ember.Application.create(/* ... */);
App.initializer(ivy.tabs.initializer);
```

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

```sh
$ git clone # <this repo>
$ npm install
$ npm test

# during dev
$ broccoli serve
# new tab
$ testem
```

Fork this repo, make a new branch, and send a pull request. Make sure your
change is tested or it won't be merged.

[1]: http://www.w3.org/TR/wai-aria/roles#tab
[2]: http://emberjs.com
[3]: https://github.com/instructure/ic-tabs
[4]: http://requirejs.org/docs/api.html#packages
