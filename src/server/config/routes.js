const indexHandler = (_, h) =>
  h.file('./dist/index.html');

const routes = db => [
  {
    method: 'GET',
    path: '/',
    handler: indexHandler,
  },
  {
    method: 'GET',
    path: '/settings',
    handler: indexHandler,
  },
  {
    method: 'GET',
    path: '/page/{pageId}',
    handler: indexHandler,
  },
  {
    method: 'GET',
    path: '/bundle.js',
    handler: (_, h) => h.file('./dist/bundle.js')
  },
  {
    method: 'GET',
    path: '/api/settings',
    handler: () => db.get('settings')
  },
  {
    method: 'GET',
    path: '/api/pages',
    handler: () => db.get('pages')
  },
  {
    method: 'GET',
    path: '/api/page/{pageId}',
    handler: ({ params: { pageId: id } }) => db.get('pages').find({ id })
  },
];

function configureRoutes(server, db) {
  routes(db).forEach(route => server.route(route));
}

module.exports = {
  configureRoutes,
};
