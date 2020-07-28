'use strict';

(function () {
  var ESC_KEY = 'Escape';

  window.util = {
    onEscPress: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    stayOpenOnEsc: function (evt) {
      if (evt.key === ESC_KEY) {
        evt.stopPropagation();
      }
    },

    showNotification: function (notificationText, whereToShow) {
      whereToShow.style.outline = 'tomato solid 2px';
      whereToShow.setCustomValidity(notificationText);
      whereToShow.reportValidity();
    },

    getRandomInRange: function (min, max) {
      var randomValue = Math.floor(Math.random() * (max - min) + min);
      return randomValue;
    },

    getRandomNumbersArray: function (min, max) {
      var array = [];
      for (var i = 0; array.length < max; i++) {
        var isEqual = false;
        var randomNumber = window.util.getRandomInRange(min, max);
        for (var j = 0; j < array.length; j++) {
          if (randomNumber === array[j]) {
            isEqual = true;
            break;
          }
        }
        if (!isEqual) {
          array[array.length] = randomNumber;
        }
      }
      return array;
    },
  };
})();
