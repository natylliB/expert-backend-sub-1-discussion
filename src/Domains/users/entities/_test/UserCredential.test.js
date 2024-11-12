const UserCredential = require('../UserCredential');

describe('UserCredential({ id, username, hashedPassword }) object', () => {
  it('should throw error when not contain required property', () => {
    const payload = {
      id: 'user-123',
      username: 'billy',
    };

    expect(() => new UserCredential(payload)).toThrow('USER_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY');
  });

  it('should throw error when property not met data type specification', () => {
    const payload = {
      id: 'user-123',
      username: 'billy',
      hashedPassword: 123,
    };

    expect(() => new UserCredential(payload)).toThrow('USER_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
  });

  it('should create user credential object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'billy',
      hashedPassword: 'some_hashed_password',
    };

    const { id, username, hashedPassword } = new UserCredential(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(hashedPassword).toEqual(payload.hashedPassword);
  })
});
