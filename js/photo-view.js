import {miniatures} from './miniatures.js';
import {bodyElement} from './upload-file.js';
import {isEscapeKey} from './util.js';


const bigPictureOpen = document.querySelector('.big-picture');
const pictureThumbnails = document.querySelectorAll('.picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const imgBig = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const totalComments= document.querySelector('.comments-count');
const closeUserBigPicture = document.querySelector('.big-picture__cancel');
const descriptionBigPicture = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');

//const commentsCount = document.querySelector('.social__comment-count');
const socialComment = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

//Добавляем комментарии

function getComments() {
  const commentElement = socialComment.cloneNode(true);
  commentsFragment.appendChild(commentElement);
  commentsList.appendChild(commentsFragment);
}

for (let index = 0; index < 3; index++) {
  getComments(miniatures[index]);
}

const buttonUploadComments = document.querySelector('.comments-loader');

buttonUploadComments.addEventListener('click', () => {
  for (let index = 0; index < 3; index++) {
    getComments(miniatures[index]);
  }
});

// Закрываем по ESC

const onFullScreenEscKeydown = (evt) => {
  if (isEscapeKey(evt)) { // )
    evt.preventDefault();
    bigPictureOpen.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    buttonUploadComments.classList.remove('hidden');
  }
};

function openBigPicture() {
  bigPictureOpen.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onFullScreenEscKeydown);

}

function closeBigPicture() {
  bigPictureOpen.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullScreenEscKeydown);
  buttonUploadComments.classList.remove('hidden');
}

// Передаем данные в комментарии

const avatarUserComment = commentsList.querySelectorAll('.social__picture');
const textUserComment = commentsList.querySelectorAll('.social__text');

const openUserBigPicture = (miniature) => () => {
  openBigPicture();
  imgBig.src = miniature.url;
  likesCount.textContent = miniature.likes;
  totalComments.textContent = miniature.comments.length;
  descriptionBigPicture.textContent = miniature.description;

  miniature.comments.forEach((comment, index) => {
    avatarUserComment[index].src = comment.avatar;
    avatarUserComment[index].alt = comment.name;
    textUserComment[index].textContent = comment.message;
  });
};

pictureThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', openUserBigPicture(miniatures[index]));
});

closeUserBigPicture.addEventListener('click', () => {
  closeBigPicture();
});
