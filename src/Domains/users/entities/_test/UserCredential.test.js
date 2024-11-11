const UserCredential = require('../UserCredential');

describe('UserCredential({ username, hashedPassword }) object', () => {
  it('should throw error when not contain required property', () => {
    const payload = {
      username: 'billy',
    };

    expect(() => new UserCredential(payload)).toThrow('USER_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY');
  });

  it('should throw error when property not met data type specification', () => {
    const payload = {
      username: 'billy',
      hashedPassword: 123,
    };

    expect(() => new UserCredential(payload)).toThrow('USER_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
  });

  it('should create user credential object correctly', () => {
    const payload = {
      username: 'billy',
      hashedPassword: 'some_hashed_password',
    };

    const { username, hashedPassword } = new UserCredential(payload);

    expect(username).toEqual(payload.username);
    expect(hashedPassword).toEqual(payload.hashedPassword);
  })
});
