'use strict';

(function () {
  var LIKES_MAX = 200;
  var LIKES_MIN = 15;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var COMMENTS_MAX = 10;

  window.data = {
    generateComments: function (messages, authorNames) {
      var comments = [];
      for (var j = 0; j <= window.randomize.getRandomInRange(1, COMMENTS_MAX); j++) {
        var comment = {
          avatar: 'img/avatar-' + window.randomize.getRandomInRange(AVATAR_MIN, AVATAR_MAX) + '.svg',
          message: window.randomize.getRandomFromArray(messages),
          name: window.randomize.getRandomFromArray(authorNames)
        };
        comments.push(comment);
      }
      return comments;
    },

    generatePhotos: function (numberOfPhotos, photoDescription, messages, authorNames) {
      var photosArray = [];

      for (var i = 1; i <= numberOfPhotos; i++) {
        var photo = {
          url: 'photos/' + i + '.jpg',
          description: photoDescription + ' ' + i,
          likes: window.randomize.getRandomInRange(LIKES_MIN, LIKES_MAX),
          comments: window.data.generateComments(messages, authorNames)
        };
        photosArray.push(photo);
      }
      return photosArray;
    }
  };
})();
