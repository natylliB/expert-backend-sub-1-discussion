const pool = require('../../database/postgres/pool');
const AuthenticationTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationError = require('../../../Commons/Exeptions/AuthenticationError');
const serviceContainer = require('../../ServicesContainer');
const createServer = require('../createServer');

describe('authentications endpoint', () => {
  afterEach(async () => {
    await AuthenticationTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();

    const authRows = await AuthenticationTableTestHelper.getAll();
    const userRows = await UsersTableTestHelper.getAll();

    expect(authRows).toHaveLength(0);
    expect(userRows).toHaveLength(0);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /authentications', () => {
    it('should response 400 when username not found', async () => {
      // Arrange
      const requestPayload = {
        username: 'someUnregisteredUsername',
        password: 'somepassword',
      };

      const server = await createServer(serviceContainer);
      
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Username tidak terdaftar');
    });

    it('should response 401 when password mismatch', async () => {
      // Arrange
      const requestPayload = {
        username: 'billy',
        password: 'wrong_password',
      };
      const server = await createServer(serviceContainer);

      console.log((await UsersTableTestHelper.getAll()).length);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'billy',
          password: 'secret',
          fullname: 'Billy Tan',
        },
      });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Password anda salah');
    });

    it('should login user correctly and return accessToken and refreshToken', async() => {
      // Assert
      const requestPayload = {
        username: 'billy',
        password: 'secret',
      };
      const server = await createServer(serviceContainer);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'billy',
          password: 'secret',
          fullname: 'Billy Tan',
        },
      });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });
  });
});