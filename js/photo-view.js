import {miniatures} from './miniatures.js';
import {bodyElement} from './upload-file.js';
import {isEscapeKey} from './util.js';

const bigPictureOpen = document.querySelector('.big-picture');
const pictureThumbnails = document.querySelectorAll('.picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const imgBig = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const totalComments = document.querySelector('.comments-count');
const closeUserBigPicture = document.querySelector('.big-picture__cancel');
const descriptionBigPicture = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoad = document.querySelector('.social__comments-loader');
const socialComment = document.querySelector('.social__comment');

const commentsFragment = document.createDocumentFragment();

//Добавляем комментарии

for (let index = 0; index < 23; index++) {
  const commentElement = socialComment.cloneNode(true);
  commentsFragment.append(commentElement);
  if (index > 2) {
    commentElement.classList.add('hidden');
  }
}

socialComments.append(commentsFragment);

// Счетчик комментариев
const commentsUsers = document.querySelectorAll('.social__comment');
//console.log(commentsUsers.length);

let counter = 5;
const onCommentLoad = () => {
  const total = totalComments.textContent;
  counter = total;
  commentsCount.textContent = ` ${counter} из ${total} комментариев `;

  if (counter) {
    commentsLoad.classList.add('hidden');
  }

  for (let index = 0; index < commentsUsers.length; index++) {
    if (commentsUsers[index].classList.contains('hidden')) {
      commentsUsers[index].classList.remove('hidden');
    }
  }
};

commentsLoad.addEventListener('click', onCommentLoad);

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

const avatarUserComment = socialComments.querySelectorAll('.social__picture');
const textUserComment = socialComments.querySelectorAll('.social__text');

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
