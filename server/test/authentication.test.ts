import * as assert from 'assert';
import app from '../src/app';
import { cleanDatabase, givenUser } from './utils';

describe('authentication', () => {
  it('registered the authentication service', () => {
    assert.ok(app.service('authentication'));
  });
  
  describe('local strategy', () => {
    before(async () => {
      await cleanDatabase();
    });

    it('authenticates user and creates accessToken', async () => {
      const { user: mockUser } = await givenUser();
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        email: mockUser.email,
        password: mockUser.password,
      }, {});
      
      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');
    });
  });
});
