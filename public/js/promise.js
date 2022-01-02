const req = (method, url, payload) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(`${method}`, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });

export default {
  get(url) {
    return req('GET', url);
  },
  post(url, payload) {
    return req('POST', url, payload);
  },
  patch(url, payload) {
    return req('PATCH', url, payload);
  },
  remove(url) {
    return req('DELETE', url);
  },
};
