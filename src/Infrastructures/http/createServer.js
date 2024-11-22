const Hapi = require('@hapi/hapi');
const users = require('../../Interfaces/http/api/users');
const config = require('../../Commons/config');
const DomainErrorTranslator = require('../../Commons/Exeptions/DomainErrorTranslator');
const ClientError = require('../../Commons/Exeptions/ClientError');
const authentications = require('../../Interfaces/http/api/authentications');

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks dari request
    const { response } = request;
    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penangan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kesalahan pada server kami',
      });
      console.log(translatedError.stack);
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa intervensi)
    return h.continue;
  })

  return server;
};

module.exports = createServer;
