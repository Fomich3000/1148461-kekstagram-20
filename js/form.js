'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/';
  var HASHTAGS_MAX = 5;

  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('.img-upload__submit');
  var uploadControl = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var editFormCloseButton = document.querySelector('.img-upload__cancel');
  var hashtagInput = photoEditForm.querySelector('.text__hashtags');
  var commentsInput = photoEditForm.querySelector('.text__description');

  window.form = form;

  var openForm = function () {
    body.classList.add('modal-open');
    photoEditForm.classList.remove('hidden');
    editFormCloseButton.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscCloseForm);
    hashtagInput.addEventListener('keydown', window.util.stayOpenOnEsc);
    commentsInput.addEventListener('keydown', window.util.stayOpenOnEsc);
    window.effects.list.addEventListener('change', window.effects.change);
  };

  var closeForm = function () {
    photoEditForm.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadControl.value = '';
    document.removeEventListener('keydown', onEscCloseForm);
    hashtagInput.removeEventListener('keydown', window.util.stayOpenOnEsc);
    commentsInput.removeEventListener('keydown', window.util.stayOpenOnEsc);
    editFormCloseButton.removeEventListener('click', onCloseClick);
    window.effects.list.removeEventListener('change', window.effects.change);
  };

  var onCloseClick = function () {
    closeForm();
  };

  var onEscCloseForm = function (evt) {
    window.util.onEscPress(evt, closeForm);
  };

  // Photo uploading
  uploadControl.addEventListener('change', function () {
    openForm();
  });

  var createPopup = function (templateId, popupClass) {
    var template = document.querySelector(templateId).content;
    var popupNode = template.cloneNode(true);
    var popup = popupNode.querySelector(popupClass);
    popup.classList.add('hidden');
    main.insertBefore(popupNode, main.firstChild);
  };

  var popupOpen = function (popupClass, popupInner, popupButton, closeHandler, escKeyHandler) {
    var popup = document.querySelector(popupClass);
    popup.classList.remove('hidden');
    var button = document.querySelector(popupButton);
    button.addEventListener('click', closeHandler);
    document.addEventListener('keydown', escKeyHandler);
    onDocumentClosePopup(popupInner, closeHandler);
  };

  var popupClose = function (popupClass, popupButton, closeHandler, escKeyHandler) {
    var popup = document.querySelector(popupClass);
    var button = document.querySelector(popupButton);
    popup.classList.add('hidden');
    button.removeEventListener('click', closeHandler);
    document.removeEventListener('keydown', escKeyHandler);
  };

  var onButtonSuccessClose = function () {
    popupClose('.success', '.success__button');
  };

  var onButtonErrorClose = function () {
    popupClose('.error', '.error__button');
  };

  var onEscCloseSuccess = function (evt) {
    window.util.onEscPress(evt, onEscKeySuccessHandler);
  };

  var onEscCloseError = function (evt) {
    window.util.onEscPress(evt, onEscKeyErrorHandler);
  };

  var onEscKeySuccessHandler = function () {
    popupClose('.success', '.success__button', onButtonSuccessClose, onEscCloseSuccess);
  };

  var onEscKeyErrorHandler = function () {
    popupClose('.error', '.error__button', onButtonErrorClose, onEscCloseError);
  };

  var onDocumentClosePopup = function (elementClass, action) {
    var element = document.querySelector(elementClass);
    document.addEventListener('click', function (evt) {
      var isClickInsideElement = element.contains(evt.target);
      if (!isClickInsideElement) {
        action();
      }
    });
  };

  createPopup('#success', '.success');
  createPopup('#error', '.error');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.handleNewRequest('POST', URL, function () {
      form.reset();
      var photoPreview = document.querySelector('.img-upload__preview img');
      photoPreview.style.filter = 'none';
      window.effects.change();
      closeForm();
      popupOpen('.success', '.success__inner', '.success__button', onButtonSuccessClose, onEscCloseSuccess);
    }, function () {
      form.reset();
      var photoPreview = document.querySelector('.img-upload__preview img');
      photoPreview.style.filter = 'none';
      window.effects.change();
      closeForm();
      popupOpen('.error', '.error__inner', '.error__button', onButtonErrorClose, onEscCloseError);
    }, new FormData(form));
  });

  submitButton.addEventListener('click', function () {
    if (hashtagInput.value) {
      var hashtagsArray = hashtagInput.value.split(' ');
      for (var i = 0; i < hashtagsArray.length; i++) {
        hashtagValidation(hashtagsArray, hashtagsArray[i]);
      }
    }
  });

  var checkForDuplicates = function (array) {
    var valuesSoFar = [];
    for (var j = 0; j < array.length; ++j) {
      var value = array[j].toLowerCase(); // hashtag should be case insensitive
      if (valuesSoFar.indexOf(value) !== -1) {
        return true;
      }
      valuesSoFar.push(value);
    }
    return false;
  };

  // Hashtags validtion
  var hashtagValidation = function (hashtags, hashtag) {
    var firstHashRegexp = /^#/;
    var alphanumRegexp = /^#[a-zA-Za-zA-Z0-9]+$/;
    if (hashtags.length > HASHTAGS_MAX) {
      window.util.showNotification('Максимальное количество хештегов - 5', hashtagInput);
    } else if (hashtag[0] === '#' && hashtag.length === 1) {
      window.util.showNotification('Хэштэг не может состоять только из cимвола "#"', hashtagInput);
    } else if (checkForDuplicates(hashtags)) {
      window.util.showNotification('В поле присутствуют одинаковые хэштеги', hashtagInput);
    } else if (firstHashRegexp.test(hashtag) === false) {
      window.util.showNotification('Хештег должен начинаться с символа "#"', hashtagInput);
    } else if (hashtag.length > 20) {
      window.util.showNotification('Длина хештега не должна превышать 20 символов', hashtagInput);
    } else if (alphanumRegexp.test(hashtag) === false) {
      window.util.showNotification('Хештеги могут содержать только буквы и цифры', hashtagInput);
    } else {
      window.util.showNotification('', hashtagInput);
      hashtagInput.style.outline = 'none';
    }
  };
})();
