const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser({ id, username, fullname })', () => {
  it('should throw error when payload property is missing', () => {
    const payload = {
      username: 'billy',
      fullname: 'Billy Tan',
    };

    expect(() => new RegisteredUser(payload)).toThrow('REGISTERED_USER.NOT_CONTAIN_REQUIRED_PROPERTY');
  });

  it('should throw error when payload not met data type specification', () => {
    const payload = {
      id: 123,
      username: 'billy',
      fullname: 'Billy Tan',
    };

    expect(() => new RegisteredUser(payload)).toThrow('REGISTERED_USER.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registeredUser object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'billy',
      fullname: 'Billy Tan',
    };

    const { id, username, fullname } = new RegisteredUser(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  })
});
