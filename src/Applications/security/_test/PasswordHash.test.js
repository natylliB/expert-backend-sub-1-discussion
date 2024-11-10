const PasswordHash = require('../PasswordHash');

describe('PasswordHash tool interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const passwordHash= new PasswordHash();

    await expect(passwordHash.hash('dummy_password')).rejects.toThrow('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});