const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');

describe('AuthenticationRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should presist add token', async () => {
      // Arrange
      const token = 'refresh_token';
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      // Action
      await authenticationRepositoryPostgres.addToken(token);

      // Assert
      const refreshTokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(refreshTokens).toHaveLength(1);
      expect(refreshTokens[0]).toEqual({ token: 'refresh_token' });
    });
  });
});
