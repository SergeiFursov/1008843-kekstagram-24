import { isEscapeKey } from './util.js';
import { bodyElement } from './upload-file.js';
import { miniatures } from './miniatures.js';

const bigPicture = document.querySelector('.big-picture');
const pictureThumbnails = document.querySelectorAll('.picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const imgBig = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const totalComments = document.querySelector('.comments-count');
const closeUserBigPicture = document.querySelector('.big-picture__cancel');
const descriptionBigPicture = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const buttonLoadMoreComments = document.querySelector('.comments-loader');
const numberOpenComments = document.querySelector('.social__comment-count');
const commentsCount = numberOpenComments.firstChild;
let countOpenComments = 5;

// Закрываем по ESC

const onFullScreenEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    buttonLoadMoreComments.classList.remove('hidden');
  }
};

// Открываем большое фото

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onFullScreenEscKeydown);
}

//  Закрываем большое фото

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  buttonLoadMoreComments.classList.remove('hidden');

  //counter = INITIAL_NUMBER_COMMENTS;
  //commentsCount.textContent = ` ${counter} из ${totalComments.textContent} комментариев`;

  document.removeEventListener('keydown', onFullScreenEscKeydown);
};

closeUserBigPicture.addEventListener('click', closeBigPicture);

//const avatarUsers = commentsList.querySelectorAll('.social__picture');
//const textCommentsUsers = commentsList.querySelectorAll('.social__text');
//console.log(commentsList);

// Создаем элемент разметки

const socialComment = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

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

// Передаем данные

let startIndex = 0;
const COUNT_COMMENT = 5;
function addСomments() {
  for (let index = startIndex; index < startIndex + COUNT_COMMENT; index++) {
    createComment(miniatures[index].comments[index]);
    commentsList.appendChild(commentsFragment);
  }
  startIndex += 5;
}

const onMiniatureClick = (miniature) => () => {
  openBigPicture();
  commentsCount.textContent = ` ${countOpenComments} из `;
  commentsList.innerHTML = '';
  addСomments();

  //const avatarsUser = commentsList.querySelectorAll('.social__picture');
  //const textCommentsUser = commentsList.querySelectorAll('.social__text');
  //console.log(commentsList);
  //console.log(avatarsUser);
  //console.log(avatarsUser);


  imgBig.src = miniature.url;
  likesCount.textContent = miniature.likes;
  totalComments.textContent = miniature.comments.length;
  descriptionBigPicture.textContent = miniature.description;
  /*
    miniature.comments.forEach((comment, index) => {
      avatarsUser[index].src = comment.avatar;
      avatarsUser[index].alt = comment.name;
      textCommentsUser[index].textContent = comment.message;
    });
  */
};

pictureThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', onMiniatureClick(miniatures[index]));
});

// Добавляем комментарии

buttonLoadMoreComments.addEventListener('click', () => {
  const countTotal = totalComments.textContent;
  addСomments();
  countOpenComments += COUNT_COMMENT;
  commentsCount.textContent = ` ${countOpenComments} из `;

  if (countOpenComments >= countTotal) {
    buttonLoadMoreComments.classList.add('hidden');
  }
});

