const scaleControlCount = document.querySelector('.scale__control--value');
const scaleControlValue = scaleControlCount.value;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview');
let counter = 100;

scaleControlSmaller.addEventListener('click', () => {
  if (counter > 25) {
    counter -= 25;
    scaleControlCount.value = `${counter}%`;
    imgUploadPreview.style.transform = `scale(0.${counter})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (counter !== 100) {
    counter += 25;
    scaleControlCount.value = `${counter}%`;
    imgUploadPreview.style.transform = `scale(0.${counter})`;
    if (counter === 100) {
      imgUploadPreview.style.transform = 'scale(1.0)';
    }
  }
});

export { scaleControlValue, scaleControlCount };
