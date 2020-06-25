'use strict';

var LIKES_MAX = 200;
var LIKES_MIN = 15;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MAX = 10;
var PHOTOS_NUMBER = 25;
var DEFAULT_SCALE = 100;
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var SCALE_STEP = 25;
var DEFAULT_LEVEL = '100%';

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

var getRandomInRange = function (min, max) {
  var randomValue = Math.floor(Math.random() * (max - min) + min);
  return randomValue;
};

var getRandomFromArray = function (array) {
  var randomValue = array[getRandomInRange(0, array.length)];
  return randomValue;
};

var generateComments = function (messages, authorNames) {
  var comments = [];
  for (var j = 0; j <= getRandomInRange(1, COMMENTS_MAX); j++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInRange(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomFromArray(messages),
      name: getRandomFromArray(authorNames)
    };
    comments.push(comment);
  }
  return comments;
};

var generatePhotos = function (numberOfPhotos, photoDescription, messages, authorNames) {
  var photosArray = [];

  for (var i = 1; i <= numberOfPhotos; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      description: photoDescription + ' ' + i,
      likes: getRandomInRange(LIKES_MIN, LIKES_MAX),
      comments: generateComments(messages, authorNames)
    };
    photosArray.push(photo);
  }
  return photosArray;
};

var createPhotoElement = function (element, photo) {
  var newElement = element.cloneNode(true);
  var imgElement = newElement.querySelector('.picture__img');
  var likesElement = newElement.querySelector('.picture__likes');
  var commentsElement = newElement.querySelector('.picture__comments');
  imgElement.src = photo.url;
  likesElement.textContent = photo.likes;
  commentsElement.textContent = photo.comments.length;
  return newElement;
};

var photos = generatePhotos(PHOTOS_NUMBER, DESCRIPTION, COMMENTS, NAMES);
var pictureElement = document.querySelector('#picture').content;
var pictureFragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  var newPictureElement = createPhotoElement(pictureElement, photos[i]);
  pictureFragment.appendChild(newPictureElement);
}

var pictureList = document.querySelector('.pictures');
pictureList.appendChild(pictureFragment);

// Full-screen photo view //

var bigPictureSection = document.querySelector('.big-picture');
bigPictureSection.classList.remove('hidden');

var bigPictureImg = bigPictureSection.querySelector('.big-picture__img');
var bigPictureLikesNumber = bigPictureSection.querySelector('.likes-count');
var bigPictureCommentsNumber = bigPictureSection.querySelector('.comments-count');
var bigPictureComments = bigPictureSection.querySelector('.social__comments');
var bigPictureCaption = bigPictureSection.querySelector('.social__caption');
var bigPictureMoreLoader = bigPictureSection.querySelector('.comments-loader');
var bigPictureCommentCounter = bigPictureSection.querySelector('.social__comment-count');
var bodyElement = document.querySelector('body');

bodyElement.classList.add('modal-open');

var createBigPhotoElement = function (photo) {
  bigPictureImg.querySelector('img').src = photo.url;
  bigPictureLikesNumber.textContent = photo.likes;
  bigPictureCommentsNumber.textContent = photo.comments.length;
  bigPictureCaption.textContent = photo.description;
};

bigPictureCommentCounter.classList.add('hidden');
bigPictureMoreLoader.classList.add('hidden');

var commentsFragment = document.createDocumentFragment();

var createCommentsElement = function (photo) {
  for (var j = 0; j < photo.comments.length; j++) {
    var commentElement = bigPictureComments.querySelector('.social__comment');
    var newCommentElement = commentElement.cloneNode(true);
    newCommentElement.querySelector('img').src = photo.comments[j].avatar;
    newCommentElement.querySelector('img').alt = photo.comments[j].authorNames;
    newCommentElement.querySelector('.social__text').textContent = photo.comments[j].message;
    commentsFragment.appendChild(newCommentElement);
  }
};

createBigPhotoElement(photos[0]);
createCommentsElement(photos[0]);

bigPictureComments.innerHTML = '';
bigPictureComments.appendChild(commentsFragment);

bigPictureSection.classList.add('hidden');

// Photo uploading

var uploadInput = document.querySelector('#upload-file');
var photoEditForm = document.querySelector('.img-upload__overlay');
var editFormCloseButton = document.querySelector('.img-upload__cancel');

var editFormOnEsc = function (evt) {
  if (evt.key === 'Escape') {
    closePhotoEditForm();
    document.removeEventListener('keydown', editFormOnEsc);
  }
};

var openPhotoEditForm = function () {
  bodyElement.classList.add('modal-open');
  photoEditForm.classList.remove('hidden');
  document.addEventListener('keydown', editFormOnEsc);
};

var closePhotoEditForm = function () {
  photoEditForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInput.value = '';
};

uploadInput.addEventListener('change', function () {
  openPhotoEditForm();
});

editFormCloseButton.addEventListener('click', function () {
  closePhotoEditForm();
});

