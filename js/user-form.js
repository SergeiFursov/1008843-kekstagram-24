import {MAX_LENGTH, MAX_HASHTAG_LENGTH} from './data.js';

const commentUserInput = document.querySelector('.text__description');
const textHashtagInput = document.querySelector('.text__hashtags');

commentUserInput.addEventListener('input', () => {
  const length = commentUserInput.value.length;
  if (length > MAX_LENGTH) {
    commentUserInput.setCustomValidity(`Удалите лишние ${length - MAX_LENGTH} симв. Длина комментария 140 симв.`);
  } else {
    commentUserInput.setCustomValidity('');
  }
  commentUserInput.reportValidity();
});

textHashtagInput.addEventListener('input', () => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const textHashtagValue = textHashtagInput.value;
  const strHashtags = textHashtagValue.split(' ');

  const itemsCountHashtag = {};
  strHashtags.forEach((value) => {
    if (value in itemsCountHashtag) {
      itemsCountHashtag[value] += 1;
    } else {
      itemsCountHashtag[value] = 1;
    }
  });
  const itemCountRepeat = Object.values(itemsCountHashtag);
  for (let index = 0; index < itemCountRepeat.length; index++) {
    if (itemCountRepeat[index] === 2) {
      textHashtagInput.setCustomValidity('Хэштег не может быть использован два раза');
    } else {
      textHashtagInput.setCustomValidity('');
    }
    textHashtagInput.reportValidity();
  }

  for (let j = 0; j < strHashtags.length; j++) {
    const test = re.test(strHashtags[j]);
    if (strHashtags[j].length > MAX_HASHTAG_LENGTH) {
      textHashtagInput.setCustomValidity(`Удалите лишние ${strHashtags[j].length - MAX_HASHTAG_LENGTH} симв. Максимальная длина 20 симв.`);
    } else if (strHashtags.length > 5) {
      textHashtagInput.setCustomValidity('Количество хэштегов не более пяти');
    } else if (!test) {
      textHashtagInput.setCustomValidity('Хэштег должен начинаться с символа #, минимум 2 симв.');
    } else {
      textHashtagInput.setCustomValidity('');
    }
    textHashtagInput.reportValidity();
  }
});

const stopEventEsc = (evt) => {
  evt.stopPropagation();
};

commentUserInput.addEventListener('keydown', stopEventEsc);
textHashtagInput.addEventListener('keydown', stopEventEsc);
