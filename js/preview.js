'use strict';

(function() {
    // Открытие и закрытие окна просмотра фото пользователей 
    var bigPicture = document.querySelector('.big-picture');
    var socialComments = bigPicture.querySelector('.social__comments');
    var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
    var socialLoad = bigPicture.querySelector('.social__loadmore');
    var userCommentInput = document.querySelector('.social__footer-text');
    var closePreviewBtn = document.querySelector('.big-picture__cancel');
    var fragment = document.createDocumentFragment();

    var openPreview = function () {
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
    };

    var closePreview = function () {
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', onEscPreviewClose);
    };

    var onEscPreviewClose = function(evt) {
        if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userCommentInput) {
            closePreview();
        };
    };
        

    // Оформление предпросмотра фото
    var getBigPicture = function (array) {
        bigPicture.querySelector('.big-picture__img').querySelector('img').src = array.url;
        bigPicture.querySelector('.likes-count').textContent = array.likes;
        bigPicture.querySelector('.comments-count').textContent = array.comments.length;
        bigPicture.querySelector('.social__caption').textContent = array.description;
        socialCommentsCount.classList.add('visually-hidden');
        socialLoad.classList.add('visually-hidden');
        openPreview();
        closePreviewBtn.addEventListener('click', function() {
                closePreview();
            });
        document.addEventListener('keydown', onEscPreviewClose);     
    };

    // Добавление комментариев к предпросмотру фото пользователей
    var getBigPictureComments = function (ad) {
        socialComments.innerHTML = '';
        for (var i = 0; i < ad.comments.length; i++) {
        var comment = document.createElement('li');
        comment.classList.add('social__comment', 'social__comment--text');
        var commentAvatar = document.createElement('img');
        commentAvatar.classList.add('social__picture');
        commentAvatar.src = 'img/avatar-' + window.data.getRandomNumber(1, 6) + '.svg';
        commentAvatar.alt = 'Аватар комментатора фотографии';
        commentAvatar.width = '35';
        commentAvatar.height = '35';
        var commentText = document.createElement('p');
        commentText.classList.add('social__text');
        commentText.textContent = ad.comments[i];
        comment.appendChild(commentAvatar);
        comment.appendChild(commentText);
        fragment.appendChild(comment);
        socialComments.appendChild(fragment);
        }

    };
    
    window.preview = {
        getBigPicture: getBigPicture,
        getBigPictureComments: getBigPictureComments
    };

}) ()