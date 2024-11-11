const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_REQUIRED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR_EXCEEDED')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'));
    expect(DomainErrorTranslator.translate(new Error('LOGIN_CREDENTIAL.NOT_CONTAIN_REQUIRED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat login karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('LOGIN_CREDENTIAL.PROPERTY_NOT_MET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat login karena tipe data tidak sesuai'));
    expect(DomainErrorTranslator.translate(new Error('LOGIN_CREDENTIAL.USERNAME_LIMIT_CHAR_EXCEEDED')))
      .toStrictEqual(new InvariantError('tidak dapat login karena karakter username melebihi batas limit'));
    expect(DomainErrorTranslator.translate(new Error('LOGIN_CREDENTIAL.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat login karena username mengandung karakter terlarang'));
  })
})