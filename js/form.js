'use strict';

(function() {
    // / ----------------------Окно загрузки изображения пользователя
    var uploadInput = document.querySelector('#upload-file');
    var uploadBtn = document.querySelector('.img-upload__label');
    var uploadOverlay = document.querySelector('.img-upload__overlay');
    var popupCloseBtn = uploadOverlay.querySelector('#upload-cancel');
    var hashtagsInput = document.querySelector('.text__hashtags');
    var commentInput = document.querySelector('.text__description');
    var ENTER_KEYCODE = 13;
    var ESC_KEYCODE = 27;

    // Открытие и закрытие окна загрузки изображения пользователя
    var openPopup = function(popup) {
            popup.classList.remove('hidden');
        };

    var closePopup = function(popup) {
        popup.classList.add('hidden');
        uploadInput.value = '';
    }; 

    var onEscFormClose = function (evt) {
        if (evt.keyCode === ESC_KEYCODE && hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
                closePopup(uploadOverlay);
            };
    };

    // Добавление обработчиков на поле ввода изображения пользователя
    uploadInput.addEventListener('change', function() {
        openPopup(uploadOverlay);
        popupCloseBtn.addEventListener('click', function(){
            closePopup(uploadOverlay);
        });
        popupCloseBtn.addEventListener('keydown', function(evt){
            if (evt.keyCode === ENTER_KEYCODE) {
                closePopup(uploadOverlay);
            };
        });

        document.addEventListener('keydown', onEscFormClose);
    });

    // Масштабирование загруженного изображения

    var resizePlusBtn = document.querySelector('.resize__control--plus');
    var resizeMinusBtn = document.querySelector('.resize__control--minus');
    var resizeValueInput = document.querySelector('.resize__control--value');
    var RESIZE_PARAM = 25;
    var RESIZE_MAX = 100;
    var RESIZE_MIN = 25;
    var resizeValue = 100;
    var previewImage = document.querySelector('.img-upload__preview');
    resizeValueInput.setAttribute('value', resizeValue + '%');

    var getResizeValueMinus = function () {
        while (resizeValue > RESIZE_MIN) {
        resizeValueInput.setAttribute('value', (resizeValue -= RESIZE_PARAM) + '%');
        return resizeValueInput;
        };
    };

    var getResizeValuePlus = function () {
        while (resizeValue < RESIZE_MAX) {
        resizeValueInput.setAttribute('value', (resizeValue += RESIZE_PARAM) + '%');
        return resizeValueInput;
        };
    };

    var getScaleTransform = function () {
        previewImage.style = 'transform: scale(' + resizeValue / 100 + ')';
    };

    resizeMinusBtn.addEventListener('click', function () {
        getResizeValueMinus();
        getScaleTransform();
    });

    resizeMinusBtn.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
            getResizeValueMinus();
            getScaleTransform();
        };
    });

    resizePlusBtn.addEventListener('click', function () {
        getResizeValuePlus();
        getScaleTransform();
    });

    resizePlusBtn.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
            getResizeValuePlus();
            getScaleTransform();
        };
    });

    // -----------------------Обработка загруженного изображения 

    var effectsInputs = document.querySelectorAll('.effects__radio');
    var previewImageElement = previewImage.querySelector('img');
    var effectsList = document.querySelector('.effects__list');
    var effectScale = document.querySelector('.img-upload__scale');
    var effectPin = document.querySelector('.scale__pin');
    var effectLevel = document.querySelector('.scale__level');
    var PIN_END = 1170;
    var PIN_START = 720;
    var effectPinStart = getComputedStyle(effectPin).left;

    // Переключение эффектов обработки изображения
    var openEffect = function (evt) {
        var target = evt.target;
        if (target.classList.contains('effects__radio')) {
            previewImageElement.className = '';
            previewImageElement.removeAttribute('style', 'filter');
            previewImageElement.classList.toggle('effects__preview--' + target.value);
            if (target.id !== 'effect-none') {
                effectScale.classList.remove('hidden');
                } else {
                    effectScale.classList.add('hidden');
            };
            effectPin.style.left = effectPinStart;
        }
    };

    // Добавление обработчиков на иконки эффектов
    effectsList.addEventListener ('change', openEffect);
    effectsList.addEventListener ('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
            evt.preventDefault();
        };
    });

    // Настройка интенсивности эффекта

    var MIN_VALUE = 0;
    var MAX_VALUE;
    var filterName;
    var scaleSize = PIN_END - PIN_START;
    var pinCurrent = effectPin.offsetLeft;

    var getEffectValue = function(max, min) {
        var effectValue = max / (scaleSize / effectPin.offsetLeft);
        if (effectValue < min) {
            effectValue = min;
        };
        return effectValue;
    };



    // Настройки перетаскивания слайдера глубины эффекта
    effectPin.addEventListener('mousedown', function(evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX,
            }    
            
            startCoords = {
                x: moveEvt.clientX
            };
            
            if (startCoords.x <= PIN_END && startCoords.x > PIN_START) {
            effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
            };

            if (previewImageElement.classList.contains ('effects__preview--chrome')) {
                MAX_VALUE = 1;
                filterName = 'grayscale';
                previewImageElement.style.filter = filterName + '(' + getEffectValue(MAX_VALUE, MIN_VALUE) + ')';

            };

            if (previewImageElement.classList.contains ('effects__preview--sepia')) {
                MAX_VALUE = 1;
                filterName = 'sepia';
                previewImageElement.style.filter = filterName + '(' + getEffectValue(MAX_VALUE, MIN_VALUE) + ')';

            };

            if (previewImageElement.classList.contains ('effects__preview--marvin')) {
                MAX_VALUE = 100;
                filterName = 'invert';
                previewImageElement.style.filter = filterName + '(' + getEffectValue(MAX_VALUE, MIN_VALUE) + '%)';

            };

            if (previewImageElement.classList.contains ('effects__preview--phobos')) {
                MAX_VALUE = 3;
                filterName = 'blur';
                previewImageElement.style.filter = filterName + '(' + getEffectValue(MAX_VALUE, MIN_VALUE) + 'px)';

            };

            if (previewImageElement.classList.contains ('effects__preview--heat')) {
                MAX_VALUE = 3;
                MIN_VALUE = 1;
                filterName = 'brightness';
                previewImageElement.style.filter = filterName + '(' + getEffectValue(MAX_VALUE, MIN_VALUE) + ')';

            };
        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    })


    // ---------------------------Валидация полей ввода хэш-тегов и комментария

    var uploadForm = document.querySelector('.img-upload__form'); 
    var HASHTAG_MIN_VALUE = 2;
    var HASTAG_INDEX = -1;
    var HASHTAG_MAX = 5;
    var HASHTAG_MAX_LENGTH = 20;
    var COMMENT_MAX_LENGTH = 140;

    // Валидация поля ввода хэш-тегов
    var validateHashtags = function () {
        var hashtagsList = hashtagsInput.value.toLowerCase().split(' ');
        var textError = '';
        if (hashtagsList.length > HASHTAG_MAX) {
            textError = 'Нельзя указать больше пяти хэш-тегов';
        };

        for (var i = 0; i < hashtagsList.length; i++) {
            if (hashtagsList[i][0] !== '#') {
                textError = 'Текст хэш-тега должен начинаться с символа #';
            };
            if (hashtagsList[i][0] === '#' && hashtagsList[i].length < HASHTAG_MIN_VALUE) {
                textError = 'Хэш-тег не может состоять только из #';
            };
            var indexHashtag = hashtagsList.indexOf(hashtagsList[i], [i + 1]);
            if (indexHashtag !== HASTAG_INDEX) {
                textError = 'Хэш-тег не может быть использован дважды';
            };
            if (hashtagsList[i].length > HASHTAG_MAX_LENGTH) {
                textError = 'Максимальная длина хэш-тега 20 символов';
            };
        };
        hashtagsInput.setCustomValidity(textError);
    };

    hashtagsInput.addEventListener('change', function () {
        validateHashtags();
    });

    // Валидация поля комментария
    var validateComment = function() {
        var textError = '';
        if (commentInput.value.length > COMMENT_MAX_LENGTH) {
            textError = 'Длина комментария не может составлять больше 140 символов';
        };
        commentInput.setCustomValidity(textError);
        commentInput.addEventListener('change', function() {
        validateComment();
        });
    };

    // Добавление обработчика на кнопку отправки формы
    uploadForm.addEventListener('invalid', function(evt) {
        evt.target.style.outline = '2px solid red';
    }, true);

}) ()
