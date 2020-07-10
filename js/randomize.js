'use strict';

(function () {

  window.randomize = {
    getRandomInRange: function (min, max) {
      var randomValue = Math.floor(Math.random() * (max - min) + min);
      return randomValue;
    },
    getRandomFromArray: function (array) {
      var randomValue = array[window.randomize.getRandomInRange(0, array.length)];
      return randomValue;
    }
  };
})();
