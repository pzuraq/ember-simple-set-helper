import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import User from 'dummy/models/user';

module('Integration | Helper | set', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', async function(assert) {
    await render(hbs`
      <span data-test-greeting>{{this.greeting}}</span>

      <button {{on "click" (set this.greeting "Hello!")}}>
        English
      </button>
    `);

    assert.equal(find('[data-test-greeting]').textContent.trim(), '');

    await click('button');

    assert.equal(find('[data-test-greeting]').textContent.trim(), 'Hello!');
  });

  test('it works without a value', async function(assert) {
    await render(hbs`
      <span data-test-count>{{this.count}}</span>
      <Counter @onUpdate={{set this.count}} />
    `);

    assert.equal(find('[data-test-count]').textContent.trim(), '');

    await click('button');
    await click('button');

    assert.equal(find('[data-test-count]').textContent.trim(), '2');
  });

  test('it works without a value on an object', async function(assert) {
    this.set('user', User.create({ name: 'Alice' }));
    await render(hbs`
      <span data-test-name>{{this.user.name}}</span>
      <Parent @user={{this.user}} />
    `);

    assert.dom('[data-test-name]').hasText('Alice');

    await click('button');

    assert.dom('[data-test-name]').hasText('Bob');
  });
});
