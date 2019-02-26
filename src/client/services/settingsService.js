const path = '/api/settings';

const headers = {
  'content-type': 'application/json',
  mode: 'no-cors',
};

export const settingsService = {
  read: async () => {
    const response = await fetch(path, {
      method: 'GET',
      ...headers,
    });
    if (response.ok) return response.json();
  },
  update: async (body) => {
    const response = await fetch(path, {
      method: 'POST',
      ...headers,
      body: JSON.stringify(body),
    });
    if (response.ok) return response.json();
  },
};
