import {createUserPosts} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

const miniatures = createUserPosts();

// console.log(commentsItem);
// const countComments = miniatures.map((count) => count.comments.length);
// const urlItems = miniatures.map((key) => key.url);
// const commentsItems = miniatures.map((key) => key.comments.length);

const pictureFragment = document.createDocumentFragment();

miniatures.forEach(({url, likes, comments}) => {
  const miniatureElement = pictureTemplate.cloneNode(true);

  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureFragment.appendChild(miniatureElement);
});

pictures.appendChild(pictureFragment);
export {miniatures};
