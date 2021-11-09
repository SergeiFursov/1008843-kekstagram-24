import {miniatures} from './miniatures.js';
import {bodyElement} from './upload-file.js';
import {isEscapeKey} from './util.js';
import {INITIAL_NUMBER_COMMENTS} from './data.js';

const bigPictureOpen = document.querySelector('.big-picture');
const pictureThumbnails = document.querySelectorAll('.picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const imgBig = bigPictureImg.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const totalComments= document.querySelector('.comments-count');
const closeUserBigPicture = document.querySelector('.big-picture__cancel');
const descriptionBigPicture = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');

const commentsCount = document.querySelector('.social__comment-count');
const socialComment = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

//Добавляем комментарии

for (let index = 0; index < miniatures.length; index++) {
  const commentElement = socialComment.cloneNode(true);
  commentsFragment.append(commentElement);
  if (index > 2) {
    commentElement.classList.add('hidden');
  }
}

socialComments.append(commentsFragment);

// Счетчик комментариев

const commentsUsers = document.querySelectorAll('.social__comment');
const buttonUploadComments = document.querySelector('.comments-loader');

let counter;
const onCommentLoad = () => {
  const total = totalComments.textContent;
  counter = total;
  commentsCount.textContent = ` ${counter} из ${total} комментариев`;
  if (counter === total) {
    buttonUploadComments.classList.add('hidden');
  }

  for (let index = 0; index < commentsUsers.length; index++) {
    if (commentsUsers[index].classList.contains('hidden')) {
      commentsUsers[index].classList.remove('hidden');
    }
  }
};

buttonUploadComments.addEventListener('click', onCommentLoad);

// Закрываем по ESC

const onFullScreenEscKeydown = (evt) => {
  if (isEscapeKey(evt)) { // )
    evt.preventDefault();
    bigPictureOpen.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    buttonUploadComments.classList.remove('hidden');
    counter = INITIAL_NUMBER_COMMENTS;
    commentsCount.textContent = ` ${counter} из ${totalComments.textContent} комментариев`;

    for (let index = 0; index < commentsUsers.length - 5; index++) {
      commentsUsers[index].classList.add('hidden');
    }
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
  counter = INITIAL_NUMBER_COMMENTS;
  commentsCount.textContent = ` ${counter} из ${totalComments.textContent} комментариев`;

  for (let index = 0; index < commentsUsers.length - 5; index++) {
    commentsUsers[index].classList.add('hidden');
  }
}
// Передаем данные в комментарии

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
