import Route from 'ember-route';

export default Route.extend({
  queryParams: {
    selection: {
      as: 'tab',

      // There's no sense polluting the browser history every time someone
      // changes tabs, so we'll instruct Ember to use `replaceState` instead of
      // `pushState` when this property changes.
      replace: true
    }
  }
});
