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

  var onSuccesResponseDo = function (data) {

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
  var renderPhotoGallery = function (photosToRender) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosToRender.length; i++) {
      var newPhoto = window.createPhoto(photoTemplate, photosToRender[i]);
      fragment.appendChild(newPhoto);
    }
    photosList.appendChild(fragment);
    addBigPhotoModal(photosToRender);
  };

  // Adds big photo modal view for all photos after rendering
  var addBigPhotoModal = function (galleryPhotos) {
    var photoMinis = document.querySelectorAll('.picture');
    galleryPhotos.forEach(function (galleryPhoto, index) {
      window.addClickEventToPhoto(photoMinis[index], galleryPhoto);
    });
  };

  var clearPhotoGallery = function () {
    var photoMinis = photosList.querySelectorAll('.picture');
    photoMinis.forEach(function (photoMini) {
      photoMini.parentNode.removeChild(photoMini);
    });
  };

  // Get photos
  window.createNewRequest('GET', URL, onSuccesResponseDo);

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
