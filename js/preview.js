'use strict';

(function () {
  var COMMENTS_TO_SHOW = 5;

  var body = document.querySelector('body');
  var bigPhotoSection = document.querySelector('.big-picture');
  var bigPhotoImg = bigPhotoSection.querySelector('.big-picture__img');
  var bigPhotoLikesNumber = bigPhotoSection.querySelector('.likes-count');
  var bigPhotoCommentsNumber = bigPhotoSection.querySelector('.comments-count');
  var bigPhotoComments = bigPhotoSection.querySelector('.social__comments');
  var bigPhotoCaption = bigPhotoSection.querySelector('.social__caption');
  var bigPhotoClose = bigPhotoSection.querySelector('.big-picture__cancel');
  var commentInput = bigPhotoSection.querySelector('.social__footer-text');

  var bigPhotoCommentsCounter = bigPhotoSection.querySelector('.social__comment-count');
  var loadMoreCommentsButton = bigPhotoSection.querySelector('.comments-loader');

  var createBigPhoto = function (photo) {
    bigPhotoImg.querySelector('img').src = photo.url;
    bigPhotoLikesNumber.textContent = photo.likes;
    bigPhotoCommentsNumber.textContent = photo.comments.length;
    bigPhotoCaption.textContent = photo.description;
  };

  var loadMoreComments = function (photoComments) {

    var comments = photoComments;
    var counter = COMMENTS_TO_SHOW;

    var hideLoadMoreCommentsButton = function () {
      loadMoreCommentsButton.classList.add('hidden');
      loadMoreCommentsButton.removeEventListener('click', onClickLoadMoreComments);
    };

    createComments(comments.slice(0, COMMENTS_TO_SHOW));

    if (comments.length <= COMMENTS_TO_SHOW || comments.length <= counter) {
      hideLoadMoreCommentsButton();
    } else {
      loadMoreCommentsButton.classList.remove('hidden');
    }

    bigPhotoCommentsCounter.textContent = Math.min(counter, comments.length) + ' из ' + comments.length + ' комментариев';

    var onClickLoadMoreComments = function () {

      var commentsToShow = comments.slice(counter, counter + COMMENTS_TO_SHOW);
      createComments(commentsToShow);

      counter += COMMENTS_TO_SHOW;

      bigPhotoCommentsCounter.textContent = Math.min(counter, comments.length) + ' из ' + comments.length + ' комментариев';

      if (comments.length <= COMMENTS_TO_SHOW || comments.length <= counter) {
        hideLoadMoreCommentsButton();
      }
    };
    loadMoreCommentsButton.addEventListener('click', onClickLoadMoreComments);
  };

  var commentMock = bigPhotoComments.querySelector('.social__comment');

  var createComments = function (photoComments) {
    var fragment = document.createDocumentFragment();
    photoComments.forEach(function (comment) {
      var commentTemplate = commentMock.cloneNode(true);
      var template = commentTemplate;
      var commentAvatar = template.querySelector('img');
      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.authorNames;
      template.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(template);
    });
    bigPhotoComments.appendChild(fragment);
  };

  var openBigPhoto = function (photo) {
    bigPhotoComments.innerHTML = '';
    bigPhotoSection.classList.remove('hidden');
    body.classList.add('modal-open');
    var comments = photo.comments;

    createBigPhoto(photo);
    loadMoreComments(comments);

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

  window.addClickEventToPhoto = function (element, photo) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      openBigPhoto(photo);
    });
  };
})();
