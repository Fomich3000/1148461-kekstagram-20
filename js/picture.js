'use strict';

(function () {

  var pictureElement = document.querySelector('#picture').content;
  var pictureFragment = document.createDocumentFragment();

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

  for (var i = 0; i < window.data.photos.length; i++) {
    var newPictureElement = createPhotoElement(pictureElement, window.data.photos[i]);
    pictureFragment.appendChild(newPictureElement);

    var pictureList = document.querySelector('.pictures');
    pictureList.appendChild(pictureFragment);
  }
})();
