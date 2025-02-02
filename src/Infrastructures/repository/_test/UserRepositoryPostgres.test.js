const UserRepositoryPostgres = require('../UserRepositoryPostgres');
const UserTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/Exeptions/InvariantError');
const pool = require('../../database/postgres/pool');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserCredential = require('../../../Domains/users/entities/UserCredential');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UserTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username is not available', async () => {
      // Arrange
      await UserTableTestHelper.addUser({ username: 'billy' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('billy')).rejects.toThrow(InvariantError);
    });
    it('should not throw InvariantError when username is available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Asserts
      await expect(userRepositoryPostgres.verifyAvailableUsername('billy')).resolves.not.toThrow(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should presist register user', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'billy',
        password: 'secret',
        fullname: 'Billy Tan',
      });
      const fakeIdGenerator = () => 123;
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UserTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });
    it('should return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'billy',
        password: 'secret',
        fullname: 'Billy Tan',
      });
      const fakeIdGenerator = () => 123;
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'billy',
        fullname: 'Billy Tan',
      }));
    });
  });

  describe('getUserCredential function', () => {
    it('should throw Inaviant Error when user is not found', async () => {
      // Arrange
      const username = 'billy';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.getUserCredential(username)).rejects.toThrow(new InvariantError('Username tidak terdaftar'));
    });

    it('should return UserCredential object correctly', async () => {
      // Arrange
      await UserTableTestHelper.addUser({ id: 'user-123', username: 'billy', password: 'hashed_password' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action
      const { id, username, hashedPassword } = await userRepositoryPostgres.getUserCredential('billy');

      // Assert
      expect(id).toEqual('user-123');
      expect(username).toEqual('billy');
      expect(hashedPassword).toEqual('hashed_password');
    })
  });
});