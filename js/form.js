'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var uploadInput = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var editFormCloseButton = document.querySelector('.img-upload__cancel');
  var hashtagInput = photoEditForm.querySelector('.text__hashtags');

  var commentsInput = photoEditForm.querySelector('.text__description');

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

  var hashtagValidation = function (hashtags, hashtag) {
    var firstHashRegexp = /^#/;
    var alphanumRegexp = /^#[a-zA-Za-zA-Z0-9]+$/;
    if (hashtags.length > 5) {
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
    }
  };

  hashtagInput.addEventListener('input', function () {
    var hashtagsArray = hashtagInput.value.split(' ');
    for (var i = 0; i < hashtagsArray.length; i++) {
      hashtagValidation(hashtagsArray, hashtagsArray[i]);
    }
  });

  window.form = {

    element: photoEditForm,

    openElement: function () {
      bodyElement.classList.add('modal-open');
      photoEditForm.classList.remove('hidden');
      editFormCloseButton.addEventListener('click', window.form.closeElementEvent);
      document.addEventListener('keydown', window.form.onEscClose);
      hashtagInput.addEventListener('keydown', window.form.stayOpenWhenFocus);
      commentsInput.addEventListener('keydown', window.form.stayOpenWhenFocus);
    },

    closeElement: function () {
      photoEditForm.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      uploadInput.value = '';
      document.removeEventListener('keydown', window.form.onEscClose);
      hashtagInput.removeEventListener('keydown', window.form.stayOpenWhenFocus);
      commentsInput.removeEventListener('keydown', window.form.stayOpenWhenFocus);
      editFormCloseButton.removeEventListener('click', window.form.closeElementEvent);
    },

    onEscClose: function (evt) {
      window.util.escEvent(evt, window.form.closeElement);
    },

    stayOpenWhenFocus: function (evt) {
      if (evt.key === 'Escape') {
        evt.stopPropagation();
      }
    },

    closeElementEvent: function () {
      window.form.closeElement();
    }
  };

})();
