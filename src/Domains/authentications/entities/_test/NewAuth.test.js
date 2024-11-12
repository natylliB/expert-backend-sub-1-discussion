const NewAuth = require('../NewAuth');

describe('NewAuth({ accessToken, refreshToken }) object', () => {
  it('should throw error if the required property is missing', () => {
    const payload = {
      accessToken: 'access_token',
    };

    expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.NOT_CONTAIN_REQUIRED_PROPERTY');
  });

  it('should throw error if the property not met data type specification', () => {
    const payload = {
      accessToken: 123,
      refreshToken: 123,
    };

    expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new auth object correctly', () => {
    const payload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };

    const { accessToken, refreshToken } = new NewAuth(payload);

    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
