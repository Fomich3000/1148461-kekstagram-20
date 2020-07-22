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

  var LIKES_MAX = 200;
  var LIKES_MIN = 15;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var COMMENTS_MAX = 10;

  var generateComments = function (messages, authorNames) {
    var comments = [];
    for (var j = 0; j <= window.util.getRandomInRange(1, COMMENTS_MAX); j++) {
      var comment = {
        avatar: 'img/avatar-' + window.util.getRandomInRange(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: window.util.getRandomFromArray(messages),
        name: window.util.getRandomFromArray(authorNames)
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
        likes: window.util.getRandomInRange(LIKES_MIN, LIKES_MAX),
        comments: generateComments(messages, authorNames)
      };
      photosArray.push(photo);
    }
    return photosArray;
  };

  var photos = generatePhotos(PHOTOS_NUMBER, DESCRIPTION, COMMENTS, NAMES);

  window.data = {
    photos: photos
  };

})();
