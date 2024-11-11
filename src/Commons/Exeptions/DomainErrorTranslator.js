const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_REQUIRED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR_EXCEEDED': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'LOGIN_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY': new InvariantError('tidak dapat login karena properti yang dibutuhkan tidak ada'),
  'LOGIN_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat login karena tipe data tidak sesuai'),
  'LOGIN_CREDENTIAL.USERNAME_LIMIT_CHAR_EXCEEDED': new InvariantError('tidak dapat login karena karakter username melebihi batas limit'),
  'LOGIN_CREDENTIAL.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat login karena username mengandung karakter terlarang'),
};

module.exports = DomainErrorTranslator;
