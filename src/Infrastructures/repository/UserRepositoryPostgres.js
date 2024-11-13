const InvariantError = require('../../Commons/Exeptions/InvariantError');
const UserRepository = require('../../Domains/users/UserRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const UserCredential = require('../../Domains/users/entities/UserCredential');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows[0].exists) {
      throw new InvariantError('Username sudah terdaftar');
    }
  }

  async addUser(registerUser) {
    const { username, password, fullname } = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }

  async getUserCredential(username) {
    const query = {
      text: 'SELECT id, username, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('Username tidak terdaftar');
    }

    const userCredential = new UserCredential({
      id: result.rows[0].id,
      username: result.rows[0].username,
      hashedPassword: result.rows[0].password,
    });

    return userCredential;
  }
}

module.exports = UserRepositoryPostgres;
