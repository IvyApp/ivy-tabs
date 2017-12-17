import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | keyboard interaction');

test('the left arrow key should select the previous tab', function(assert) {
  visit('/');
  click('#basic-tab-b');
  keyEvent('#basic-tablist', 'keydown', 37);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-a').is('[aria-selected="true"]'));
  });
});

test('the left arrow key should select the last tab if there is no previous tab', function(assert) {
  visit('/');
  keyEvent('#basic-tablist', 'keydown', 37);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-c').is('[aria-selected="true"]'));
  });
});

test('the up arrow key should select the previous tab', function(assert) {
  visit('/');
  click('#basic-tab-b');
  keyEvent('#basic-tablist', 'keydown', 38);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-a').is('[aria-selected="true"]'));
  });
});

test('the up arrow key should select the last tab if there is no previous tab', function(assert) {
  visit('/');
  keyEvent('#basic-tablist', 'keydown', 38);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-c').is('[aria-selected="true"]'));
  });
});

test('the right arrow key should select the next tab', function(assert) {
  visit('/');
  keyEvent('#basic-tablist', 'keydown', 39);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-b').is('[aria-selected="true"]'));
  });
});

test('the right arrow key should select the first tab if there is no next tab', function(assert) {
  visit('/');
  click('#basic-tab-c');
  keyEvent('#basic-tablist', 'keydown', 39);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-a').is('[aria-selected="true"]'));
  });
});

test('the down arrow key should select the next tab', function(assert) {
  visit('/');
  keyEvent('#basic-tablist', 'keydown', 40);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-b').is('[aria-selected="true"]'));
  });
});

test('the down arrow key should select the first tab if there is no next tab', function(assert) {
  visit('/');
  click('#basic-tab-c');
  keyEvent('#basic-tablist', 'keydown', 40);

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-a').is('[aria-selected="true"]'));
  });
});
