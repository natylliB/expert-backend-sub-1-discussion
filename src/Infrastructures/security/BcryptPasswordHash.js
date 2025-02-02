const PasswordHash = require('../../Applications/security/PasswordHash');
const AuthenticationError = require('../../Commons/Exeptions/AuthenticationError');

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async compare(password, hashedPassword) {
    const match = await this._bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Password anda salah');
    }
  }
}

module.exports = BcryptPasswordHash;
