'use strict';

(function () {
  var hashtagInput = window.form.photoEditForm.querySelector('.text__hashtags');

  window.hashtags = {
    checkForDuplicates: function (array) {
      var valuesSoFar = [];
      for (var j = 0; j < array.length; ++j) {
        var value = array[j].toLowerCase(); // hashtag should be case insensitive
        if (valuesSoFar.indexOf(value) !== -1) {
          return true;
        }
        valuesSoFar.push(value);
      }
      return false;
    },

    hashtagValidation: function (hashtags, hashtag) {
      var firstHashRegexp = /^#/;
      var alphanumRegexp = /^#[a-zA-Za-zA-Z0-9]+$/;
      if (hashtags.length > 5) {
        window.util.showNotification('Максимальное количество хештегов - 5', hashtagInput);
      } else if (hashtag[0] === '#' && hashtag.length === 1) {
        window.util.showNotification('Хэштэг не может состоять только из cимвола "#"', hashtagInput);
      } else if (window.hashtags.checkForDuplicates(hashtags)) {
        window.util.showNotification('В поле присутствуют одинаковые хэштеги', hashtagInput);
      } else if (firstHashRegexp.test(hashtag) === false) {
        window.util.showNotification('Хештег должен начинаться с символа "#"', hashtagInput);
      } else if (hashtag.length > 20) {
        window.util.showNotification('Длина хештега не должна превышать 20 символов', hashtagInput);
      } else if (alphanumRegexp.test(hashtag) === false) {
        window.util.showNotification('Хештеги могут содержать только буквы и цифры', hashtagInput);
      } else {
        window.util.showNotification('', hashtagInput);
      }
    }
  };

})();
