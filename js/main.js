// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomNumber(min, max) {
  if (min >= max) {
    return;
  }
  return Math.round(Math.random() * (max - min) + min);
}

getRandomNumber();

// Функция для проверки максимальной длины строки.

function isStringShorterThanMax (checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

isStringShorterThanMax(123, 140);

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Арсений',
  'Илья',
  'Екатерина',
  'Юлия',
  'Сергей',
  'Татьяна',
];

const DESCRIPTION = [
  'Нашли полезные гаджеты',
  'Не только для ежедневного пользования',
  'Стандартная вещь, которая будет полезна',
  'Для кого кухня является заработком',
  'Тем, кому просто иногда очень хочется чего-то домашнего',
  'Понадобятся даже для питомцев',
  'Для измерения веса вашего пушистого друга',
  'Для взвешивания корма',
  'Чудесное воспоминание о важном атрибуте каждой семьи',
  'Признак достатка, показатель дохода или просто — персидский ковер',
  'Первое прикосновение',
  'Вариант для компьютерного стола',
  'И воспоминания приятные, и не стыдно',
  'Мы верим, что любовь с первого взгляда существует',
  'Но в рамках отношений с кошками важно не только влюбиться',
  'Правильно организовать первую встречу',
  'Как это сделать и не нарушить личные границы питомца',
  'Медленно, но верно',
  'Не забывайте, что кошки — не собаки',
];

const SIMILAR_USER_POST_COUNT = 25;

const COMMENTS_COUNT = 3;

const createUserPost = () => {
  const randomIdIndexPost = getRandomNumber(1, 25);
  const randomPhotoIndex = getRandomNumber(1, 25);
  const randomDescriptionIndex = getRandomNumber(0, NAMES.length - 1);
  const randomLikesIndex = getRandomNumber(15, 200);

  return {
    id: randomIdIndexPost,
    url: `photos/${  randomPhotoIndex   }.jpg`,
    description: DESCRIPTION[randomDescriptionIndex],
    likes: randomLikesIndex,
    comments: commentsUsers,
  };
};

const commentUser = () => {
  const randomIdIndex = getRandomNumber(1, 25);
  const randomAvatarIndex = getRandomNumber(0, 6);
  const randomMessageIndex = getRandomNumber(0, MESSAGE.length - 1);
  const randomNameIndex = getRandomNumber(0, NAMES.length - 1);

  return {
    id: randomIdIndex,
    avatar: `img/avatar-${  randomAvatarIndex  }.svg`,
    message: MESSAGE[randomMessageIndex],
    name: NAMES[randomNameIndex],
  };
};


const commentsUsers = Array.from({length: COMMENTS_COUNT}, commentUser);

const similarUserPost = Array.from({length: SIMILAR_USER_POST_COUNT}, createUserPost);

