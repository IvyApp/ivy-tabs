import {
  IvyTabComponent,
  IvyTabListComponent,
  IvyTabPanelComponent,
  IvyTabsComponent,
  initializer
} from './ivy-tabs';

var IvyTabs = {
  'IvyTabComponent': IvyTabComponent,
  'IvyTabListComponent': IvyTabListComponent,
  'IvyTabPanelComponent': IvyTabPanelComponent,
  'IvyTabsComponent': IvyTabsComponent,
  'initializer': initializer
};

/* global define module window */
if (typeof define === 'function' && define['amd']) {
  define(function() { return IvyTabs; });
} else if (typeof module !== 'undefined' && module['exports']) {
  module['exports'] = IvyTabs;
} else if (typeof this !== 'undefined') {
  this['IvyTabs'] = IvyTabs;
}
