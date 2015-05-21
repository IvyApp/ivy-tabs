# ivy-tabs

## 1.1.0

* Upgrade addon to ember-cli 0.2.4.
* Fix an issue with initial value of `selected-index` not being applied.
* Add touch support.
* Upgrade to ember-cli 0.2.0.
* Upgrade to ember 1.10.0.

## 1.0.0

* Ensure selected-index remains 0 if all tabs are removed.
* Upgrade to ember-cli 0.1.5.
* Upgrade to ember 1.9.1 in dummy app.
* Remove unnecessary ember-data dependency in dummy app.
* Remove version suffix from ivy-tabs.js.
* More tooling changes. Should now be usable as a Bower package, outside of an
  Ember CLI app.
* Remove deprecated selectedIndex property.
* Convert to an ember-cli addon.
* Rename toplevel global from `ivy.tabs` to `IvyTabs`.

## 0.3.0

* Move away from `broccoli-dist-es6-module`. Instead, use
  `broccoli-es6-module-transpiler`, which supports the latest version of the
  ES6 module transpiler. Rather than generating separate distributions for
  `amd`, `cjs`, `named-amd` and `globals`, we now output a single "bundle"
  format.
* Deprecate `selectedIndex`, use `selected-index` instead.

## 0.2.0

* Add keyboard navigation.

## 0.1.6

* Build tooling changes.

## 0.1.5

* Fix issue with tab index being out of order. This was being caused by
  a reliance on `didInsertElement` firing in a particular order, which Ember
  doesn't guarantee. Instead, the actions are now fired inside the `init` and
  `willDestroy` methods of the component classes.

## 0.1.4

* Fix incorrect spelling of "aria-labelledby".

## 0.1.3

* Rewrite internals to make selectedIndex canonical. Previously, the "active
  tab" object was canonical, and the selectedIndex was calculated based on this
  tab's index in the tabs array. That has been flipped on its head so now, the
  "selected tab" is calculated based on the selectedIndex.
* Replace use of `Ember.computed.readOnly`. This method didn't exist prior to
  Ember 1.5.
* Change "aria-expanded" to a read-only alias.

## 0.1.2

* When active tab is removed, select the previous tab (if any).

## 0.1.1

* Ensure `ivy-tab-panel`'s `isVisible` property is a Boolean. Previously it was
  an alias to `active`, which returns a String so that it can be used as
  a classname binding. The problem is, Ember observes `isVisible` and calls
  jQuery's `toggle` function while passing in the value of `isVisible` to
  determine whether to show or hide the element.  In this case, `isVisible` was
  returning a String, which jQuery would interpret as an easing function. This
  would result in the tab panels animating in and out when switching between
  tabs.

## 0.1.0

* Initial release.
