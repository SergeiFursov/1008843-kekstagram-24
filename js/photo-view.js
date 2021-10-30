import {miniatures} from './miniatures.js';
import {bodyElement} from './upload-file.js';
import {isEscapeKey} from './util.js';

const bigPictureOpen = document.querySelector('.big-picture');
const pictureThumbnails = document.querySelectorAll('.picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const imgBig = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const closeUserBigPicture = document.querySelector('.big-picture__cancel');
const descriptionBigPicture = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const avatarUserComment = socialComments.querySelectorAll('.social__picture');
const textUserComment = socialComments.querySelectorAll('.social__text');

const onFullScreenEscKeydown = (evt) => {
  if (isEscapeKey(evt)) { // )
    evt.preventDefault();
    bigPictureOpen.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
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
}

const openUserBigPicture = (miniature) => () => {
  openBigPicture();
  imgBig.src = miniature.url;
  likesCount.textContent = miniature.likes;
  commentsCount.textContent = miniature.comments.length;
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
