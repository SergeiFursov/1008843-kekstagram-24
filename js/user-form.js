import {
  MAX_LENGTH__COMMENT,
  MIN__HASHTAG__LENGTH,
  MAX_HASHTAG_LENGTH,
  MAX__HASHTAG__COUNT
} from './data.js';
import { isStringShorterThanMax } from './util.js';

const commentUserInput = document.querySelector('.text__description');
const textHashtagInput = document.querySelector('.text__hashtags');

function checkLengthComment() {
  const comment = commentUserInput.value.length;
  const isLongComment = !isStringShorterThanMax(comment, MAX_LENGTH__COMMENT);

  if (isLongComment) {
    commentUserInput.setCustomValidity(`Удалите лишние ${comment - MAX_LENGTH__COMMENT} симв.`);
  } else {
    commentUserInput.setCustomValidity('');
  }
  commentUserInput.reportValidity();
}
commentUserInput.addEventListener('input', checkLengthComment);


// Валидация хэштега

// Валидация хэштега
const validateHashtag = (hashtag) => {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

  const isLong = hashtag.length > MAX_HASHTAG_LENGTH;
  const isShort = hashtag.length > MIN__HASHTAG__LENGTH;
  const hasRestrictedSymbols = !regexp.test(hashtag);

  switch (true) {
    case isLong:
      return 'Слишком длинный хэштег';
    case isShort:
      return 'Слишком короткий хэштег';
    case hasRestrictedSymbols:
      return 'Хэштег должен начинаться с символа #, минимум 2 симв.';
    default:
      return '';
  }
};

textHashtagInput.addEventListener('input', () => {
  let message = '';
  const textHashtagValue = textHashtagInput.value;
  const strHashtags = textHashtagValue.toLowerCase().split(' ');

  // Проверка максимальной длины массива хэштегов. Если хэштегов больше 5, то возвращаем ошибку и прерываем выполнение
  if (strHashtags.length > MAX__HASHTAG__COUNT) {
    textHashtagInput.setCustomValidity('Должно быть не больше 5 хэштегов');
    textHashtagInput.reportValidity();
    return;
  }
  // Если длина массива правильная, то проверяем каждый отдельный хэштег
  for (let index = 0; index < strHashtags.length; index++) {
    const hashtag = strHashtags[index];

    // Проверяем, встречается ли данных хэштег еще раз в этом массиве
    const hasDuplicates = strHashtags.indexOf(hashtag, index);

    // Если встречается, то возвращаем ошибку и прерываем выполнение
    if (hasDuplicates) {
      textHashtagInput.setCustomValidity('Хэштег не должен повторяться');
      // message = 'Хэштег не должен повторяться';
      break;
    }

    // Если дубликатов нет, то проверяем хэштег по остальным критериям
    const error = !validateHashtag(hashtag);

    // Если хэштег провалил проверку, то возвращаем ошибку и прерываем выполнение массива
    if (error) {
      message = error;
      break;
    }
  }

  // Здесь выводим сообщение об ошибке или обнуляем его, если ошибок не было
  textHashtagInput.setCustomValidity(message);
  textHashtagInput.reportValidity();
});

const stopEventEsc = (evt) => {
  evt.stopPropagation();
};

commentUserInput.addEventListener('keydown', stopEventEsc);
textHashtagInput.addEventListener('keydown', stopEventEsc);
