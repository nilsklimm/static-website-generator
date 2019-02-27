import { extractProps } from '../../utils/extractProps';

const indexRoute = (...paths) => paths.map(path => ({
  method: 'GET',
  path,
  handler: (_, h) => h.file('./dist/index.html'),
}));

const allowedSettingsProps = ['siteName'];
const allowedPageProps = ['slug', 'title', 'text'];

const routes = db => [
  ...indexRoute('/', '/settings', '/pages/{pageId}'),
  {
    method: 'GET',
    path: '/bundle.js',
    handler: (_, h) => h.file('./dist/bundle.js'),
  },
  {
    method: 'GET',
    path: '/api/settings',
    handler: () => db.get('settings'),
  },
  {
    method: 'POST',
    path: '/api/settings',
    handler: ({
      payload,
    }) => {
      return db
        .get('settings')
        .assign(extractProps(payload, allowedSettingsProps))
        .write();
    },
  },
  {
    method: 'GET',
    path: '/api/pages',
    handler: () => db.get('pages'),
  },
  {
    method: 'GET',
    path: '/api/pages/{pageId}',
    handler: ({
      params: { pageId: id },
    }) => db.get('pages').find({ id }),
  },
  {
    method: 'POST',
    path: '/api/pages/{pageId}',
    handler: ({
      params: { pageId: id },
      payload,
    }) => {
      return db
        .get('pages')
        .find({ id })
        .assign(extractProps(payload, allowedPageProps))
        .write();
    },
  },
  {
    method: 'PUT',
    path: '/api/pages',
    handler: ({ payload  }) => {
      const id = Date.now();
      return db
        .get('pages')
        .push({ id, ...extractProps(payload, allowedPageProps) })
        .last()
        .write();
    },
  },
];

export function configureRoutes(server, db) {
  routes(db).forEach(route => server.route(route));
}
