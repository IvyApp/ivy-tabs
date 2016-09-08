import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | query params');

test('should select a tab by query param', function(assert) {
  visit('/query-params?tab=B');

  andThen(function() {
    assert.equal(findWithAssert('#query-params-tab-b').attr('aria-selected'), 'true');
  });
});

test('selecting a tab should update the query param', function(assert) {
  visit('/query-params?tab=B');
  click('#query-params-tab-c');

  andThen(function() {
    assert.equal(currentURL(), '/query-params?tab=C');
  });
});
