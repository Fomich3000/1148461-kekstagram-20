'use strict';

(function () {

  var photoPreview = document.querySelector('.img-upload__preview img');
  var effects = document.querySelector('.img-upload__effects');
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
        return value;
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

  var DEFAULT_EFFECT_LEVEL = 100;
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var line = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');

  var pxToPercent = function (px) {
    var percentNumber = (px / (line.offsetWidth / 100));
    return percentNumber.toFixed(1);
  };

  var setFilterValue = function (effect) {
    var currentEffectSettings = effectsSettings[effect];
    var filterString = '' + currentEffectSettings.type + '(' + currentEffectSettings.calculateValue(effectLevelValue.value) + currentEffectSettings.unit + ')';
    photoPreview.style.filter = filterString;
  };

  var changeEffect = function () {
    var checkedEffect = window.form.element.querySelector('.effects__radio:checked');
    var effectValue = checkedEffect.value;
    if (effectValue === 'none') {
      photoPreview.style.filter = 'none';
    }
    effectLevel.classList.toggle('hidden', effectValue === 'none');
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
    depth.style.width = effectLevelPin.style.left;
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
    photoPreview.classList.add('effects__preview--' + effectValue);
    if (effectValue !== 'none') {
      setFilterValue(effectValue);
    }

    // Slider events
    effectLevelPin.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();
      var shiftX = downEvt.clientX - effectLevelPin.getBoundingClientRect().left;

      var onMouseMove = function (moveEvt) {
        var newX = moveEvt.clientX - shiftX - line.getBoundingClientRect().left;
        if (newX < 0) {
          newX = 0;
        }
        var lineRightSide = line.offsetWidth;
        if (newX > lineRightSide) {
          newX = lineRightSide;
        }
        effectLevelPin.style.left = pxToPercent(newX) + '%';
        depth.style.width = effectLevelPin.style.left;
      };

      var onMouseStop = function () {
        effectLevelValue.value = parseInt(effectLevelPin.style.left, 10);
        setFilterValue(effectValue);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseStop);
    });
  };

  effectLevel.classList.add('hidden');

  effects.addEventListener('change', function () {
    changeEffect();
  });

})();
