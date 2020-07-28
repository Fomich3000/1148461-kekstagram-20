'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var photoTemplate = document.querySelector('#picture').content;
  var photosList = document.querySelector('.pictures');

  var form = document.querySelector('.img-filters__form');
  var filterButtons = form.querySelectorAll('.img-filters__button');

  var photos = [];

  var updatePhotos = window.debounce(function (evt) {

    var button = evt.target;
    var buttonId = evt.target.id;

    var activeButton = form.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');

    button.classList.add('img-filters__button--active');
    filterValueToFunction[buttonId]();
  });

  var successHandler = function (data) {

    photos = data;

    // Renders photo gallery
    renderPhotoGallery(photos);

    var listenFilterButton = function (button) {
      button.addEventListener('click', function (evt) {
        updatePhotos(evt);
      });
    };

    filterButtons.forEach(listenFilterButton);
  };

  // Renders photo gallery
  var renderPhotoGallery = function (photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      var newPhoto = window.createPhoto(photoTemplate, photosArray[i]);
      fragment.appendChild(newPhoto);
    }
    photosList.appendChild(fragment);
    addBigPhotoModal();
  };

  // Adds big photo modal view for all photos after rendering
  var addBigPhotoModal = function () {

    var photoMinis = document.querySelectorAll('.picture');
    photoMinis.forEach(function (photoMini, index) {
      window.bigPhotoHandler(photoMini, photos[index]);
    });
  };

  var clearPhotoGallery = function () {
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

  var showDefaultPhotos = function () {
    clearPhotoGallery();
    renderPhotoGallery(photos);
  };

  var showRandomPhotos = function () {
    var randomNumbersArray = window.util.getRandomNumbersArray(0, photos.length).slice(0, 10);
    var randomPhotoArray = [];

    for (var i = 0; i < randomNumbersArray.length; i++) {
      randomPhotoArray.push(photos[randomNumbersArray[i]]);
    }
    clearPhotoGallery();
    renderPhotoGallery(randomPhotoArray);
  };

  var showDiscussed = function () {
    var unsortedPhotos = photos.slice(0);
    var mostDiscussedPhotos = unsortedPhotos.sort(function (a, b) {
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
