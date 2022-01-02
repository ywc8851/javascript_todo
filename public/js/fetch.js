const req = {
  get(url) {
    return fetch(url);
  },

  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  delete(url) {
    return fetch(url, { method: 'DELETE' });
  },
};

export default {
  get(url) {
    return req.get(url);
  },
  post(url, payload) {
    return req.post(url, payload);
  },
  patch(url, payload) {
    return req.patch(url, payload);
  },
  delete(url) {
    return req.delete(url);
  },
};
