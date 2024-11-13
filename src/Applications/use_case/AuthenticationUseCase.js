const NewAuth = require("../../Domains/authentications/entities/NewAuth");
const LoginCredential = require("../../Domains/users/entities/LoginCredential");

class AuthenticationUseCase {
  constructor({
    authenticationTokenManager,
    authenticationRepository,
    userRepository,
    passwordHash,
  }) {
    this._authenticationTokenManager = authenticationTokenManager;
    this._authenticationRepository = authenticationRepository;
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;

    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(loginPayload) {
    const { username, password } = new LoginCredential(loginPayload);
    const userCredential = await this._userRepository.getUserCredential(username);
    await this._passwordHash.compare(password, userCredential.hashedPassword);
    const accessToken = this._authenticationTokenManager.generateAccessToken({ id: userCredential.id, username: userCredential.username });
    const refreshToken = this._authenticationTokenManager.generateRefreshToken({ id: userCredential.id, username: userCredential.username });
    await this._authenticationRepository.addToken(refreshToken);

    return new NewAuth({
      accessToken,
      refreshToken,
    });
  }
}

module.exports = AuthenticationUseCase;
