//import { MAX_LENGTH_COMMENT, MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT } from './data.js';
import { isStringShorterThanMax } from './util.js';
import { closeUserForm } from './upload-file.js';
import { showMessageSuccess, showMessageError } from './sending-form.js';
import { sendData } from './api.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_LENGTH_COMMENT = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const commentUserInput = document.querySelector('.text__description');
const textHashtagInput = document.querySelector('.text__hashtags');

const checkLengthComment = () => {
  const comment = commentUserInput.value.length;
  const isLongComment = !isStringShorterThanMax(comment, MAX_LENGTH_COMMENT);

  if (isLongComment) {
    commentUserInput.setCustomValidity(`Удалите лишние ${comment - MAX_LENGTH_COMMENT} симв.`);
  } else {
    commentUserInput.setCustomValidity('');
  }
  commentUserInput.reportValidity();
};
commentUserInput.addEventListener('input', checkLengthComment);


// Валидация хэштега

const validateHashtag = (hashtag) => {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
  const startString = !hashtag.startsWith('#');
  const isLong = hashtag.length > MAX_HASHTAG_LENGTH;
  const hasRestrictedSymbols = !regexp.test(hashtag);

  switch (true) {
    case startString:
      return 'Хэштег должен начинаться с символа # ';
    case isLong:
      return 'Слишком длинный хэштег';
    case hasRestrictedSymbols:
      return 'Только буквы и цифры';
    default:
      return '';
  }
};

textHashtagInput.addEventListener('input', () => {
  let message = '';

  const textHashtagValue = textHashtagInput.value;
  const strHashtags = textHashtagValue.toLowerCase().split(' ');

  // Проверка минимальной длины массива хэштегов. Если хэштегов нет, то и ошибок нет. Инпут валиден.
  if (strHashtags.length === 0) {
    textHashtagInput.setCustomValidity('');
    textHashtagInput.reportValidity();
    return;
  }

  // Проверка максимальной длины массива хэштегов. Если хэштегов больше 5, то возвращаем ошибку и прерываем выполнение
  if (strHashtags.length > MAX_HASHTAG_COUNT) {
    textHashtagInput.setCustomValidity('Должно быть не больше 5 хэштегов');
    textHashtagInput.reportValidity();
    return;
  }

  // Если длина массива правильная, то проверяем каждый отдельный хэштег
  for (let index = 0; index < strHashtags.length; index++) {

    const hashtag = strHashtags[index];

    // Если дубликатов нет, то проверяем хэштег по остальным критериям
    const error = validateHashtag(hashtag);
    // Если хэштег провалил проверку, то возвращаем ошибку и прерываем выполнение массива
    if (error) {
      message = error;
      break;
    }
    // Проверяем, встречается ли данных хэштег еще раз в этом массиве

    const hasDuplicates = strHashtags.indexOf(hashtag, index + 1);

    // Если встречается, то возвращаем ошибку и прерываем выполнение

    if (hasDuplicates !== -1) {
      message = 'Хэштег не должен повторяться';
      break;
    }
    // Здесь выводим сообщение об ошибке или обнуляем его, если ошибок не было

  }

  textHashtagInput.setCustomValidity(message);
  textHashtagInput.reportValidity();
});

const stopEventEsc = (evt) => {
  evt.stopPropagation();
};

commentUserInput.addEventListener('keydown', stopEventEsc);
textHashtagInput.addEventListener('keydown', stopEventEsc);

const setFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => { onSuccess(), showMessageSuccess(); },
      () => { closeUserForm(), showMessageError(); },
      new FormData(evt.target),
    );
  });
};

export { setFormSubmit, textHashtagInput, commentUserInput };
