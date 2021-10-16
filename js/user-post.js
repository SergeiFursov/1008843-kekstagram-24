import {shuffle, getRandomNumber} from './util';
import {generateId, createCommentUser} from './comment-user';
import {DESCRIPTIONS, COMMENTS_COUNT, PHOTOS_DESCRIPTION_COUNT} from './variables';

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

Array.from({length: PHOTOS_DESCRIPTION_COUNT}, createUserPost);
