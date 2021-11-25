const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((miniatures) => {
      onSuccess(miniatures);
      /*
      if (response.ok) {
        return response.json();
      }
       throw new Error(`${response.status} ${response.statusText}`);
     })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
      */
    });
};

const sendData = (onSuccess, onFail, body) => {

  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
