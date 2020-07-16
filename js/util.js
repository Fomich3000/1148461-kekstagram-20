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

    showNotification: function (notificationText, whereToShow) {
      whereToShow.setCustomValidity(notificationText);
      whereToShow.reportValidity();
    }
  };
})();
