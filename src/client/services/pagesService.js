const path = '/api/pages';

export const pagesService = {
  read: async () => {
    const response = await fetch(path, { method: 'GET' });
    if (response.ok) return response.json();
  },
};
