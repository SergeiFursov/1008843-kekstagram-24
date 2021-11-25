//import { createUserPosts } from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

//const miniatures = createUserPosts();

// ! Раньше miniatures создавались вне функции
const renderMiniaturesList = (miniatures) => {
  const picturesFragment = document.createDocumentFragment();

  miniatures.forEach(({ url, likes, comments }) => {
    const miniatureElement = pictureTemplate.cloneNode(true);

    miniatureElement.querySelector('.picture__img').src = url;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniatureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(miniatureElement);
  });
  pictureList.appendChild(picturesFragment);
};

export { renderMiniaturesList, pictureList };
