import { isEscapeKey, createCounter } from './util.js';
import { pictureList } from './miniatures.js';
//renderMiniaturesList();
const COMMENTS_COUNT = 26; // ! Присвоить количество комментариев  с сервера

const bigPicture = document.querySelector('.big-picture');
const pictureThumbnails = pictureList.querySelectorAll('.picture');
// eslint-disable-next-line no-console
console.log(pictureThumbnails);
const bigPictureImg = document.querySelector('.big-picture__img');
const imgBig = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const totalComments = document.querySelector('.comments-count');
const closeUserBigPicture = document.querySelector('.big-picture__cancel');
const descriptionBigPicture = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const buttonLoadMoreComments = document.querySelector('.comments-loader');
const numberOpenComments = document.querySelector('.social__comment-count');
const commentsOpen = numberOpenComments.firstChild;

// Закрываем по ESC
const socialComment = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

// Функция создания комментария

const createComment = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  const avatarUser = commentElement.querySelector('.social__picture');
  const textCommentUser = commentElement.querySelector('.social__text');

  avatarUser.src = comment.avatar;
  avatarUser.alt = comment.name;
  textCommentUser.textContent = comment.message;

  commentsFragment.appendChild(commentElement);
  return commentsFragment;
};
/*
 * Функция создания комментариев
 * commentsCount { number } - количество комментариев, которые надо создать
 */
function addСomments(comments, commentsCount) {
  let createdComments = 0; // Создаваемые комментарии
  commentsList.innerHTML = ''; // Очищаем большое фото от комментов

  for (let index = 0; index < commentsCount; index++) {
    if (!comments[index]) {
      break;
    }
    createdComments = index + 1;
    createComment(comments[index]);
    commentsList.appendChild(commentsFragment);
  }
  commentsOpen.textContent = ` ${createdComments} из `;
}

// Функция выхода из полноэкранного просмотра фото по ESC

const onFullScreenEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    buttonLoadMoreComments.classList.remove('hidden');
  }
};

// Функция открытия большое фото

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFullScreenEscKeydown);
}

// Функция открытия большого фото по клику по миниатюре
const onMiniatureClick = (miniature) => () => {

  // Открываем большую картинку
  openBigPicture();

  // Создаем комментарии при открытии
  const next = createCounter(5, COMMENTS_COUNT); // Счетчик комментов
  const commentsCount = next();
  addСomments(miniature.comments, commentsCount); // Функция создания комментов

  // Передаем данные с сервера в большое фото
  imgBig.src = miniature.url;
  likesCount.textContent = miniature.likes;
  totalComments.textContent = miniature.comments.length;
  descriptionBigPicture.textContent = miniature.description;

  // Функция добавки комментариев по нажатию на кнопку
  const loadMoreComments = () => {
    const nextCommentsCount = next();
    addСomments(miniature.comments, nextCommentsCount);
    if (miniature.comments.length <= nextCommentsCount || nextCommentsCount >= COMMENTS_COUNT) {
      buttonLoadMoreComments.classList.add('hidden');
    }
  };

  // Кнопка добавки комментов
  buttonLoadMoreComments.addEventListener('click', loadMoreComments);

  // Функция закрытия большого фото
  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    buttonLoadMoreComments.classList.remove('hidden');

    // Удаление обработчиков
    document.removeEventListener('keydown', onFullScreenEscKeydown);
    buttonLoadMoreComments.removeEventListener('click', loadMoreComments);
    closeUserBigPicture.removeEventListener('click', closeBigPicture);
  };

  // Обработчик кнопки закрытия
  closeUserBigPicture.addEventListener('click', closeBigPicture);
};
/*
if (isEscapeKey) {
  buttonLoadMoreComments.removeEventListener('click', loadMoreComments);
  closeUserBigPicture.removeEventListener('click', closeBigPicture);
}
*/

// Открытие миниатюр по клику
pictureThumbnails.forEach((thumbnail, index) => {
  let miniatures;
  thumbnail.addEventListener('click', onMiniatureClick(miniatures[index]));
});

//TODO Сделать обработчик на весь контейнер миниатюр
// ! Взамен цикла forEach
// ! Сброс обработчика по ESC
// ? Как, пока не ясно


/* Обработчик на всю секцию миниатюр
const sectionPictures = document.querySelector('.pictures');


sectionPictures.addEventListener('click', () => {
 openBigPicture();
 console.log('клик');
});
*/
