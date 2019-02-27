import { defaultDBData } from '../../server/config/defaultDBData';

const [page1, page2] = defaultDBData.pages;

export const pagesMocks = [
  [
    /\/api\/pages$/,
    { body: defaultDBData.pages },
  ],
  [
    new RegExp(`/api/pages/${page1.id}`),
    { body: page1 },
  ],
  [
    new RegExp(`/api/pages/${page2.id}`),
    { body: page2 },
  ],
  [
    new RegExp(`/api/pages/${page1.id}`),
    { body: {} },
    { method: 'post' },
  ],
  [
    new RegExp(`/api/pages/${page2.id}`),
    { body: {} },
    { method: 'post' },
  ],
];
