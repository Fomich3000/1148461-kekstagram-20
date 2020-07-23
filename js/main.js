'use strict';

(function () {

  var photoElement = document.querySelector('#picture').content;
  var photoFragment = document.createDocumentFragment();
  var photosList = document.querySelector('.pictures');

  // Get photos
  window.load(function (photos) {
    // Renders photo gallery
    for (var i = 0; i < photos.length; i++) {
      var newPictureElement = window.photo.createElement(photoElement, photos[i]);
      photoFragment.appendChild(newPictureElement);
      photosList.appendChild(photoFragment);
    }
    // Adds big photo modal view for all photos after rendering
    var photoMinis = document.querySelectorAll('.picture');
    for (var j = 0; j < photoMinis.length; j++) {
      window.preview.bigPhotoHandler(photoMinis[j], photos[j]);
    }
  }, function () {});

  // Photo uploading
  var uploadInput = document.querySelector('#upload-file');
  uploadInput.addEventListener('change', function () {
    window.form.openElement();
  });
})();
