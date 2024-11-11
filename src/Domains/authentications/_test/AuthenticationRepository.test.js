const AuthenticationRepository = require('../AuthenticationRepository');

describe('AuthenticationRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const authenticationRepository = new AuthenticationRepository();

    await expect(authenticationRepository.addToken('')).rejects.toThrow('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
