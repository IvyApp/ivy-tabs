import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | mouse interaction');

test('clicking a tab should select it', function(assert) {
  visit('/');
  click('#basic-tab-b');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-b').attr('aria-selected'), 'true');
  });
});
