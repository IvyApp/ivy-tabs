import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | mouse interaction');

test('touching a tab (on a touch device) should select it', function(assert) {
  visit('/');
  triggerEvent('#basic-tab-b', 'touchend');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-b').attr('aria-selected'), 'true');
  });
});
