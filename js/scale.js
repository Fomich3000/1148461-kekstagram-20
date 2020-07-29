'use strict';

(function () {
  var DEFAULT_SCALE = 100;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var SCALE_STEP = 25;

  var photoPreview = document.querySelector('.img-upload__preview img');
  var scaleNumber = document.querySelector('.scale__control--value');
  var scaleMore = document.querySelector('.scale__control--bigger');
  var scaleLess = document.querySelector('.scale__control--smaller');

  var setScale = function (scaleValue) {
    scaleNumber.value = scaleValue + '%';
    photoPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  window.scale = {
    set: setScale,
    default: DEFAULT_SCALE
  };

  var onChangeScaleButtonClick = function (boundary, checkForMinMax, calculateScale) {
    var scale = parseInt(scaleNumber.value, 10);
    if (checkForMinMax(scale, boundary)) {
      scale = calculateScale(scale, SCALE_STEP);
      setScale(scale);
    } else {
      scaleNumber.value = boundary + '%';
    }
  };

  setScale(DEFAULT_SCALE);

  scaleMore.addEventListener('click', function () {
    onChangeScaleButtonClick(MAX_SCALE, function (a, b) {
      if (a < b) {
        return true;
      } else {
        return false;
      }
    }, function (a, b) {
      var result = a += b;
      return result;
    });
  });

  scaleLess.addEventListener('click', function () {
    onChangeScaleButtonClick(MIN_SCALE, function (a, b) {
      if (a > b) {
        return true;
      } else {
        return false;
      }
    }, function (a, b) {
      var result = a -= b;
      return result;
    });
  });
})();

