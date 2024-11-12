class UserCredential {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, hashedPassword } = payload;

    this.id = id;
    this.username = username;
    this.hashedPassword = hashedPassword;
  }
  _verifyPayload({ id, username, hashedPassword }) {
    if (typeof id === 'undefined' || typeof username === 'undefined' || typeof hashedPassword === 'undefined') {
      throw new Error('USER_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY');
    }
    if (typeof id === 'undefined' || typeof username !== 'string' || typeof hashedPassword !== 'string') {
      throw new Error('USER_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserCredential;
