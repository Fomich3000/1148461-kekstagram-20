'use strict';

var LIKES_MAX = 200;
var LIKES_MIN = 15;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MAX = 10;
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
bigPictureImg.querySelector('img').src = photos[0].url;
bigPictureLikesNumber.textContent = photos[0].likes;
bigPictureCommentsNumber.textContent = photos[0].comments.length;
bigPictureCaption.textContent = photos[0].description;
bigPictureCommentCounter.classList.add('hidden');
bigPictureMoreLoader.classList.add('hidden');

var commentsFragment = document.createDocumentFragment();

for (var j = 0; j < photos[0].comments.length; j++) {
  var commentElement = bigPictureComments.querySelector('.social__comment');
  var newCommentElement = commentElement.cloneNode(true);
  newCommentElement.querySelector('img').src = photos[0].comments[j].avatar;
  newCommentElement.querySelector('img').alt = photos[0].comments[j].authorNames;
  newCommentElement.querySelector('.social__text').textContent = photos[0].comments[j].message;
  commentsFragment.appendChild(newCommentElement);
}

bigPictureComments.innerHTML = '';
bigPictureComments.appendChild(commentsFragment);
