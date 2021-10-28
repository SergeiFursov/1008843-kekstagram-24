import {MAX_LENGTH, MAX_HASHTAG_LENGTH} from './data.js';

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
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const inputTextLength = textHashtagInput.value;
  const valueLength = inputTextLength.length;
  const strHashtag = inputTextLength.split(' ', 5);

  for (let i = 0; i < strHashtag.length; i++) {
    const test = re.test(strHashtag[i]);

    if (!test) {
      textHashtagInput.setCustomValidity('Хэштег начинается с символа #, минимум два символа, состоит только из букв и цифр, не повторяется');
    } else if (valueLength > MAX_HASHTAG_LENGTH) {
      textHashtagInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_HASHTAG_LENGTH} симв. Длина хэштега 20 симв.`);
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
