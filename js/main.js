'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var photoTemplate = document.querySelector('#picture').content;
  var fragment = document.createDocumentFragment();
  var photosList = document.querySelector('.pictures');

  // Get photos
  window.handleNewRequest('GET', URL, function (photos) {
    // Renders photo gallery
    for (var i = 0; i < photos.length; i++) {
      var newPhoto = window.createPhoto(photoTemplate, photos[i]);
      fragment.appendChild(newPhoto);
      photosList.appendChild(fragment);
    }
    // Adds big photo modal view for all photos after rendering
    var photoMinis = document.querySelectorAll('.picture');
    for (var j = 0; j < photoMinis.length; j++) {
      window.bigPhotoHandler(photoMinis[j], photos[j]);
    }
  });
})();
