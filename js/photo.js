'use strict';

(function () {

  window.createPhoto = function (element, photo) {
    var newPhoto = element.cloneNode(true);
    var img = newPhoto.querySelector('.picture__img');
    var likes = newPhoto.querySelector('.picture__likes');
    var comments = newPhoto.querySelector('.picture__comments');
    img.src = photo.url;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;
    return newPhoto;
  };
})();
