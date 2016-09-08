import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | basics');

test('should select the first tab by default', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(findWithAssert('#basic-tab-a').attr('aria-selected'), 'true');
  });
});
