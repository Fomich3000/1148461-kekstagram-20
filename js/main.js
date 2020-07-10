'use strict';

(function () {

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

  var DEFAULT_EFFECT_LEVEL = 100;

  // Generating of photos and putting them to fragment to render

  var photos = window.data.generatePhotos(PHOTOS_NUMBER, DESCRIPTION, COMMENTS, NAMES);
  var pictureElement = document.querySelector('#picture').content;
  var pictureFragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var newPictureElement = window.picture.createPhotoElement(pictureElement, photos[i]);
    pictureFragment.appendChild(newPictureElement);
  }
  // Rendering of photos

  var pictureList = document.querySelector('.pictures');
  pictureList.appendChild(pictureFragment);

  // Full-screen photo view modal //

  var picturesMinis = document.querySelectorAll('.picture');
  for (var k = 0; k < picturesMinis.length; k++) {
    window.preview.openPhotoPreviewHandler(picturesMinis[k], photos[k]);
  }

  // Photo uploading

  var uploadInput = document.querySelector('#upload-file');
  uploadInput.addEventListener('change', function () {
    window.form.openPhotoEditForm();
  });

  // Changing of photo scale

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

  var effectsSet = window.form.photoEditForm.querySelector('.effects');
  var effectLevel = window.form.photoEditForm.querySelector('.effect-level');
  var effectLevelPin = window.form.photoEditForm.querySelector('.effect-level__pin');
  var effectLevelValue = window.form.photoEditForm.querySelector('.effect-level__value');

  effectsSet.addEventListener('change', function () {
    var checkedEffect = window.form.photoEditForm.querySelector('.effects__radio:checked');
    var effectValue = checkedEffect.value;
    effectLevel.classList.toggle('hidden', effectValue === 'none');
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
    window.form.photoPreview.classList.add('effects__preview--' + effectValue);
    if (effectValue !== 'none') {
      window.form.setImageEffect(effectValue);
    }
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var pxToPercent = function (px) {
      var percentNumber = px * (1 / (line.offsetWidth / 100));
      return percentNumber.toFixed(1);
    };

    var line = document.querySelector('.effect-level__line');

    var shiftX = evt.clientX - effectLevelPin.getBoundingClientRect().left;

    var onMouseMove = function (moveEvt) {
      var newX = moveEvt.clientX - shiftX - effectLevelPin.getBoundingClientRect().left;
      if (newX < 0) {
        newX = 0;
      }
      var lineRightSide = line.offsetWidth;
      if (newX > lineRightSide) {
        newX = lineRightSide;
      }

      effectLevelPin.style.left = pxToPercent(newX) + '%';
    };

    document.addEventListener('mousemove', onMouseMove);

    // from 410 till 881 - line; 453px - line; 1% - 4.53px

    /*     var onMouseMove = function (moveEvt) {
        }; */
  });

  // Hashtag validation

  var hashtagInput = window.form.photoEditForm.querySelector('.text__hashtags');

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
})();
