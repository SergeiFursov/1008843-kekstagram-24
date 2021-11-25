function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    return;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isStringShorterThanMax(checkedString, maxLength) {
  return checkedString <= maxLength;
}

function createIdGenerator () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}


function createCounter(step, maxValue) {
  let counter = 0;

  return () => {
    counter += step;
    return Math.min(counter, maxValue);
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {createCounter, createIdGenerator, shuffle, getRandomNumber, isEscapeKey, isStringShorterThanMax};
