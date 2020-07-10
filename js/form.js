'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var photoPreview = document.querySelector('.img-upload__preview img');
  var uploadInput = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var hashtagInput = photoEditForm.querySelector('.text__hashtags');
  var editFormCloseButton = document.querySelector('.img-upload__cancel');

  var commentsInput = photoEditForm.querySelector('.text__description');
  var scaleNumber = document.querySelector('.scale__control--value');

  var effectLevelValue = photoEditForm.querySelector('.effect-level__value');

  var effectsSettings = {
    'chrome': {
      type: 'grayscale',
      unit: '',
      calculateValue: function (value) {
        return value / 100;
      }
    },
    'sepia': {
      type: 'sepia',
      unit: '',
      calculateValue: function (value) {
        return value / 100;
      }
    },
    'marvin': {
      type: 'invert',
      unit: '%',
      calculateValue: function (value) {
        return value / 100;
      }
    },
    'phobos': {
      type: 'blur',
      unit: 'px',
      calculateValue: function (value) {
        return value * 3 / 100;
      }
    },
    'heat': {
      type: 'brightness',
      unit: '',
      calculateValue: function (value) {
        return value * 4 / 100;
      }
    }
  };

  window.form = {

    photoEditForm: photoEditForm,
    photoPreview: photoPreview,

    openPhotoEditForm: function () {
      bodyElement.classList.add('modal-open');
      photoEditForm.classList.remove('hidden');
      editFormCloseButton.addEventListener('click', window.form.closePhotoEditFormEvent);
      document.addEventListener('keydown', window.form.editFormOnEsc);
      hashtagInput.addEventListener('keydown', window.form.stayOpenWhenFocus);
      commentsInput.addEventListener('keydown', window.form.stayOpenWhenFocus);
    },

    closePhotoEditForm: function () {
      photoEditForm.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      uploadInput.value = '';
      document.removeEventListener('keydown', window.form.editFormOnEsc);
      hashtagInput.removeEventListener('keydown', window.form.stayOpenWhenFocus);
      commentsInput.removeEventListener('keydown', window.form.stayOpenWhenFocus);
      editFormCloseButton.removeEventListener('click', window.form.closePhotoEditFormEvent);
    },

    editFormOnEsc: function (evt) {
      window.util.escEvent(evt, window.form.closePhotoEditForm);
    },

    stayOpenWhenFocus: function (evt) {
      if (evt.key === 'Escape') {
        evt.stopPropagation();
      }
    },

    closePhotoEditFormEvent: function () {
      window.form.closePhotoEditForm();
    },

    setScale: function (scaleValue) {
      scaleNumber.value = scaleValue + '%';
      photoPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
    },

    setImageEffect: function (effect) {
      var currentEffectSettings = effectsSettings[effect];
      var filterString = '' + currentEffectSettings.type + '(' + currentEffectSettings.calculateValue(effectLevelValue.value) + ')' + currentEffectSettings.unit;
      photoPreview.style.filter = filterString;
    }
  };

})();
