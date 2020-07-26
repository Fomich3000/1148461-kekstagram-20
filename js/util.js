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
      whereToShow.style.borderColor = 'tomato';
      whereToShow.setCustomValidity(notificationText);
      whereToShow.reportValidity();
    },

    getRandomInRange: function (min, max) {
      var randomValue = Math.floor(Math.random() * (max - min) + min);
      return randomValue;
    },
    getRandomFromArray: function (array) {
      var randomValue = array[window.util.getRandomInRange(0, array.length)];
      return randomValue;
    }
  };
})();