// Changing of photo scale

var scaleMore = document.querySelector('.scale__control--bigger');
var scaleLess = document.querySelector('.scale__control--smaller');
var scaleNumber = document.querySelector('.scale__control--value');
var photoPreview = document.querySelector('.img-upload__preview');

var scale = DEFAULT_SCALE;
scaleNumber.value = scale + '%';

scaleMore.addEventListener('click', function () {
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    scaleNumber.value = scale + '%';
    photoPreview.style.transform = 'scale(' + scale / 100 + ')';
  } else {
    scaleNumber.value = MAX_SCALE + '%';
  }
});

scaleLess.addEventListener('click', function () {
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    scaleNumber.value = scale + '%';
    photoPreview.style.transform = 'scale(' + scale / 100 + ')';
  } else {
    scaleNumber.value = MIN_SCALE + '%';
  }
});

// Changing of photo effect

var effectsSet = photoEditForm.querySelector('.effects');
var effects = photoEditForm.querySelectorAll('.effects__radio');

var effectLevel = photoEditForm.querySelector('.effect-level');
var effectLevelPin = photoEditForm.querySelector('.effect-level__pin');
var effectValue = photoEditForm.querySelector('.effect-level__value');

var checkEffect = function () {
  switch (true) {
    case photoPreview.classList.contains('effects__preview--none'):
      photoPreview.style.filter = null;
      effectLevel.classList.add('hidden');
      break;
    case photoPreview.classList.contains('effects__preview--chrome'):
      photoPreview.style.filter = 'grayscale(' + effectValue.value / 100 + ')';
      break;
    case photoPreview.classList.contains('effects__preview--sepia'):
      photoPreview.style.filter = 'sepia(' + effectValue.value / 100 + ')';
      break;
    case photoPreview.classList.contains('effects__preview--marvin'):
      photoPreview.style.filter = 'invert(' + effectValue.value + '%)';
      break;
    case photoPreview.classList.contains('effects__preview--phobos'):
      photoPreview.style.filter = 'blur(' + effectValue.value * 3 / 100 + 'px)';
      break;
    case photoPreview.classList.contains('effects__preview--heat'):
      photoPreview.style.filter = 'brightness(' + effectValue.value * 4 / 100 + ')';
      break;
  }
};

effectLevelPin.style.left = DEFAULT_LEVEL;
effectLevel.classList.add('hidden');

effectsSet.addEventListener('change', function () {
  for (var j = 0; j < effects.length; j++) {
    if (effects[j].checked) {
      effectLevel.classList.remove('hidden');
      effectLevelPin.style.left = DEFAULT_LEVEL;
      effectValue.value = effectLevelPin.style.left.slice(0, -1);
      photoPreview.classList.add('effects__preview--' + effects[j].value);
      checkEffect();
    } else if (effects[j].checked === false) {
      photoPreview.classList.remove('effects__preview--' + effects[j].value);
    }
  }
});

effectLevelPin.addEventListener('mouseup', function () {
  checkEffect();
});

// Hashtag validation

var hashtagInput = photoEditForm.querySelector('.text__hashtags');

var showNotification = function (notificationText, whereToShow) {
  whereToShow.setCustomValidity(notificationText);
  whereToShow.reportValidity();
};

var hasDuplicates = function (array) {
  var valuesSoFar = [];
  for (var j = 0; j < array.length; ++j) {
    var value = array[j].toLowerCase(); // hashtag should be case insensitive
    if (valuesSoFar.indexOf(value) !== -1) {
      return true;
    }
    valuesSoFar.push(value);
  }
  return false;
};

var hashtagValidation = function (hashtags, hashtag) {
  var firstHashRegexp = /^#/;
  var alphanumRegexp = /^#[a-zA-Za-zA-Z0-9]+$/;
  if (hashtags.length > 5) {
    showNotification('Максимальное количество хештегов - 5', hashtagInput);
  } else if (hashtag[0] === '#' && hashtag.length === 1) {
    showNotification('Хэштэг не может состоять только из cимвола "#"', hashtagInput);
  } else if (hasDuplicates(hashtags)) {
    showNotification('В поле присутствуют одинаковые хэштеги', hashtagInput);
  } else if (firstHashRegexp.test(hashtag) === false) {
    showNotification('Хештег должен начинаться с символа "#"', hashtagInput);
  } else if (hashtag.length > 20) {
    showNotification('Длина хештега не должна превышать 20 символов', hashtagInput);
  } else if (alphanumRegexp.test(hashtag) === false) {
    showNotification('Хештеги могут содержать только буквы и цифры', hashtagInput);
  } else {
    showNotification('', hashtagInput);
  }
};

hashtagInput.addEventListener('input', function () {
  var hashtagsArray = hashtagInput.value.split(' ');
  for (var h = 0; h < hashtagsArray.length; h++) {
    hashtagValidation(hashtagsArray, hashtagsArray[h]);
  }
});
