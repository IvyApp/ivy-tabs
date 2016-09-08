import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | accessibility attributes');

test('tablists should be [role="tablist"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tablist').attr('role'), 'tablist');
  });
});

test('tablists should be [aria-multiselectable="false"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tablist').attr('aria-multiselectable'), 'false');
  });
});

test('tabs should be [role="tab"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-a').attr('role'), 'tab');
    assert.equal(findWithAssert('#basic-tab-b').attr('role'), 'tab');
    assert.equal(findWithAssert('#basic-tab-c').attr('role'), 'tab');
  });
});

test('tabs should be [aria-controls], set to the ID of their tabpanel', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-a').attr('aria-controls'), 'basic-panel-a');
    assert.equal(findWithAssert('#basic-tab-b').attr('aria-controls'), 'basic-panel-b');
    assert.equal(findWithAssert('#basic-tab-c').attr('aria-controls'), 'basic-panel-c');
  });
});

test('the active tab should be [aria-expanded="true"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-a').attr('aria-expanded'), 'true');
  });
});

test('the active tab should be [aria-selected="true"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-a').attr('aria-selected'), 'true');
  });
});

test('the inactive tabs should be [aria-expanded="false"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-b').attr('aria-expanded'), 'false');
    assert.equal(findWithAssert('#basic-tab-c').attr('aria-expanded'), 'false');
  });
});

test('the inactive tabs should be [aria-selected="false"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-b').attr('aria-selected'), 'false');
    assert.equal(findWithAssert('#basic-tab-c').attr('aria-selected'), 'false');
  });
});

test('the active tab should be [tabindex="0"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-a').attr('tabindex'), '0');
  });
});

test('the inactive tabs should not be [tabindex]', function(assert) {
  visit('/');

  andThen(function() {
    assert.notOk(findWithAssert('#basic-tab-b').is('[tabindex]'));
    assert.notOk(findWithAssert('#basic-tab-c').is('[tabindex]'));
  });
});

test('tabpanels should be [role="tabpanel"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-panel-a').attr('role'), 'tabpanel');
    assert.equal(findWithAssert('#basic-panel-b').attr('role'), 'tabpanel');
    assert.equal(findWithAssert('#basic-panel-c').attr('role'), 'tabpanel');
  });
});

test('tabpanels should be [aria-labelledby], set to the ID of their tab', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-panel-a').attr('aria-labelledby'), 'basic-tab-a');
    assert.equal(findWithAssert('#basic-panel-b').attr('aria-labelledby'), 'basic-tab-b');
    assert.equal(findWithAssert('#basic-panel-c').attr('aria-labelledby'), 'basic-tab-c');
  });
});

test('the active tabpanel should be [aria-hidden="false"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-panel-a').attr('aria-hidden'), 'false');
  });
});

test('the inactive tabpanels should be [aria-hidden="true"]', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-panel-b').attr('aria-hidden'), 'true');
    assert.equal(findWithAssert('#basic-panel-c').attr('aria-hidden'), 'true');
  });
});
