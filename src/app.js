require('dotenv').config();
const createServer = require('./Infrastructures/http/createServer');
const serviceContainer = require('./Infrastructures/ServicesContainer');

const start = async () => {
  const server = await createServer(serviceContainer);
  await server.start();
  console.log(`Server start at ${server.info.uri}`);
};

start();