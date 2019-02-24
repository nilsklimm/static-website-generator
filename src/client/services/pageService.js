const path = '/api/page/';

export const pageService = {
  create: async (pageId) => {
    const response = await fetch(`${path}${pageId}`, { method: 'PUT' });
    if (response.ok) return response.json();
  },
  read: async (pageId) => {
    const response = await fetch(`${path}${pageId}`, { method: 'GET' });
    if (response.ok) return response.json();
  },
  update: async (pageId) => {
    const response = await fetch(`${path}${pageId}`, { method: 'POST' });
    if (response.ok) return response.json();
  },
  delete: async (pageId) => {
    const response = await fetch(`${path}${pageId}`, { method: 'DELETE' });
    if (response.ok) return response.json();
  },
};
