class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, fullname } = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  _verifyPayload({ id, username, fullname }) {
    if (typeof id === 'undefined' || typeof username === 'undefined' || typeof fullname === 'undefined') {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_REQUIRED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
