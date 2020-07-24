'use strict';

(function () {

  window.picture.createPhotoElement = function (element, photo) {
    var newElement = element.cloneNode(true);
    var imgElement = newElement.querySelector('.picture__img');
    var likesElement = newElement.querySelector('.picture__likes');
    var commentsElement = newElement.querySelector('.picture__comments');
    imgElement.src = photo.url;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;
    return newElement;
  };
})();
