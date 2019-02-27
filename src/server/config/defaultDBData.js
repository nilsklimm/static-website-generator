import uuid from 'uuid/v4';

export const defaultDBData = {
  settings: {
    siteName: 'Static Website Generator',
  },
  pages: [
    {
      id: uuid(),
      slug: 'demo1',
      title: 'Demo Page 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
    },
    {
      id: uuid(),
      slug: 'demo2',
      title: 'Demo Page 2',
      text: 'Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ],
};
