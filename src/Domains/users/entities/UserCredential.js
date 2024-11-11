class UserCredential {
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, password } = payload;

    this.username = username;
    this.password = password;
  }

  _verifyPayload({ username, password }) {
    if (typeof username === 'undefined' || typeof password === 'undefined') {
      throw new Error('USER_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY');
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
    }
    if (username.length > 50) {
      throw new Error('USER_CREDENTIAL.USERNAME_LIMIT_CHAR_EXCEEDED');
    }
    if (!username.match(/^[\w]+$/)) {
      throw new Error('USER_CREDENTIAL.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}

module.exports = UserCredential;
