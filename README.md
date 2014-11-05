# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)

`ivy-tabs` provides a [WAI-ARIA][1] accessible tab component for [Ember][2].

It works with Ember 1.3 through 1.8.

Special thanks to [ic-tabs][3], which `ivy-tabs` is based on.

## Bower

```sh
$ bower install -S ivy-tabs
```

Then include `ivy-tabs.js` into your application:

```html
<script src="bower_components/ivy-tabs/ivy-tabs.js"></script>
```

## Initializer

You'll need to register the components so that they're usable from your
templates. An initializer is provided to do this for you:

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
