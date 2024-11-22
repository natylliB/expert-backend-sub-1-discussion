const AuthenticationUseCase = require('../../../../Applications/use_case/AuthenticationUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const authenticationUseCase = this._container.getInstance(AuthenticationUseCase.name);
    const { accessToken, refreshToken } = await authenticationUseCase.loginUser(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = AuthenticationsHandler;
