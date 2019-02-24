const path = '/api/settings';

export const settingsService = {
  read: async () => {
    const response = await fetch(path, { method: 'GET' });
    if (response.ok) return response.json();
  },
  update: async () => {
    const response = await fetch(path, { method: 'POST' });
    if (response.ok) return response.json();
  },
};
