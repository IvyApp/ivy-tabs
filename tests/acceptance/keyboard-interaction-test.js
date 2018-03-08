import jQuery from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, triggerKeyEvent, visit } from '@ember/test-helpers';

const KEYS = {
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  UP_ARROW: 38
};

module('Acceptance | keyboard interaction', function(hooks) {
  setupApplicationTest(hooks);

  test('the left arrow key should select the previous tab', async function(assert) {
    await visit('/');
    await click('#basic-tab-b');
    await triggerKeyEvent('#basic-tablist', 'keydown', KEYS.LEFT_ARROW);

    assert.equal(jQuery('a#basic-tab-a').attr('aria-selected'), 'true');
  });

  test('the left arrow key should select the last tab if there is no previous tab', async function(assert) {
    await visit('/');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.LEFT_ARROW);

    assert.ok(jQuery('#basic-tab-c').attr('aria-selected'), 'true');
  });

  test('the up arrow key should select the previous tab', async function(assert) {
    await visit('/');
    await click('#basic-tab-b');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.UP_ARROW);

    assert.ok(jQuery('#basic-tab-a').attr('aria-selected'), 'true');
  });

  test('the up arrow key should select the last tab if there is no previous tab', async function(assert) {
    await visit('/');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.UP_ARROW);

    assert.ok(jQuery('#basic-tab-c').attr('aria-selected'), 'true');
  });

  test('the right arrow key should select the next tab', async function(assert) {
    await visit('/');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.RIGHT_ARROW);

    assert.ok(jQuery('#basic-tab-b').attr('aria-selected'), 'true');
  });

  test('the right arrow key should select the first tab if there is no next tab', async function(assert) {
    await visit('/');
    await click('#basic-tab-c');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.RIGHT_ARROW);

    assert.ok(jQuery('#basic-tab-a').attr('aria-selected'), 'true');
  });

  test('the down arrow key should select the next tab', async function(assert) {
    await visit('/');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.DOWN_ARROW);

    assert.ok(jQuery('#basic-tab-b').attr('aria-selected'), 'true');
  });

  test('the down arrow key should select the first tab if there is no next tab', async function(assert) {
    await visit('/');
    await click('#basic-tab-c');
    triggerKeyEvent('#basic-tablist', 'keydown', KEYS.DOWN_ARROW);

    assert.ok(jQuery('#basic-tab-a').attr('aria-selected'), 'true');
  });
});
