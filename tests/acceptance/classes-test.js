import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | classes');

test('the active tab should be .active', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(findWithAssert('#basic-tab-a').is('.active'));
  });
});

test('the inactive tabs should not be .active', function(assert) {
  visit('/');

  andThen(function() {
    assert.notOk(findWithAssert('#basic-tab-b').is('.active'));
    assert.notOk(findWithAssert('#basic-tab-c').is('.active'));
  });
});

test('the active tabpanel should be .active', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(findWithAssert('#basic-panel-a').is('.active'));
  });
});

test('the inactive tabpanels should not be .active', function(assert) {
  visit('/');

  andThen(function() {
    assert.notOk(findWithAssert('#basic-panel-b').is('.active'));
    assert.notOk(findWithAssert('#basic-panel-c').is('.active'));
  });
});
