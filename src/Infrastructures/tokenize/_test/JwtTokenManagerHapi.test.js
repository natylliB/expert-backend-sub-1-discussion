const JwtTokenManagerHapi = require('../JwtTokenManagerHapi');

describe('JwtTokenManagerHapi', () => {
  describe('generateAccessToken function', () => {
    it('should generate access token correctly', () => {
      // Arrange
      const payload = {
        id: 'user-123',
        username: 'billy',
      };
      const mockJwtTokenObject = {
        generate: jest.fn().mockReturnValue('access_token'),
      };
      const jwtTokenManagerHapi = new JwtTokenManagerHapi(mockJwtTokenObject);
      
      // Action
      const accessToken = jwtTokenManagerHapi.generateAccessToken(payload);

      // Assert
      expect(mockJwtTokenObject.generate).toHaveBeenCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('access_token');
    });
  });

  describe('generateRefreshToken function', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      username: 'billy',
    };
    const mockJwtTokenObject = {
      generate: jest.fn().mockReturnValue('refresh_token'),
    };
    const jwtTokenManagerHapi = new JwtTokenManagerHapi(mockJwtTokenObject);

    // Action
    const refreshToken = jwtTokenManagerHapi.generateRefreshToken(payload);

    // Assert
    expect(mockJwtTokenObject.generate).toHaveBeenCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
    expect(refreshToken).toEqual('refresh_token');
  })
});
