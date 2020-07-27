'use strict';

(function() {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var RANDOM_PHOTOS_TO_SHOW = 10;

  var photoTemplate = document.querySelector('#picture').content;
  var photosList = document.querySelector('.pictures');

  var photos = [];

  var successHandler = function(data) {

    photos = data;

    // Renders photo gallery
    renderPhotoGallery(photos);

    var updatePhotos = function(index) {
      var activeButton = form.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      var newActiveButton = filterButtons[index];
      newActiveButton.classList.add('img-filters__button--active');
      filterValueToFunction[newActiveButton.id]();
    };

    var listenFilterButton = function(index) {
      filterButtons[index].addEventListener('click', function() {
        updatePhotos(index);
      });
    };

    for (var j = 0; j < filterButtons.length; j++) {
      listenFilterButton(j);
    }
  };

  // Renders photo gallery
  var renderPhotoGallery = function(photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      var newPhoto = window.createPhoto(photoTemplate, photosArray[i]);
      fragment.appendChild(newPhoto);
    }
    photosList.appendChild(fragment);
    addBigPhotoModal();
  };

  // Adds big photo modal view for all photos after rendering
  var addBigPhotoModal = function() {
    var photoMinis = document.querySelectorAll('.picture');
    for (var i = 0; i < photoMinis.length; i++) {
      window.bigPhotoHandler(photoMinis[i], photos[i]);
    }
  };

  var clearPhotoGallery = function() {
    var photosMarkup = photosList.getElementsByClassName('picture');
    while (photosMarkup.length > 0) {
      photosMarkup[0].parentNode.removeChild(photosMarkup[0]);
    }
  };

  // Get photos
  window.handleNewRequest('GET', URL, successHandler);

  // Enable filters
  var filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  var form = document.querySelector('.img-filters__form');
  var filterButtons = form.querySelectorAll('.img-filters__button');

  var showDefaultPhotos = function() {
    clearPhotoGallery();
    renderPhotoGallery(photos);
  };

  var showRandomPhotos = function() {
    var randomPhotoArray = [];
    var unsortedPhotos = photos.slice(0);
    for (var i = 0; i < RANDOM_PHOTOS_TO_SHOW; i++) {
      var randomPhoto = window.util.getRandomFromArray(unsortedPhotos);
      randomPhotoArray.push(randomPhoto);
    }
    clearPhotoGallery();
    renderPhotoGallery(randomPhotoArray);
  };

  var showDiscussed = function() {
    var unsortedPhotos = photos.slice(0);
    var mostDiscussedPhotos = unsortedPhotos.sort(function(a, b) {
      return b.comments.length - a.comments.length;
    });
    clearPhotoGallery();
    renderPhotoGallery(mostDiscussedPhotos);
  };

  var filterValueToFunction = {
    'filter-default': showDefaultPhotos,
    'filter-random': showRandomPhotos,
    'filter-discussed': showDiscussed,
  };
})();
