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
      var randomNumbers = [];
      for (var i = 0; randomNumbers.length < max; i++) {
        var isEqual = false;
        var randomNumber = window.util.getRandomInRange(min, max);
        for (var j = 0; j < randomNumbers.length; j++) {
          if (randomNumber === randomNumbers[j]) {
            isEqual = true;
            break;
          }
        }
        if (!isEqual) {
          randomNumbers[randomNumbers.length] = randomNumber;
        }
      }
      return randomNumbers;
    },
  };
})();
