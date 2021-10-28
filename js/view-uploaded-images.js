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
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

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

const onMiniatureClick = function (picture, miniature) {
  picture.addEventListener('click', () => {
    openBigPicture();
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    imgBig.src = miniature.url;
    likesCount.textContent = miniature.likes;
    commentsCount.textContent = miniature.comments.length;
    descriptionBigPicture.textContent = miniature.description;
  });
};

for (let i = 0; i < pictureThumbnails.length; i++) {
  onMiniatureClick(pictureThumbnails[i], miniatures[i]);
}

closeUserBigPicture.addEventListener('click', () => {
  closeBigPicture();
});

