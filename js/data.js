import {createIdGenerator, getRandomNumber, shuffle} from './util.js';

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

const COMMENTS_COUNT = 5;
const PHOTOS_DESCRIPTION_COUNT = 25;

const generateId = createIdGenerator ();

const createCommentUser = () => {
  const randomNameNumber =  getRandomNumber(0, NAMES.length - 1);
  const randomMessageNumber =  getRandomNumber(0, MESSAGES.length - 1);
  const randomAvatarId = getRandomNumber(1, 6);

  return {
    id: generateId(),
    avatar: `img/avatar-${  randomAvatarId  }.svg`,
    message: MESSAGES[randomMessageNumber],
    name: NAMES[randomNameNumber],
  };
};

// createCommentUser();
const postIds = Array.from({length: 25}, generateId);
const imageIds = postIds.slice();

shuffle(postIds);
shuffle(imageIds);

const createUserPost = () => {
  const randomLikesNumber = getRandomNumber(15, 200);

  return {
    id:  postIds.shift(),
    url: `photos/${  imageIds.shift()   }.jpg`,
    description: DESCRIPTIONS.shift(),
    likes: randomLikesNumber,
    comments: Array.from({length: COMMENTS_COUNT}, createCommentUser),
  };
};

const createUserPosts = () => Array.from({length: PHOTOS_DESCRIPTION_COUNT}, createUserPost);

export {createUserPosts};
