const path = '/api/pages';

const headers = {
  'content-type': 'application/json',
  mode: 'no-cors',
};

export const pagesService = {
  readAll: async () => {
    const response = await fetch(path, {
      method: 'GET',
      headers,
    });
    if (response.ok) return response.json();
  },
  read: async (pageId) => {
    const response = await fetch(`${path}/${pageId}`, {
      method: 'GET',
      headers,
    });
    if (response.ok) return response.json();
  },
  create: async (body) => {
    const response = await fetch(`${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    if (response.ok) return response.json();
  },
  update: async (pageId, body) => {
    const response = await fetch(`${path}/${pageId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (response.ok) return response.json();
  },
  delete: async (pageId) => {
    const response = await fetch(`${path}/${pageId}`, {
      method: 'DELETE',
      headers,
    });
    if (response.ok) return response.json();
  },
};
