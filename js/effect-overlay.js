import { scaleControlCount, scaleControlValue } from './scale.js';

const effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat',
];

const imgUploadPreview = document.querySelector('.img-upload__preview');
const thumbnails = document.querySelectorAll('.effects__radio');
const sliderEffects = document.querySelector('.effect-level__slider');
const levelValueEffect = document.querySelector('.effect-level__value');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectInvert = document.querySelector('#effect-marvin');
const effectBlur = document.querySelector('#effect-phobos');
const effectBrightness = document.querySelector('#effect-heat');

const onThumbnailEffectClick = (effect) => () => {
  imgUploadPreview.className = `img-upload__preview  ${effect}`;
};

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', onThumbnailEffectClick(effects[index]));
});

noUiSlider.create(sliderEffects, {
  range: {
    'min': 0,
    'max': 10,
  },
  start: 1,
  step: 1,
  connect: 'lower',
});

effectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderEffects.classList.add('hidden');
    imgUploadPreview.style = '';
    scaleControlCount.value = `${scaleControlValue}`;
  }
});

const sliderUpdateOptions = (evt, distance, mark, move) => {
  sliderEffects.classList.remove('hidden');
  if (evt.target.checked) {
    sliderEffects.noUiSlider.updateOptions({
      range: distance,
      start: mark,
      step: move,
      connect: 'lower',
    });
  }
};

const updateFilter = (layer, unit) => (values, handle) => {
  levelValueEffect.value = values[handle];
  imgUploadPreview.style.filter = `${layer}(${levelValueEffect.value}${unit})`;
};

effectChrome.addEventListener('change', (evt) => {
  sliderUpdateOptions(evt, { 'min': 0, 'max': 1 }, 1, 0.1);
  sliderEffects.noUiSlider.on('update', updateFilter('grayscale', '0'));
});

effectSepia.addEventListener('change', (evt) => {
  sliderUpdateOptions(evt, { 'min': 0, 'max': 1 }, 1, 0.1);
  sliderEffects.noUiSlider.on('update', updateFilter('sepia', '0'));
});

effectInvert.addEventListener('change', (evt) => {
  sliderUpdateOptions(evt, { 'min': 0, 'max': 100 }, 100, 1);
  sliderEffects.noUiSlider.on('update', updateFilter('invert', '%'));
});

effectBlur.addEventListener('change', (evt) => {
  sliderUpdateOptions(evt, { 'min': 0, 'max': 3 }, 3, 0.1);
  sliderEffects.noUiSlider.on('update', updateFilter('blur', 'px'));
});

effectBrightness.addEventListener('change', (evt) => {
  sliderUpdateOptions(evt, { 'min': 1, 'max': 3 }, 3, 0.1);
  sliderEffects.noUiSlider.on('update', updateFilter('brightness', '0'));
});

export { sliderEffects };

// ! Сделать сброс на оригинал размер фото после отправки - 100%
// ! Сброс эффекта на оригинал при отправке формы
