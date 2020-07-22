'use strict';

(function () {

  // Photo gallery rendering

  var picturesMinis = document.querySelectorAll('.picture');
  for (var i = 0; i < picturesMinis.length; i++) {
    window.preview.bigPhotoHandler(picturesMinis[i], window.data.photos[i]);
  }

  // Photo uploading

  var uploadInput = document.querySelector('#upload-file');
  uploadInput.addEventListener('change', function () {
    window.form.openElement();
  });

})();
