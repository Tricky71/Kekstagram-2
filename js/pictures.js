var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.',
    'Как можно было поймать такой неудачный момент?!'
    ];
var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
    ];
var picture = document.querySelector('#picture').content.querySelector('.picture__link');
var picturesContainer = document.querySelector('.pictures');
var TOTAL_OBJECTS = 25;
var photoList = [];
var adIndex = 0;
var bigPicture = document.querySelector('.big-picture');
var fragment = document.createDocumentFragment();
var socialComments = bigPicture.querySelector('.social__comments');
var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
var socialLoad = bigPicture.querySelector('.social__loadmore');

// Получение случайного числа в заданном диапазоне
var getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Получение случайного элемента из массива (элеменеты не повторяются)
var getRandomElement = function (array, key) {
    var randomElementIndex = getRandomNumber(0, array.length - 1);
    var randomElement = array[randomElementIndex];
    if (key) {
        array.splice(randomElementIndex, 1);
    };
    return randomElement;
};

// Создание массива произвольной или заданной длинны из массива (элементы не повторяются)
var getRandomArray = function (array, length) {
    var copiedArray = array.slice(0, array.length);
    var randomArray = [];
    var adLength = copiedArray.length;
    if (length) {
    var randomArrayLength = getRandomNumber(1, length)
    } else {
        randomArrayLength = getRandomNumber(1, copiedArray.length)
    };
    for (var i = 0; i < randomArrayLength; i++) {
        var randomArrayElement = getRandomElement(copiedArray, true);
        randomArray.push(randomArrayElement);
    };
    return randomArray;
};

// Подбор адреса изображения
var getPhotoUrl = function () {
    var path = 'photos/';
    adIndex++;
    return path + adIndex + '.jpg';
};

// Создание обьекта
var getPhotoItem = function () {
    var photoItem = {
        'url': getPhotoUrl(),
        'likes': getRandomNumber(15, 200),
        'comments': getRandomArray(comments, 3),
        'description': getRandomElement(descriptions)
    };
    return photoItem;
};

// Создание списка обьектов
var getPhotoList = function () {
    for (var i = 0; i < TOTAL_OBJECTS; i++) {
        var item = getPhotoItem();
        photoList.push(item);
    };
    return photoList;
};

var photos = getPhotoList();

// Создание фото для галереи
var renderPicture = function (ad) {
    var pictureItem = picture.cloneNode(true);
    pictureItem.querySelector('img').src = ad.url;
    pictureItem.querySelector('.picture__stat--likes').textContent = ad.likes;
    pictureItem.querySelector('.picture__stat--comments').textContent = ad.comments.length;
    return pictureItem;
};

// Добавление фото в DocumenFragment
for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
};

// Добавление фото в разметку
picturesContainer.appendChild(fragment);

bigPicture.classList.remove('hidden');

// Оформление preview фото
var getBigPicture = function () {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[0].url;
    bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
    bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
    bigPicture.querySelector('.social__caption').textContent = photos[0].description
};

getBigPicture();

// Добавление комментариев к preview
var getBigPictureComments = function (ad) {
    socialComments.innerHTML = '';
    for (var i = 0; i < ad.comments.length; i++) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment', 'social__comment--text');
    var commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
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

getBigPictureComments(photos[0]);
socialCommentsCount.classList.add('visually-hidden');
socialLoad.classList.add('visually-hidden');

console.log(socialComments);
console.log(photos);
