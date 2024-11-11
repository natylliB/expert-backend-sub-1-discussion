const AuthenticationTokenManager = require('../AuthenticationTokenManager');

describe('AuthenticationTokenManager tool interface', () => {
  it('should throw error when invoke abstract behavior', () => {
    const authenticationTokenManager = new AuthenticationTokenManager();

    expect(() => authenticationTokenManager.generateAccessToken({})).toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => authenticationTokenManager.generateRefreshToken({})).toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => authenticationTokenManager.verifyRefreshToken('')).toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
