const LoginCredential = require('../LoginCredential');

describe('LoginCredential object', () => {
  it('should throw error when the property is missing', () => {
    const payload = {
      username: 'abc',
    }

    expect(() => new LoginCredential(payload)).toThrow('LOGIN_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY');
  });

  it('should throw error when the property not met data type specification', () => {
    const payload = {
      username: 'abcd',
      password: {},
    };

    expect(() => new LoginCredential(payload)).toThrow('LOGIN_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when the username is more than 50 character', () => {
    const payload = {
      username: 'somesuperlongusernamethatismorethan50charactersssss',
      password: 'secret',
    };

    expect(() => new LoginCredential(payload)).toThrow('LOGIN_CREDENTIAL.USERNAME_LIMIT_CHAR_EXCEEDED');
  });

  it('should throw error when the username contain restricted character', () => {
    const payload = {
      username: '!!!billy',
      password: 'secret',
    };

    expect(() => new LoginCredential(payload)).toThrow('LOGIN_CREDENTIAL.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create user credential object correctly', () => {
    const payload = {
      username: 'billy',
      password: 'secret',
    };

    const { username, password } = new LoginCredential(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
