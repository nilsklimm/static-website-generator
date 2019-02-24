const Hapi = require('hapi');
const { configureDatabase, defaultDbPath, defaultDbData } = require('./config/database');
const { configureRoutes } = require('./config/routes');

const db = configureDatabase(defaultDbPath, defaultDbData);

const server = Hapi.server({
  port: 8080,
  host: 'localhost'
});

const init = async () => {
  await server.register(require('inert'));

  configureRoutes(server, db);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
