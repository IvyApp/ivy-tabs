import { click, triggerKeyEvent, visit } from '@ember/test-helpers';
import { findTab } from '../helpers/finders';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@puppet/ivy-tabs/components/ivy-tabs-tablist';

module('Acceptance | keyboard interaction', function (hooks) {
  setupApplicationTest(hooks);

  test('the left arrow key should select the previous tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab B'));
    await triggerKeyEvent(findTab('Tab B'), 'keydown', LEFT_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });

  test('the left arrow key should select the last tab if there is no previous tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab A'));
    await triggerKeyEvent(findTab('Tab A'), 'keydown', LEFT_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'true');
  });

  test('the up arrow key should select the previous tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab B'));
    await triggerKeyEvent(findTab('Tab B'), 'keydown', UP_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });

  test('the up arrow key should select the last tab if there is no previous tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab A'));
    await triggerKeyEvent(findTab('Tab A'), 'keydown', UP_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'true');
  });

  test('the right arrow key should select the next tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab A'));
    await triggerKeyEvent(findTab('Tab A'), 'keydown', RIGHT_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'true');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });

  test('the right arrow key should select the first tab if there is no next tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab C'));
    await triggerKeyEvent(findTab('Tab C'), 'keydown', RIGHT_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });

  test('the down arrow key should select the next tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab A'));
    await triggerKeyEvent(findTab('Tab A'), 'keydown', DOWN_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'true');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });

  test('the down arrow key should select the first tab if there is no next tab', async function (assert) {
    await visit('/');
    await click(findTab('Tab C'));
    await triggerKeyEvent(findTab('Tab C'), 'keydown', DOWN_ARROW);

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'false');
    assert.equal(findTab('Tab C').getAttribute('aria-selected'), 'false');
  });
});
