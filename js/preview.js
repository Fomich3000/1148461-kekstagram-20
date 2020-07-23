'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var bigPhotoSection = document.querySelector('.big-picture');
  var bigPhotoImg = bigPhotoSection.querySelector('.big-picture__img');
  var bigPhotoLikesNumber = bigPhotoSection.querySelector('.likes-count');
  var bigPhotoCommentsNumber = bigPhotoSection.querySelector('.comments-count');
  var bigPhotoComments = bigPhotoSection.querySelector('.social__comments');
  var bigPhotoCaption = bigPhotoSection.querySelector('.social__caption');
  /* var bigPhotoMoreLoader = bigPhotoSection.querySelector('.comments-loader');
  var bigPhotoCommentCounter = bigPhotoSection.querySelector('.social__comment-count'); */
  var bigPhotoClose = bigPhotoSection.querySelector('.big-picture__cancel');
  var commentsFragment = document.createDocumentFragment();
  var commentInput = bigPhotoSection.querySelector('.social__footer-text');

  window.preview = {
    commentsFragment: commentsFragment,
    bigPhotoComments: bigPhotoComments,
    commentInput: commentInput,

    createBigPhotoElement: function (photo) {
      bigPhotoImg.querySelector('img').src = photo.url;
      bigPhotoLikesNumber.textContent = photo.likes;
      bigPhotoCommentsNumber.textContent = photo.comments.length;
      bigPhotoCaption.textContent = photo.description;
    },

    openBigPhoto: function (photo) {
      bigPhotoSection.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      window.preview.createBigPhotoElement(photo);
      window.preview.createCommentsElement(photo);
      window.preview.bigPhotoComments.innerHTML = '';
      window.preview.bigPhotoComments.appendChild(window.preview.commentsFragment);
      bigPhotoClose.addEventListener('click', window.preview.closeBigPhotoEvent);
      document.addEventListener('keydown', window.preview.onEscClose);
      window.preview.commentInput.addEventListener('keydown', window.util.stayOpenOnEsc);
    },

    bigPhotoHandler: function (element, photo) { // В целях замыкания в цикле
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.openBigPhoto(photo);
      });
    },

    createCommentsElement: function (photo) {
      for (var j = 0; j < photo.comments.length; j++) {
        var commentElement = bigPhotoComments.querySelector('.social__comment');
        var newCommentElement = commentElement.cloneNode(true);
        newCommentElement.querySelector('img').src = photo.comments[j].avatar;
        newCommentElement.querySelector('img').alt = photo.comments[j].authorNames;
        newCommentElement.querySelector('.social__text').textContent = photo.comments[j].message;
        commentsFragment.appendChild(newCommentElement);
      }
    },

    closeBigPhoto: function () {
      bigPhotoSection.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      document.removeEventListener('keydown', window.preview.onEscClose);
      bigPhotoClose.removeEventListener('click', window.preview.closeBigPhotoEvent);
      window.preview.commentInput.removeEventListener('keydown', window.util.stayOpenOnEsc);
    },

    onEscClose: function (evt) {
      window.util.escEvent(evt, window.preview.closeBigPhoto);
    },

    closeBigPhotoEvent: function () {
      window.preview.closeBigPhoto();
    } // Функция заведена в целях удаления события в дальнейшем;
  };
})();
