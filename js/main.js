'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var renderPhotoGallery = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var newPhoto = window.createPhoto(photoTemplate, photos[i]);
      fragment.appendChild(newPhoto);
      photosList.appendChild(fragment);
      var photosElements = photosList.getElementsByClassName('picture');
      var lastPhotoElement = photosElements.length;
      console.log(photosElements[lastPhotoElement]);
      /* window.bigPhotoHandler(photosElements[photosElements.length], newPhoto); */
    }
  };

  var showDefaultPhotos = function () {
    console.log(1);
  };
  var showRandomPhotos = function () {
    console.log(2);
  };

  var showDiscussed = function () {
    var unsortedPhotos = photos;
    var mostDiscussedPhotos = unsortedPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    var photosMarkup = photosList.getElementsByClassName('picture');
    while (photosMarkup.length > 0) {
      photosMarkup[0].parentNode.removeChild(photosMarkup[0]);
    }
    renderPhotoGallery(mostDiscussedPhotos);
  };

  var filterValueToFunction = {
    'filter-default': showDefaultPhotos,
    'filter-random': showRandomPhotos,
    'filter-discussed': showDiscussed,
  };

  var successHandler = function (data) {
    photos = data;

    // Renders photo gallery
    renderPhotoGallery(photos);

    // Adds big photo modal view for all photos after rendering
    /*     var addBigPhotoModal = function (index) {
          var photoMinis = document.querySelectorAll('.picture');
          for (var index = 0; index < photoMinis.length; index++) {
            window.bigPhotoHandler(photoMinis[index], photos[i]);
          }
        } */
    /*     var photoMinis = document.querySelectorAll('.picture');
        for (var k = 0; k < photoMinis.length; k++) {
          window.bigPhotoHandler(photoMinis[k], photos[k]);
        } */

    var updatePhotos = function (index) {
      var activeButton = form.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      var newActiveButton = filterButtons[index];
      newActiveButton.classList.add('img-filters__button--active');
      filterValueToFunction[newActiveButton.id]();
    };

    var listenFilterButton = function (index) {
      filterButtons[index].addEventListener('click', function () {
        updatePhotos(index);
      });
    };

    for (var j = 0; j < filterButtons.length; j++) {
      listenFilterButton(j);
    }
  };

  var photoTemplate = document.querySelector('#picture').content;
  var fragment = document.createDocumentFragment();
  var photosList = document.querySelector('.pictures');
  var photos = [];

  window.handleNewRequest('GET', URL, successHandler);
  // Get photos

  var filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  var form = document.querySelector('.img-filters__form');
  var filterButtons = form.querySelectorAll('.img-filters__button');
})();
