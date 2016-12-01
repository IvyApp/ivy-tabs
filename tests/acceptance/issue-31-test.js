import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

// https://github.com/IvyApp/ivy-tabs/issues/31
moduleForAcceptance('Acceptance | issue #31');

test('should keep Tab A selected when navigating between demo pages', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('[role="tab"][aria-selected="true"]').text().trim(), 'Tab A');
  });

  visit('/query-params');
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('[role="tab"][aria-selected="true"]').text().trim(), 'Tab A');
  });

  visit('/query-params');
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('[role="tab"][aria-selected="true"]').text().trim(), 'Tab A');
  });
});
