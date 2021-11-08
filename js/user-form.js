import { MAX_LENGTH_COMMENT, MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT} from './data.js';

const commentUserInput = document.querySelector('.text__description');
const textHashtagInput = document.querySelector('.text__hashtags');

commentUserInput.addEventListener('input', () => {
  const length = commentUserInput.value.length;
  if (length > MAX_LENGTH_COMMENT) {
    commentUserInput.setCustomValidity(`Удалите лишние ${length - MAX_LENGTH_COMMENT} симв. Длина комментария 140 симв.`);
  } else {
    commentUserInput.setCustomValidity('');
  }
  commentUserInput.reportValidity();
});


// Валидация хэштега

// Валидация хэштега
const validateHashtag = (hashtag) => {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

  const startsWithHash = !hashtag.startsWith('#');
  const isLong = hashtag.length > MAX_HASHTAG_LENGTH;
  const hasRestrictedSymbols = !regexp.test(hashtag);

  switch (true) {
    case startsWithHash:
      return 'Хэштег должен начинаться с символа # ';
    case isLong:
      return 'Слишком длинный хэштег';
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
  if (strHashtags.length > MAX_HASHTAG_COUNT) {
    textHashtagInput.setCustomValidity('Должно быть не больше 5 хэштегов');
    textHashtagInput.reportValidity();
    return;
  }

  // Если длина массива правильная, то проверяем каждый отдельный хэштег
  for (let index = 0; index < strHashtags; index++) {
    const hashtag = strHashtags[index];

    // Проверяем, встречается ли данных хэштег еще раз в этом массиве
    const hasDuplicates = strHashtags.indexOf(hashtag, index);

    // Если встречается, то возвращаем ошибку и прерываем выполнение
    if (hasDuplicates !== -1) {
      message = 'Хэштег не должен повторяться';
      break;
    }

    // Если дубликатов нет, то проверяем хэштег по остальным критериям
    const error = validateHashtag(hashtag);

    // Если хэштег провалил проверку, то возвращаем ошибку и прерываем выполнение массива
    if (error) {
      message = error;
      break;
    }
    textHashtagInput.setCustomValidity(message);
  }

  // Здесь выводим сообщение об ошибке или обнуляем его, если ошибок не было

  textHashtagInput.reportValidity();
});

const stopEventEsc = (evt) => {
  evt.stopPropagation();
};

commentUserInput.addEventListener('keydown', stopEventEsc);
textHashtagInput.addEventListener('keydown', stopEventEsc);
