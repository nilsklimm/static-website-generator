import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export { defaultDBData } from './defaultDBData';

export const defaultDBPath = `${process.cwd()}/DATA.json`;

export function configureDatabase(databaseFile, defaults) {
  const adapter = new FileSync(databaseFile);
  const db = low(adapter);

  db.defaults(defaults).write();
  return db;
}
