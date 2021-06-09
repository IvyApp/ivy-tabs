import Route from '@ember/routing/route';


export default Route.extend({
  // if the user manually enters the routable-tabs route, be sure to redirect
  // to a known good instead.
  redirect() {
    this.transitionTo('routable-tabs.tab-a');
  }
});
