'use strict';

// Changing of photo effect

(function () {

  var DEFAULT_EFFECT_LEVEL = 100;
  var effectLevel = window.form.photoEditForm.querySelector('.effect-level');
  var effectLevelPin = window.form.photoEditForm.querySelector('.effect-level__pin');
  var effectLevelValue = window.form.photoEditForm.querySelector('.effect-level__value');
  var line = window.form.photoEditForm.querySelector('.effect-level__line');
  var depth = window.form.photoEditForm.querySelector('.effect-level__depth');

  window.effect = {

    pxToPercent: function (px) {
      var percentNumber = (px / (line.offsetWidth / 100));
      return percentNumber.toFixed(1);
    },

    changeEffect: function () {
      var checkedEffect = window.form.photoEditForm.querySelector('.effects__radio:checked');
      var effectValue = checkedEffect.value;
      if (effectValue === 'none') {
        window.form.photoPreview.style.filter = 'none';
      }
      effectLevel.classList.toggle('hidden', effectValue === 'none');
      effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
      depth.style.width = effectLevelPin.style.left;
      effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
      window.form.photoPreview.classList.add('effects__preview--' + effectValue);
      if (effectValue !== 'none') {
        window.form.setImageEffect(effectValue);
      }

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
          effectLevelPin.style.left = window.effect.pxToPercent(newX) + '%';
          depth.style.width = effectLevelPin.style.left;
        };

        var onMouseStop = function () {
          effectLevelValue.value = effectLevelPin.style.left.substring(0, effectLevelPin.style.left.length - 1);
          window.form.setImageEffect(effectValue);
          document.removeEventListener('mousemove', onMouseMove);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseStop);
      });
    }
  };
})();
