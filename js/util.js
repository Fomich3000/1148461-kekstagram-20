'use strict';

(function () {
  var ESC_KEY = 'Escape';

  window.util = {
    escEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    }
  };
})();
