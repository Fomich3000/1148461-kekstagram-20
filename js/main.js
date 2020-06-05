'use strict';

var LIKES_MAX = 200;
var LIKES_MIN = 15;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MAX = 10;
var PHOTOS_NUMBER = 25;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var names = ['Носуля', 'Капинос', ' Мордань', ' Кривовьязый', ' Ротань', ' Гнилозуб', ' Щербаха', ' Панибудьласка', ' Пидкуймуха', ' Черевуха', ' Пузач', ' Брюхань', ' Трипуз', ' Кривобокий', ' Дрожирук', ' Ногаль', ' Цыбань', ' Желтоног', ' Коленько', ' Немой', ' Заика', ' Гаркавый', ' Глухой', ' Слепой', ' Косогляд', ' Горбань', ' Пригожий', ' Хорошко', ' Рисованный', ' Бридун', ' Нечистяк', ' Кошлатый', ' Чубай', ' Лысый', ' Стригун', ' Чернуха', ' Белян', ' Рудой', ' Сивак', ' Бородайко и Голобородько', ' Тихий', ' Ласковый', ' Святой', ' Деликатный', ' Честный', ' Сладкий'];

var getRandomInRange = function (min, max) {
  var randomValue = Math.floor(Math.random() * (max - min) + min);
  return randomValue;
};

var getRandomFromArray = function (array) {
  var randomValue = array[getRandomInRange(0, array.length)];
  return randomValue;
};

var generateComments = function (messages, authorNames) {
  var randomComments = [];
  var randomComment = {};
  for (var j = 0; j <= getRandomInRange(1, COMMENTS_MAX); j++) {
    randomComment = {
      avatar: 'img/avatar-' + getRandomInRange(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomFromArray(messages),
      name: getRandomFromArray(authorNames)
    };
    randomComments.push(randomComment);
  }
  return randomComments;
};

var generatePhotos = function (numberOfPhotos, photoDescription, messages, authorNames) {
  var photosArray = [];

  for (var i = 1; i <= numberOfPhotos; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      description: photoDescription,
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

var renderPhotos = function (placeToRender, photosToRender) {
  placeToRender.appendChild(photosToRender);
};


var photos = generatePhotos(PHOTOS_NUMBER, 'test', comments, names);
var pictureElement = document.querySelector('#picture').content;
var pictureFragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  var newPictureElement = createPhotoElement(pictureElement, photos[i]);
  pictureFragment.appendChild(newPictureElement);
}

var pictureList = document.querySelector('.pictures');
renderPhotos(pictureList, pictureFragment);
