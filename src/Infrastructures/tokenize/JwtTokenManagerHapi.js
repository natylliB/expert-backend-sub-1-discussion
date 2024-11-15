const AuthenticationTokenManager = require('../../Applications/tokenize/AuthenticationTokenManager');

class JwtTokenManagerHapi extends AuthenticationTokenManager{
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  generateAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  generateRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }
};

module.exports = JwtTokenManagerHapi;
