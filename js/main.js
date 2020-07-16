'use strict';

var PHOTOS_NUMBER = 25;
var DESCRIPTION = 'It is a sample photo description';
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var NAMES = ['Носуля', 'Капинос', ' Мордань', ' Кривовьязый', ' Ротань', ' Гнилозуб', ' Щербаха', ' Панибудьласка', ' Пидкуймуха', ' Черевуха', ' Пузач', ' Брюхань', ' Трипуз', ' Кривобокий', ' Дрожирук', ' Ногаль', ' Цыбань', ' Желтоног', ' Коленько', ' Немой', ' Заика', ' Гаркавый', ' Глухой', ' Слепой', ' Косогляд', ' Горбань', ' Пригожий', ' Хорошко', ' Рисованный', ' Бридун', ' Нечистяк', ' Кошлатый', ' Чубай', ' Лысый', ' Стригун', ' Чернуха', ' Белян', ' Рудой', ' Сивак', ' Бородайко и Голобородько', ' Тихий', ' Ласковый', ' Святой', ' Деликатный', ' Честный', ' Сладкий'];

var DEFAULT_SCALE = 100;
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var SCALE_STEP = 25;

// Photos generation, fragmentation to render

var photos = window.data.generatePhotos(PHOTOS_NUMBER, DESCRIPTION, COMMENTS, NAMES);
var pictureElement = document.querySelector('#picture').content;
var pictureFragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  var newPictureElement = window.picture.createPhotoElement(pictureElement, photos[i]);
  pictureFragment.appendChild(newPictureElement);
}
// Photos rendering

var pictureList = document.querySelector('.pictures');
pictureList.appendChild(pictureFragment);

// Show full-screen photo modal //

var picturesMinis = document.querySelectorAll('.picture');
for (var k = 0; k < picturesMinis.length; k++) {
  window.preview.openPhotoPreviewHandler(picturesMinis[k], photos[k]);
}

// Photo uploading

var uploadInput = document.querySelector('#upload-file');
uploadInput.addEventListener('change', function () {
  window.form.openPhotoEditForm();
});

// Photo scale changing

var scaleMore = document.querySelector('.scale__control--bigger');
var scaleLess = document.querySelector('.scale__control--smaller');
var scaleNumber = document.querySelector('.scale__control--value');

window.form.setScale(DEFAULT_SCALE);

scaleMore.addEventListener('click', function () {
  var scale = parseInt(scaleNumber.value, 10);
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    window.form.setScale(scale);
  } else {
    scaleNumber.value = MAX_SCALE + '%';
  }
});

scaleLess.addEventListener('click', function () {
  var scale = parseInt(scaleNumber.value, 10);
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    window.form.setScale(scale);
  } else {
    scaleNumber.value = MIN_SCALE + '%';
  }
});

// Changing of photo effect

// Hide level by default
window.form.effectLevel.classList.add('hidden');

window.form.effectsSet.addEventListener('change', function () {
  window.effect.changeEffect();
});

// Hashtag validation

var hashtagInput = window.form.photoEditForm.querySelector('.text__hashtags');

hashtagInput.addEventListener('input', function () {
  var hashtagsArray = hashtagInput.value.split(' ');
  for (var h = 0; h < hashtagsArray.length; h++) {
    window.hashtags.hashtagValidation(hashtagsArray, hashtagsArray[h]);
  }
});
