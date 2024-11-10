class RegisterUser {
  constructor(payload) {
    this._validatePayload(payload);

    const { username, password, fullname } = payload;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  _validatePayload({ username, password, fullname }) {
    if (typeof username === 'udnefined' || typeof password === 'undefined' || typeof fullname === 'undefined') {
      throw new Error('REGISTER_USER.NOT_CONTAIN_REQUIRED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR_EXCEEDED');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}

module.exports = RegisterUser;
