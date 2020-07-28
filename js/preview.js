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
  var loadMoreComments = bigPhotoSection.querySelector('.comments-loader');

  var createBigPhoto = function (photo) {
    bigPhotoImg.querySelector('img').src = photo.url;
    bigPhotoLikesNumber.textContent = photo.likes;
    bigPhotoCommentsNumber.textContent = photo.comments.length;
    bigPhotoCaption.textContent = photo.description;
  };

  var showNthComments = function (photoComments) {

    var commentsArray = photoComments;
    var counter = COMMENTS_TO_SHOW;

    createComments(commentsArray.slice(0, COMMENTS_TO_SHOW));

    if (commentsArray.length <= COMMENTS_TO_SHOW || commentsArray.length <= counter) {
      loadMoreComments.classList.add('hidden');
      loadMoreComments.removeEventListener('click', onClickLoadMoreComments);
    } else {
      loadMoreComments.classList.remove('hidden');
    }

    bigPhotoCommentsCounter.textContent = Math.min(counter, commentsArray.length) + ' из ' + commentsArray.length + ' комментариев';

    var onClickLoadMoreComments = function () {

      var commentsToShow = commentsArray.slice(counter, counter + COMMENTS_TO_SHOW);
      createComments(commentsToShow);

      counter += COMMENTS_TO_SHOW;

      bigPhotoCommentsCounter.textContent = Math.min(counter, commentsArray.length) + ' из ' + commentsArray.length + ' комментариев';

      if (commentsArray.length <= COMMENTS_TO_SHOW || commentsArray.length <= counter) {
        loadMoreComments.classList.add('hidden');
        loadMoreComments.removeEventListener('click', onClickLoadMoreComments);
      }
    };
    loadMoreComments.addEventListener('click', onClickLoadMoreComments);
  };

  var commentMock = bigPhotoComments.querySelector('.social__comment');

  var createComments = function (photoComments) {
    var fragment = document.createDocumentFragment();
    photoComments.forEach(function (comment) {
      var commentTemplate = commentMock.cloneNode(true);
      var template = commentTemplate;
      template.querySelector('img').src = comment.avatar;
      template.querySelector('img').alt = comment.authorNames;
      template.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(template);
    });
    bigPhotoComments.appendChild(fragment);
  };

  var openBigPhoto = function (photo) {
    bigPhotoComments.innerHTML = '';
    bigPhotoSection.classList.remove('hidden');
    body.classList.add('modal-open');
    var commentsArray = photo.comments;

    createBigPhoto(photo);
    showNthComments(commentsArray);

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
