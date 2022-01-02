// const get = (url, onSuccess) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.response));
//       onSuccess(JSON.parse(xhr.response));
//     } else {
//       console.error(xhr.status);
//     }
//   };
// };

// const post = (url, onSuccess, payload) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', url);
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(payload));

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.response));
//       onSuccess(JSON.parse(xhr.response));
//     } else {
//       console.error(xhr.status);
//     }
//   };
// };

// const patch = (url, onSuccess, payload) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('PATCH', url);
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(payload));

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.response));
//       onSuccess(JSON.parse(xhr.response));
//     } else {
//       console.error(xhr.status);
//     }
//   };
// };

// typeof JSON.stringify(undefined)  -> 'undefined'

// const remove = (url, onSuccess) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('DELETE', url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.response));
//       onSuccess(JSON.parse(xhr.response));
//     } else {
//       console.error(xhr.status);
//     }
//   };
// };

const req = (method, url, onSuccess, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`${method}`, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      onSuccess(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

export default {
  get(url, onSuccess) {
    req('GET', url, onSuccess);
  },
  post(url, onSuccess, payload) {
    req('POST', url, onSuccess, payload);
  },
  patch(url, onSuccess, payload) {
    req('PATCH', url, onSuccess, payload);
  },
  remove(url, onSuccess) {
    req('DELETE', url, onSuccess);
  },
};
