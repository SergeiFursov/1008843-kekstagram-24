import { isEscapeKey } from './util.js';

//Сообщение от успешной отправке

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();

const showMessageSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);

  const modalSuccess = document.querySelector('.success');
  const buttonSuccess = document.querySelector('.success__button');

  function closeModalSuccess(evt) {
    evt.preventDefault();
    document.body.removeChild(modalSuccess);
    document.body.classList.remove('modal-open');

  }
  const onModalSuccessEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.body.removeChild(modalSuccess);
    }
  };

  buttonSuccess.addEventListener('click', closeModalSuccess);
  document.addEventListener('keydown', onModalSuccessEsc);
};

// ! Закрытие сообщения об успехе по клику на любом месте WINDOW

//window.addEventListener('click', () => {
// document.body.removeChild(successFragment);
//});

// Сообщение об ошибке

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();

const showMessageError = () => {

  const errorElement = errorTemplate.cloneNode(errorTemplate);
  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);

  const modalError = document.querySelector('.error');
  const buttonError = document.querySelector('.error__button');

  function closeModalError(evt) {
    evt.preventDefault();
    document.body.removeChild(modalError);
    document.body.classList.remove('modal-open');
  }

  const onModalErrorEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.body.removeChild(modalError);
    }
  };
  document.addEventListener('keydown', onModalErrorEsc);
  buttonError.addEventListener('click', closeModalError);
};

//window.addEventListener('click', closeModalError);
export { showMessageSuccess, showMessageError };
