import {getRandomNumber, createIdGenerator} from './util';
import {NAMES, MESSAGES} from './variables';


const generateId = createIdGenerator ();

const createCommentUser = () => {
  const randomNameNumber =  getRandomNumber(0, NAMES.length - 1);
  const randomMessageNumber =  getRandomNumber(0, MESSAGES.length - 1);
  const randomAvatarId = getRandomNumber(1, 6);

  return {
    id: generateId(),
    avatar: `img/avatar-${  randomAvatarId  }.svg`,
    message: MESSAGES[randomMessageNumber],
    name: NAMES[randomNameNumber],
  };
};

createCommentUser();
export {generateId, createCommentUser};
