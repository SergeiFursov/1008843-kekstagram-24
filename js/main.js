
const MESSAGES = [
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
  'Михаил',
  'Елена',
];

const DESCRIPTIONS = [
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
  'Я фотографирую собак и живу с двумя бордер-колли',
  'Я научила ее парочке команд, и меня это увлекло',
  'На 96% рацион кошки состоит из домашней пищи',
  'Родителям в этот момент стало и стыдно, и смешно одновременно',
  'Я благодарна им за этот поворотный момент в моей жизни',
  'Как-то увидела его фотографию — понравился',
];

const COMMENTS_COUNT = 3;

const PHOTOS_DESCRIPTION_COUNT = 25;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    return;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createCommentIdGenerator () {
  let lastGeneratedId = 26;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const randomPhotoId = [];
// eslint-disable-next-line id-length
for (let i = 1; i <= 25; i++) {
  randomPhotoId.push(i);
}
shuffle(randomPhotoId);

const randomDescriptionId = [];
// eslint-disable-next-line id-length
for (let i = 1; i <= 25; i++) {
  randomDescriptionId.push(i);
}
shuffle(randomDescriptionId);

const randomCommentId = createCommentIdGenerator ();

const createCommentUser = () => {
  const randomNameNumber =  getRandomNumber(0, NAMES.length - 1);
  const randomMessageNumber =  getRandomNumber(0, MESSAGES.length - 1);
  const randomAvatarId = getRandomNumber(1, 6);

  return {
    id: randomCommentId(),
    avatar: `img/avatar-${  randomAvatarId  }.svg`,
    message: MESSAGES[randomMessageNumber],
    name: NAMES[randomNameNumber],
  };
};

const createUserPost = () => {
  const randomLikesNumber = getRandomNumber(15, 200);

  return {
    id:  randomDescriptionId.shift(),
    url: `photos/${  randomPhotoId.shift()   }.jpg`,
    description: DESCRIPTIONS.shift(),
    likes: randomLikesNumber,
    comments: Array.from({length: COMMENTS_COUNT}, createCommentUser),
  };
};

Array.from({length: PHOTOS_DESCRIPTION_COUNT}, createUserPost);
