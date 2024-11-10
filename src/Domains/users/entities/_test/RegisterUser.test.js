const RegisterUser = require('../RegisterUser');

describe('RegisterUser({ username, password, fullname })', () => {
  it('should throw error when payload missing property', () => {
    const payload = {
      username: 'billy',
      password: 'secret',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_CONTAIN_REQUIRED_PROPERTY');
  });
  it('should throw error when payload data type specification not met', () => {
    const payload = {
      username: 'billy',
      password: null,
      fullname: 'Billy Tan',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
  });
  
  it('should throw error when username is more than 50 characters', () => {
    const payload = {
      username: 'superlongusernamethatismorethan50characterrrrrrrrrr',
      password: 'secret',
      fullname: 'Billy Tan',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_LIMIT_CHAR_EXCEEDED');
  });

  it('should throw error when username contain restricted character', () => {
    const payload = {
      username: 'billy!!~~',
      password: 'secret',
      fullname: 'Billy Tan',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      username: 'billy',
      password: 'secret',
      fullname: 'Billy Tan',
    };

    const { username, password, fullname } = new RegisterUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  })
});