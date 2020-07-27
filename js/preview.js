'use strict';

(function () {
  var body = document.querySelector('body');
  var bigPhotoSection = document.querySelector('.big-picture');
  var bigPhotoImg = bigPhotoSection.querySelector('.big-picture__img');
  var bigPhotoLikesNumber = bigPhotoSection.querySelector('.likes-count');
  var bigPhotoCommentsNumber = bigPhotoSection.querySelector('.comments-count');
  var bigPhotoComments = bigPhotoSection.querySelector('.social__comments');
  var bigPhotoCaption = bigPhotoSection.querySelector('.social__caption');
  var bigPhotoClose = bigPhotoSection.querySelector('.big-picture__cancel');
  var commentInput = bigPhotoSection.querySelector('.social__footer-text');

  var createComments = function (photo) {
    var commentsMarkup = document.createDocumentFragment();
    for (var j = 0; j < photo.comments.length; j++) {
      var comment = bigPhotoComments.querySelector('.social__comment');
      var newComment = comment.cloneNode(true);
      newComment.querySelector('img').src = photo.comments[j].avatar;
      newComment.querySelector('img').alt = photo.comments[j].authorNames;
      newComment.querySelector('.social__text').textContent = photo.comments[j].message;
      commentsMarkup.appendChild(newComment);
    }
    return commentsMarkup;
  };

  var createBigPhoto = function (photo) {
    bigPhotoImg.querySelector('img').src = photo.url;
    bigPhotoLikesNumber.textContent = photo.likes;
    bigPhotoCommentsNumber.textContent = photo.comments.length;
    bigPhotoCaption.textContent = photo.description;
  };

  var openBigPhoto = function (photo) {
    bigPhotoSection.classList.remove('hidden');
    body.classList.add('modal-open');
    createBigPhoto(photo);
    var comments = createComments(photo);
    bigPhotoComments.innerHTML = '';
    bigPhotoComments.appendChild(comments);
    bigPhotoClose.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscClose);
    commentInput.addEventListener('keydown', window.util.stayOpenOnEsc);
  };

  var closeBigPhoto = function () {
    bigPhotoSection.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscClose);
    bigPhotoClose.removeEventListener('click', onCloseClick);
    commentInput.removeEventListener('keydown', window.util.stayOpenOnEsc);
  };

  var onEscClose = function (evt) {
    window.util.onEscPress(evt, closeBigPhoto);
  };

  var onCloseClick = function () {
    closeBigPhoto();
  };

  window.bigPhotoHandler = function (element, photo) { // В целях замыкания в цикле
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      openBigPhoto(photo);
    });
  };
})();
