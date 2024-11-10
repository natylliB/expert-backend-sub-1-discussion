const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');

describe('AddUserUseCase', () => {
  it('should orchestrating the add use action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'billy',
      password: 'secret',
      fullname: 'Billy Tan',
    };

    const mockRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    /** Creating dependency use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    /** Mocking the required dependency functions */
    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));

    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredUser));

    /** Creating use case instance */
    const addUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const registeredUser = await addUserUseCase.execute(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    }));
    expect(mockUserRepository.verifyAvailableUsername).toHaveBeenCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toHaveBeenCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
})