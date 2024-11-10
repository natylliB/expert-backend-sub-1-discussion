const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should throw NotFoundError correctly', () => {
    const notFoundError = new NotFoundError('a not found error occurs');

    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.message).toEqual('a not found error occurs');
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
