import { defaultDBData } from '../../server/config/defaultDBData';

export const settingsMocks = [
  [
    /\/api\/settings/,
    { body: defaultDBData.settings },
  ],
  [
    /\/api\/settings/,
    { body: {} },
    { method: 'post' },
  ],
];
