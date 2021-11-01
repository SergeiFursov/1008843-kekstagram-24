import {MAX_LENGTH, MAX_HASHTAG_LENGTH} from './data.js';
import {isStringShorterThanMax} from './util.js';

const commentUserInput = document.querySelector('.text__description');
const textHashtagInput = document.querySelector('.text__hashtags');

commentUserInput.addEventListener('input', () => {
  const lengthValue = commentUserInput.value.length;
  if (!isStringShorterThanMax(lengthValue, MAX_LENGTH)) {
    commentUserInput.setCustomValidity(`Удалите лишние ${lengthValue - MAX_LENGTH} симв. Длина комментария 140 симв.`);
  } else {
    commentUserInput.setCustomValidity('');
  }
  commentUserInput.reportValidity();
});


textHashtagInput.addEventListener('input', () => {

  const textHashtagValue = textHashtagInput.value.toLowerCase().split(' ');
  const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const itemsCountHashtag = {};
  textHashtagValue.forEach((item) => {
    const test = regex.test(item);
    item in itemsCountHashtag ? itemsCountHashtag[item] += 1 : itemsCountHashtag[item] = 1;

    if (item.length > MAX_HASHTAG_LENGTH) {
      textHashtagInput.setCustomValidity(`Удалите лишние ${item.length - MAX_HASHTAG_LENGTH} симв. Максимальная длина 20 симв.`);
    } else if (!test) {
      textHashtagInput.setCustomValidity('Хэштег должен начинаться с символа #, минимум 2 симв.');
    } else if (itemsCountHashtag[item] > 1) {
      textHashtagInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
    } else if (textHashtagValue.length > 5) {
      textHashtagInput.setCustomValidity('Количество хэштегов не более пяти');
    } else {
      textHashtagInput.setCustomValidity('');
    }
    textHashtagInput.reportValidity();
  });
});

const stopEventEsc = (evt) => {
  evt.stopPropagation();
};

commentUserInput.addEventListener('keydown', stopEventEsc);
textHashtagInput.addEventListener('keydown', stopEventEsc);
