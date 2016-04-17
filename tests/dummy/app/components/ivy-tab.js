import Ember from 'ember';
import IvyTabComponent from 'ivy-tabs/components/ivy-tab';

export default IvyTabComponent.extend({
  tagName: 'li',

  actions: {
    select() {
      this.select();
    }
  },

  panelHref: Ember.computed('aria-controls', function() {
    return '#' + this.get('aria-controls');
  })
});
