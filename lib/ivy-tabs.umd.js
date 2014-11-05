import {
  IvyTabComponent,
  IvyTabListComponent,
  IvyTabPanelComponent,
  IvyTabsComponent,
  initializer
} from './ivy-tabs';

var tabs = {
  'IvyTabComponent': IvyTabComponent,
  'IvyTabListComponent': IvyTabListComponent,
  'IvyTabPanelComponent': IvyTabPanelComponent,
  'IvyTabsComponent': IvyTabsComponent,
  'initializer': initializer
};

/* global define module window */
if (typeof define === 'function' && define['amd']) {
  define(function() { return tabs; });
} else if (typeof module !== 'undefined' && module['exports']) {
  module['exports'] = tabs;
} else if (typeof this !== 'undefined') {
  this['ivy'] = this['ivy'] || {};
  this['ivy']['tabs'] = tabs;
}
