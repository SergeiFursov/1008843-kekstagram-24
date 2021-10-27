import {isEscapeKey} from './util.js';

const userFormElement = document.querySelector('.img-upload__overlay');
const userFormOpenElement = document.querySelector('#upload-file');
const userFormCloseElement = document.querySelector('#upload-cancel');
const bodyElement = document.querySelector('body');
const closeFormEsc = document.querySelector('.img-upload__form');
// const commentUserInput = document.querySelector('.text__description');
// const textHashtagsInput = document.querySelector('.text__hashtags');

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

  closeFormEsc.addEventListener('keydown', onFormEscKeydown);
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

export  {openUserForm};
