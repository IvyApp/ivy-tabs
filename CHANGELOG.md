# ivy-tabs

[![Build Status](https://travis-ci.org/IvyApp/ivy-tabs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-tabs)

See [changes since release][HEAD].

* No longer trigger selection actions during Component destruction.
* [#33](https://github.com/IvyApp/ivy-tabs/pull/33) Remove jQuery usage. Thanks to @smfoote and @dxprog.
* [#37](https://github.com/IvyApp/ivy-tabs/pull/37) Move to modules API. Thanks to @sutori.

## [3.1.0][] / 2016-12-02

* [#32](https://github.com/IvyApp/ivy-tabs/pull/32) Add Ember 2.10 support.

## [3.0.2][] / 2016-10-14

* Remove `throw` when a tab is not found by index or model. Add "dynamic tabs" example page to the dummy app.
* Switch from globals to modules.

## [3.0.1][] / 2016-10-12

* [#25](https://github.com/IvyApp/ivy-tabs/issues/25) Fix a deprecation warning when tab panels are defined before the tab list.

## [3.0.0][] / 2016-08-31

**This release introduces several breaking changes from the 2.x series.** Refer
to the README for current usage.

* [#24](https://github.com/IvyApp/ivy-tabs/pull/24) "Namespace" components under `ivy-tabs-*`
* [#23](https://github.com/IvyApp/ivy-tabs/pull/23) Remove `tagName` values except for tabs, which are now anchor tags by default.
* [#21](https://github.com/IvyApp/ivy-tabs/pull/21) Select tabs by a (now required) model value, rather than tab index.
    * Rename `selectedIndex` on `ivy-tabs` to `selection`.
    * Move `on-select` action from `ivy-tabs` to individual tabs.
* [#22](https://github.com/IvyApp/ivy-tabs/pull/22) Remove isVisible manipulation and rely on application styles for presentation management.

## [2.0.0][] / 2016-04-17

**This release drops support for Ember < 2.3.**

* [#13](https://github.com/IvyApp/ivy-tabs/pull/13) Data down, Actions up.
* [#15](https://github.com/IvyApp/ivy-tabs/pull/15) Add aria-hidden to ivy-tab-panel.
* [#12](https://github.com/IvyApp/ivy-tabs/pull/12) Convert to contextual components.
* Upgrade to Ember CLI 2.5.0.

## [1.2.0][] / 2016-03-24

* Upgrade `ember-cli` to 2.4.2.
* Use block params instead of `parentView`.
* Remove index file.
* Remove standalone builds.
* Select the next tab when the active, first tab is removed.
* Retain tab selection if a preceding tab is removed.

## [1.1.0][] / 2015-05-21

* Upgrade addon to ember-cli 0.2.4.
* Fix an issue with initial value of `selected-index` not being applied.
* Add touch support.
* Upgrade to ember-cli 0.2.0.
* Upgrade to ember 1.10.0.

## [1.0.0][] / 2015-02-19

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

## [0.3.0][] / 2014-11-05

* Move away from `broccoli-dist-es6-module`. Instead, use
  `broccoli-es6-module-transpiler`, which supports the latest version of the
  ES6 module transpiler. Rather than generating separate distributions for
  `amd`, `cjs`, `named-amd` and `globals`, we now output a single "bundle"
  format.
* Deprecate `selectedIndex`, use `selected-index` instead.

## [0.2.0][] / 2014-11-03

* Add keyboard navigation.

## [0.1.6][] / 2014-11-04

* Build tooling changes.

## [0.1.5][] / 2014-11-03

* Fix issue with tab index being out of order. This was being caused by
  a reliance on `didInsertElement` firing in a particular order, which Ember
  doesn't guarantee. Instead, the actions are now fired inside the `init` and
  `willDestroy` methods of the component classes.

## [0.1.4][] / 2014-11-01

* Fix incorrect spelling of "aria-labelledby".

## [0.1.3][] / 2014-11-01

* Rewrite internals to make selectedIndex canonical. Previously, the "active
  tab" object was canonical, and the selectedIndex was calculated based on this
  tab's index in the tabs array. That has been flipped on its head so now, the
  "selected tab" is calculated based on the selectedIndex.
* Replace use of `Ember.computed.readOnly`. This method didn't exist prior to
  Ember 1.5.
* Change "aria-expanded" to a read-only alias.

## [0.1.2][] / 2014-10-30

* When active tab is removed, select the previous tab (if any).

## [0.1.1][] / 2014-10-23

* Ensure `ivy-tab-panel`'s `isVisible` property is a Boolean. Previously it was
  an alias to `active`, which returns a String so that it can be used as
  a classname binding. The problem is, Ember observes `isVisible` and calls
  jQuery's `toggle` function while passing in the value of `isVisible` to
  determine whether to show or hide the element.  In this case, `isVisible` was
  returning a String, which jQuery would interpret as an easing function. This
  would result in the tab panels animating in and out when switching between
  tabs.

## [0.1.0][] / 2014-10-23

* Initial release.

[0.1.0]: https://github.com/IvyApp/ivy-tabs/tree/v0.1.0
[0.1.1]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.0...v0.1.1
[0.1.2]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.1...v0.1.2
[0.1.3]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.2...v0.1.3
[0.1.4]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.3...v0.1.4
[0.1.5]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.4...v0.1.5
[0.1.6]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.5...v0.1.6
[0.2.0]: https://github.com/IvyApp/ivy-tabs/compare/v0.1.6...v0.2.0
[0.3.0]: https://github.com/IvyApp/ivy-tabs/compare/v0.2.0...v0.3.0
[1.0.0]: https://github.com/IvyApp/ivy-tabs/compare/v0.3.0...v1.0.0
[1.1.0]: https://github.com/IvyApp/ivy-tabs/compare/v1.0.0...v1.1.0
[1.2.0]: https://github.com/IvyApp/ivy-tabs/compare/v1.1.0...v1.2.0
[2.0.0]: https://github.com/IvyApp/ivy-tabs/compare/v1.2.0...v2.0.0
[3.0.0]: https://github.com/IvyApp/ivy-tabs/compare/v2.0.0...v3.0.0
[3.0.1]: https://github.com/IvyApp/ivy-tabs/compare/v3.0.0...v3.0.1
[3.0.2]: https://github.com/IvyApp/ivy-tabs/compare/v3.0.1...v3.0.2
[3.1.0]: https://github.com/IvyApp/ivy-tabs/compare/v3.0.2...v3.1.0
[HEAD]: https://github.com/IvyApp/ivy-tabs/compare/v3.1.0...master
