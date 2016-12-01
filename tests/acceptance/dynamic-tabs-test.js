import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | dynamic tabs');

test('the first tab added should be selected', function(assert) {
  visit('/dynamic-tabs');
  click('.btn:contains("Add an Item")');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 1")').is('.active'));
  });
});

test('the first tab should remain selected when additional tabs are added', function(assert) {
  visit('/dynamic-tabs');
  click('.btn:contains("Add an Item")');
  click('.btn:contains("Add an Item")');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 1")').is('.active'));
  });
});

test('the next tab should become selected when the first tab is active and is removed', function(assert) {
  visit('/dynamic-tabs');
  click('.btn:contains("Add an Item")');
  click('.btn:contains("Add an Item")');
  click('[role="tab"]:contains("Item 1")');
  click('[role="tab"]:contains("Item 1") .close');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 2")').is('.active'));
  });
});

test('the previous tab should become selected when the active tab is removed', function(assert) {
  visit('/dynamic-tabs');
  click('.btn:contains("Add an Item")');
  click('.btn:contains("Add an Item")');
  click('[role="tab"]:contains("Item 2")');
  click('[role="tab"]:contains("Item 2") .close');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 1")').is('.active'));
  });
});

test('removing all tabs should not break anything', function(assert) {
  visit('/dynamic-tabs');
  click('.btn:contains("Add an Item")');
  click('[role="tab"]:contains("Item 1") .close');
  click('.btn:contains("Add an Item")');

  andThen(function() {
    assert.ok(findWithAssert('[role="tab"]:contains("Item 2")').is('.active'));
  });
});
