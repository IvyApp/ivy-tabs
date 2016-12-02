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
});

test('should select correct next tab after bulk removal', function(assert) {
  visit('/dynamic-tabs');
  click('.btn:contains("Add an Item")');
  click('.btn:contains("Add an Item")');
  click('.btn:contains("Add an Item")');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 1")').is('[aria-selected="true"]'), 'Item 1 is selected');
  });

  click('input[type="checkbox"]:eq(0)');
  click('input[type="checkbox"]:eq(1)');
  click('.btn:contains("Remove 2 Item(s)")');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 3")').is('[aria-selected="true"]'), 'Item 3 is selected');
  });
});
