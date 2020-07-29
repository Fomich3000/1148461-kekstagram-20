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

  var onChangeScaleButtonClick = function (boundary, checkForMinMax, calculateScale) {
    var scale = parseInt(scaleNumber.value, 10);
    if (checkForMinMax(scale, boundary)) {
      scale = calculateScale(scale, SCALE_STEP);
      setScale(scale);
    } else {
      scaleNumber.value = boundary + '%';
    }
  };

  var onScaleMoreButtonClick = function () {
    onChangeScaleButtonClick(MAX_SCALE, function (a, b) {
      return a < b ? true : false;
    }, function (a, b) {
      return (a += b);
    });
  };

  var onScaleLessButtonClick = function () {
    onChangeScaleButtonClick(MIN_SCALE, function (a, b) {
      return a > b ? true : false;
    }, function (a, b) {
      return (a -= b);
    });
  };

  setScale(DEFAULT_SCALE);

  window.scale = {
    less: scaleLess,
    more: scaleMore,
    onMoreButtonClick: onScaleMoreButtonClick,
    onLessButtonClick: onScaleLessButtonClick,
    set: setScale,
    default: DEFAULT_SCALE
  };

})();
