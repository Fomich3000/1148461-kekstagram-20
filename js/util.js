'use strict';

(function () {
  var ESC_KEY = 'Escape';

  window.util = {
    escEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    stayOpenOnEsc: function (evt) {
      if (evt.key === ESC_KEY) {
        evt.stopPropagation();
      }
    },

    getRandomInRange: function (min, max) {
      var randomValue = Math.floor(Math.random() * (max - min) + min);
      return randomValue;
    },
    getRandomFromArray: function (array) {
      var randomValue = array[window.util.getRandomInRange(0, array.length)];
      return randomValue;
    },

    showNotification: function (notificationText, whereToShow) {
      whereToShow.setCustomValidity(notificationText);
      whereToShow.reportValidity();
    }
  };
})();
