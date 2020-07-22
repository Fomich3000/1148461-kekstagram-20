'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var bigPictureSection = document.querySelector('.big-picture');
  var bigPictureImg = bigPictureSection.querySelector('.big-picture__img');
  var bigPictureLikesNumber = bigPictureSection.querySelector('.likes-count');
  var bigPictureCommentsNumber = bigPictureSection.querySelector('.comments-count');
  var bigPictureComments = bigPictureSection.querySelector('.social__comments');
  var bigPictureCaption = bigPictureSection.querySelector('.social__caption');
  /* var bigPictureMoreLoader = bigPictureSection.querySelector('.comments-loader');
  var bigPictureCommentCounter = bigPictureSection.querySelector('.social__comment-count'); */
  var bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');
  var commentsFragment = document.createDocumentFragment();
  var commentInput = bigPictureSection.querySelector('.social__footer-text');

  window.preview = {
    commentsFragment: commentsFragment,
    bigPictureComments: bigPictureComments,
    commentInput: commentInput,

    createBigPhotoElement: function (photo) {
      bigPictureImg.querySelector('img').src = photo.url;
      bigPictureLikesNumber.textContent = photo.likes;
      bigPictureCommentsNumber.textContent = photo.comments.length;
      bigPictureCaption.textContent = photo.description;
    },

    openBigPhoto: function (photo) {
      bigPictureSection.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      window.preview.createBigPhotoElement(photo);
      window.preview.createCommentsElement(photo);
      window.preview.bigPictureComments.innerHTML = '';
      window.preview.bigPictureComments.appendChild(window.preview.commentsFragment);
      bigPictureClose.addEventListener('click', window.preview.closeBigPhotoEvent);
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
        var commentElement = bigPictureComments.querySelector('.social__comment');
        var newCommentElement = commentElement.cloneNode(true);
        newCommentElement.querySelector('img').src = photo.comments[j].avatar;
        newCommentElement.querySelector('img').alt = photo.comments[j].authorNames;
        newCommentElement.querySelector('.social__text').textContent = photo.comments[j].message;
        commentsFragment.appendChild(newCommentElement);
      }
    },

    closeBigPhoto: function () {
      bigPictureSection.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      document.removeEventListener('keydown', window.preview.onEscClose);
      bigPictureClose.removeEventListener('click', window.preview.closeBigPhotoEvent);
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
