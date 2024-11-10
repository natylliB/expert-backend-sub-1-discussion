const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create Authentication error correctly', () => {
    const authenticationError = new AuthenticationError('authentication error occurs');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('authentication error occurs');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});