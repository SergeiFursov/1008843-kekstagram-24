// Функция, возвращающая случайное целое число из переданного диапазона включительно.


function getRandomNumber(min, max) {
  if (min >= max) {
    return;
  }
  return Math.round(Math.random() * (max - min) + min);
}

getRandomNumber(1, 10);

// Функция для проверки максимальной длины строки.

function getStringLength (checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

getStringLength(123, 140);
