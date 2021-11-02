import {MAX_LENGTH} from './data.js';

const commentUserInput = document.querySelector('.text__description');

commentUserInput.addEventListener('input', () => {
  const length = commentUserInput.value.length;
  if (length > MAX_LENGTH) {
    commentUserInput.setCustomValidity(`Удалите лишние ${length - MAX_LENGTH} симв. Длина комментария 140 симв.`);
  } else {
    commentUserInput.setCustomValidity('');
  }
  commentUserInput.reportValidity();
});

const textHashtagInput = document.querySelector('.text__hashtags');


textHashtagInput.addEventListener('input', () => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}/;
  const test = re.test(textHashtagInput.value);
  const inputTextLength = textHashtagInput.value.length;
  const minHashtagLength = 2;
  const maxHashtagLength = 20;

  if (inputTextLength < minHashtagLength) {
    textHashtagInput.setCustomValidity(`Добавьте еще ${minHashtagLength - inputTextLength} симв.`);
  }else if (inputTextLength > maxHashtagLength) {
    textHashtagInput.setCustomValidity(`Удалите лишние ${ inputTextLength - maxHashtagLength } симв. Название хэштега не должно превышать 20-ти симв.`);
  } else  if (!test) {
    textHashtagInput.setCustomValidity('Хэштег начинается с символа #');
  } else {
    textHashtagInput.setCustomValidity('');
  }

  textHashtagInput.reportValidity();
});


const stopEventEsc = (evt) => {
  evt.stopPropagation();
};

commentUserInput.addEventListener('keydown', stopEventEsc);
textHashtagInput.addEventListener('keydown', stopEventEsc);
