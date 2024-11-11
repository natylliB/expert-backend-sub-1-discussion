class UserCredential {
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, hashedPassword } = payload;

    this.username = username;
    this.hashedPassword = hashedPassword;
  }
  _verifyPayload({ username, hashedPassword }) {
    if (typeof username === 'undefined' || typeof hashedPassword === 'undefined') {
      throw new Error('USER_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY');
    }
    if (typeof username !== 'string' || typeof hashedPassword !== 'string') {
      throw new Error('USER_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserCredential;
