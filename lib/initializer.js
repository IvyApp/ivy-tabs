import IvyTabComponent from './components/ivy-tab';
import IvyTabListComponent from './components/ivy-tab-list';
import IvyTabPanelComponent from './components/ivy-tab-panel';
import IvyTabsComponent from './components/ivy-tabs';

export default {
  name: 'ivy-tabs',

  initialize: function(container) {
    container.register('component:ivy-tab', IvyTabComponent);
    container.register('component:ivy-tab-list', IvyTabListComponent);
    container.register('component:ivy-tab-panel', IvyTabPanelComponent);
    container.register('component:ivy-tabs', IvyTabsComponent);
  }
};
