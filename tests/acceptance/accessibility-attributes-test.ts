import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findTab, findTabPanel } from '../helpers/finders';

module('Acceptance | accessibility attributes', hooks => {
  setupApplicationTest(hooks);

  test('tablists should be [role="tablist"]', async assert => {
    await visit('/');

    assert.dom('#basic-tablist').hasAttribute('role', 'tablist');
  });

  test('tablists should be [aria-live="polite"]', async assert => {
    await visit('/');

    assert.dom('#basic-tablist').hasAttribute('aria-live', 'polite');
  });

  test('tablists should be [aria-relevant="all"]', async assert => {
    await visit('/');

    assert.dom('#basic-tablist').hasAttribute('aria-relevant', 'all');
  });

  test('tablists should be [aria-multiselectable="false"]', async assert => {
    await visit('/');

    assert.dom('#basic-tablist').hasAttribute('aria-multiselectable', 'false');
  });

  test('tablists should allow [aria-label] to be used', async assert => {
    await visit('/');

    assert.dom('#basic-tablist').hasAttribute('aria-label', 'Example Tabs');
  });

  test('tabs should be [role="tab"]', async assert => {
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('role'), 'tab');
    assert.equal(findTab('Tab B').getAttribute('role'), 'tab');
    assert.equal(findTab('Tab C').getAttribute('role'), 'tab');
  });

  test('tabs should be [aria-controls], set to the ID of their tabpanel', async assert => {
    await visit('/');

    assert.equal(
      findTab('Tab A').getAttribute('aria-controls'),
      'basic-panel-a'
    );
    assert.equal(
      findTab('Tab B').getAttribute('aria-controls'),
      'basic-panel-b'
    );
    assert.equal(
      findTab('Tab C').getAttribute('aria-controls'),
      'basic-panel-c'
    );
  });

  test('the active tab should be [aria-expanded="true"]', async assert => {
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('aria-expanded'), 'true');
  });

  test('the active tab should be [aria-selected="true"]', async assert => {
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
  });

  test('the inactive tabs should be [aria-expanded="false"]', async assert => {
    await visit('/');

    assert.equal(findTab('Tab B').getAttribute('aria-expanded'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-expanded'), 'false');
  });

  test('the inactive tabs should be [aria-selected="false"]', async assert => {
    await visit('/');

    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });

  test('the active tab should be [tabindex="0"]', async assert => {
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('tabindex'), '0');
  });

  test('the inactive tabs should not be [tabindex]', async assert => {
    await visit('/');

    assert.notOk(findTab('Tab B').getAttribute('tabindex'));
    assert.notOk(findTab('Tab C').getAttribute('tabindex'));
  });

  test('tabpanels should be [role="tabpanel"]', async assert => {
    await visit('/');

    assert.equal(findTabPanel('Tab A').getAttribute('role'), 'tabpanel');
    assert.equal(findTabPanel('Tab B').getAttribute('role'), 'tabpanel');
    assert.equal(findTabPanel('Tab C').getAttribute('role'), 'tabpanel');
  });

  test('tabpanels should be [aria-labelledby], set to the ID of their tab', async assert => {
    await visit('/');

    assert.equal(
      findTabPanel('Tab A').getAttribute('aria-labelledby'),
      'basic-tab-a'
    );
    assert.equal(
      findTabPanel('Tab B').getAttribute('aria-labelledby'),
      'basic-tab-b'
    );
    assert.equal(
      findTabPanel('Tab C').getAttribute('aria-labelledby'),
      'basic-tab-c'
    );
  });

  test('the active tabpanel should be [aria-hidden="false"]', async assert => {
    await visit('/');

    assert.equal(findTabPanel('Tab A').getAttribute('aria-hidden'), 'false');
  });

  test('the inactive tabpanels should be [aria-hidden="true"]', async assert => {
    await visit('/');

    assert.equal(findTabPanel('Tab B').getAttribute('aria-hidden'), 'true');
    assert.equal(findTabPanel('Tab C').getAttribute('aria-hidden'), 'true');
  });

  test('the active tabpanel should be [tabindex="0"]', async assert => {
    await visit('/');

    assert.equal(findTabPanel('Tab A').getAttribute('tabindex'), '0');
  });
});
