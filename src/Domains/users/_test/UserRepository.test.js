const UserRepository = require('../UserRepository');

describe('UserRepository interface', () => {
  it('should throw error when invoke the abstract behavior', async () => {
    const userRepository = new UserRepository();

    await expect(userRepository.addUser({})).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
