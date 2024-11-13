const AuthenticationUseCase = require('../AuthenticationUseCase');
const LoginCredential = require('../../../Domains/users/entities/LoginCredential');
const UserCredential = require('../../../Domains/users/entities/UserCredential');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const AuthenticationTokenManager = require('../../tokenize/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');

// Mock LoginCredential to track if LoginCredential object being created
jest.mock('../../../Domains/users/entities/LoginCredential', () => {
  return jest.fn().mockImplementation(({ username, password }) => {
    return { username, password }
  });
});

describe('AuthenticationUseCase', () => {
  describe('loginUser function', () => {
    it('should orchestrate user login process correctly', async () => {
      // Arrange
      const userLoginPayload = {
        username: 'billy',
        password: 'secret',
      };

      /** Mock Required depedencies */
      const mockUserRepository = new UserRepository();
      const mockPasswordHash = new PasswordHash();
      const mockAuthenticationTokenManager = new AuthenticationTokenManager();
      const mockAuthenticationRepository = new AuthenticationRepository();

      /** Mock the required function */
      mockUserRepository.getUserCredential = jest.fn().mockResolvedValue(new UserCredential({
        id: 'user-123',
        username: userLoginPayload.username,
        hashedPassword: 'hashed_password',
      }));
      
      mockPasswordHash.compare = jest.fn().mockResolvedValue();

      mockAuthenticationTokenManager.generateAccessToken = jest.fn().mockReturnValue('access_token');

      mockAuthenticationTokenManager.generateRefreshToken = jest.fn().mockReturnValue('refresh_token');
  
      mockAuthenticationRepository.addToken = jest.fn().mockResolvedValue();
      
      // Action
      const authenticationUseCase = new AuthenticationUseCase({
        authenticationTokenManager: mockAuthenticationTokenManager,
        authenticationRepository: mockAuthenticationRepository,
        userRepository: mockUserRepository,
        passwordHash: mockPasswordHash,
      });
      const newAuth = await authenticationUseCase.loginUser(userLoginPayload);
      
      // Assert
      expect(LoginCredential).toHaveBeenCalledWith(userLoginPayload);
      expect(mockUserRepository.getUserCredential).toHaveBeenCalledWith(userLoginPayload.username);
      expect(mockPasswordHash.compare).toHaveBeenCalledWith(userLoginPayload.password, 'hashed_password');
      expect(mockAuthenticationTokenManager.generateAccessToken).toHaveBeenCalledWith({ id: 'user-123', username: 'billy' });
      expect(mockAuthenticationTokenManager.generateRefreshToken).toHaveBeenCalledWith({ id: 'user-123', username: 'billy' });
      expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith('refresh_token');
      expect(newAuth).toEqual(new NewAuth({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      }));
    });
  });
});