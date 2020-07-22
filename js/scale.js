'use strict';

(function () {

  var scaleNumber = document.querySelector('.scale__control--value');
  var scaleMore = document.querySelector('.scale__control--bigger');
  var scaleLess = document.querySelector('.scale__control--smaller');

  var DEFAULT_SCALE = 100;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var SCALE_STEP = 25;

  var setScale = function (scaleValue) {
    scaleNumber.value = scaleValue + '%';
    window.form.element.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  setScale(DEFAULT_SCALE);

  scaleMore.addEventListener('click', function () {
    var scale = parseInt(scaleNumber.value, 10);
    if (scale < MAX_SCALE) {
      scale += SCALE_STEP;
      setScale(scale);
    } else {
      scaleNumber.value = MAX_SCALE + '%';
    }
  });

  scaleLess.addEventListener('click', function () {
    var scale = parseInt(scaleNumber.value, 10);
    if (scale > MIN_SCALE) {
      scale -= SCALE_STEP;
      setScale(scale);
    } else {
      scaleNumber.value = MIN_SCALE + '%';
    }
  });
})();
