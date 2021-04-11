'use strict';

(function() {
    // Создание фото для галереи
    var picture = document.querySelector('#picture').content.querySelector('.picture__link');
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    var renderPicture = function (ad) {
        var pictureItem = picture.cloneNode(true);
        pictureItem.querySelector('img').src = ad.url;
        pictureItem.querySelector('.picture__stat--likes').textContent = ad.likes;
        pictureItem.querySelector('.picture__stat--comments').textContent = ad.comments.length;
        pictureItem.addEventListener('click', function () {
            window.preview.getBigPicture(ad);
            window.preview.getBigPictureComments(ad);
        });
        return pictureItem;
    };

    // Добавление фото в DocumenFragment
    for (var i = 0; i < window.data.photos.length; i++) {
        fragment.appendChild(renderPicture(window.data.photos[i]));
    };

    // Добавление фото в разметку
    picturesContainer.appendChild(fragment);

}) ()
