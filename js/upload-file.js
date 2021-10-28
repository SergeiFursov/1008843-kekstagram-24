import {isEscapeKey} from './util.js';

const userFormElement = document.querySelector('.img-upload__overlay');
const userFormOpenElement = document.querySelector('#upload-file');
const userFormCloseElement = document.querySelector('#upload-cancel');
const bodyElement = document.querySelector('body');

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    userFormElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
};

function openUserForm () {
  userFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onFormEscKeydown);
}

function closeUserForm () {
  userFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onFormEscKeydown);
}

userFormOpenElement.addEventListener('click', () => {
  openUserForm();
});

userFormCloseElement.addEventListener('click', () => {
  closeUserForm();
});

export  {openUserForm, bodyElement};
