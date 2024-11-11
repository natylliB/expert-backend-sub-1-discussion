class UserCredential {
  constructor(payload) {
    this._verifyPayload(payload);
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
