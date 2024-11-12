class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    const { accessToken, refreshToken } = payload;
    
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload({ accessToken, refreshToken }) {
    if (typeof accessToken === 'undefined' || typeof refreshToken === 'undefined') {
      throw new Error('NEW_AUTH.NOT_CONTAIN_REQUIRED_PROPERTY');
    }
    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('NEW_AUTH.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewAuth;
