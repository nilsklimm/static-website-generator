import Hapi from 'hapi';
import opn from 'opn';

import { configureDatabase, defaultDBPath, defaultDBData } from './config/database';
import { configureRoutes } from './config/routes';

const db = configureDatabase(defaultDBPath, defaultDBData);

const server = Hapi.server({
  port: 8080,
  host: 'localhost',
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

opn('http://localhost:8080');
