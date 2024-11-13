const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/Exeptions/AuthenticationError');

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordhash = new BcryptPasswordHash(bcrypt);

      // Action
      const encryptedPassword = await bcryptPasswordhash.hash('plain_password');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toHaveBeenCalledWith('plain_password', 10); // 10 adalah nilai salt round default untuk BcryptPasswordHash
    });
  });

  describe('compare function', () => {
    it('should throw AuthenticationError when the password not match', async () => {
      // Arrange
      const spyCompare = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const bcryptPasswordHash =  new BcryptPasswordHash(bcrypt);

      // Action & Assert
      await expect(bcryptPasswordHash.compare('', '')).rejects.toThrow(new AuthenticationError('Password anda salah'));
      expect(spyCompare).toHaveBeenCalledWith('', '');
    });

    it('should not throw AuthenticationError and successfully compare password when match', async () => {
      // Arrange
      const spyCompare = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // Action & Assert
      await expect(bcryptPasswordHash.compare('', '')).resolves.not.toThrow(new AuthenticationError);
      expect(spyCompare).toHaveBeenCalledWith('', '');
    })
  });
});
