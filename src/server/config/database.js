const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const defaultDbPath =  __dirname + '/../db.json';

const defaultDbData = {
  settings: {
    siteName: 'Static Website Generator',
  },
  pages: [
    {
      id: 'demo1',
      title: 'Demo Page 1',
      body: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 'demo2',
      title: 'Demo Page 2',
      body: 'Consetetur sadipscing elitr',
    },
  ],
};

function configureDatabase(databaseFile, defaults) {
  const adapter = new FileSync(databaseFile);
  const db = low(adapter);

  db.defaults(defaults).write();
  return db;
}

module.exports = {
  defaultDbPath,
  defaultDbData,
  configureDatabase,
};
