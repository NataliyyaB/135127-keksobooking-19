'use strict';

(function () {
  var renderCardData = function (cardItem) {
    var cardPopupTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardPopupTemplate.cloneNode(true);
    var cardElementAvatar = cardElement.querySelector('.popup__avatar');
    var cardElementTitle = cardElement.querySelector('.popup__title');
    var cardElementAddress = cardElement.querySelector('.popup__text--address');
    var cardElementPrice = cardElement.querySelector('.popup__text--price');
    var cardElementType = cardElement.querySelector('.popup__type');
    var cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardElementTime = cardElement.querySelector('.popup__text--time');
    var cardElementFeatures = cardElement.querySelector('.popup__features');
    var cardElementDescription = cardElement.querySelector('.popup__description');
    var cardElementPhotos = cardElement.querySelector('.popup__photos');

    var advertTypeMap = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var getFeatures = function () {
      var featureDomList = cardElementFeatures.querySelectorAll('.popup__feature');

      featureDomList.forEach(function (featureDomItem) {
        var currentFeature = featureDomItem.classList[1].split('--')[1];
        if (!cardItem.offer.features.includes(currentFeature)) {
          featureDomItem.style.display = 'none';
        }
      });
    };

    var renderCardImg = function (photoList) {
      var cardDomPhoto = cardElementPhotos.querySelector('.popup__photo');
      if (photoList.length === 0) {
        cardDomPhoto.style.display = 'none';
      }
      for (var i = 0; i < photoList.length; i++) {
        if (i === 0) {
          cardDomPhoto.src = photoList[0];
        } else {
          var newImg = cardDomPhoto.cloneNode(true);
          newImg.src = photoList[i];
          cardElementPhotos.appendChild(newImg);
        }
      }
    };

    cardElementAvatar.src = cardItem.author.avatar;
    cardElementTitle.textContent = cardItem.offer.title;
    cardElementAddress.textContent = cardItem.offer.address;
    cardElementPrice.textContent = cardItem.offer.price + ' ₽/ночь';
    cardElementType.textContent = advertTypeMap[cardItem.offer.type];
    cardElementCapacity.textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + ' гостей';
    cardElementTime.textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
    getFeatures();
    cardElementDescription.textContent = cardItem.offer.description;
    renderCardImg(cardItem.offer.photos);

    return cardElement;
  };

  var addCardsToDom = function (cardItem) {
    var mapFilter = window.util.map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var item = fragment.appendChild(renderCardData(cardItem));
    window.util.map.insertBefore(fragment, mapFilter);

    var closeBtn = item.querySelector('.popup__close');
    closeBtn.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', buttonEscHandler);

    return item;
  };

  var openCard = function (evt) {
    evt.preventDefault();
    var target = evt.currentTarget;
    var targetId = target.id;

    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');

    currentPins.forEach(function (currentPin) {
      if (currentPin.classList.contains('map__pin--active')) {
        currentPin.classList.remove('map__pin--active');
      }
    });

    target.classList.add('map__pin--active');

    var card = window.util.map.querySelector('.map__card');
    if (card) {
      card.remove();
      card = null;
      card = addCardsToDom(window.loadResult[targetId]);
    } else {
      card = addCardsToDom(window.loadResult[targetId]);
    }
  };

  var pinClickHandler = function (evt) {
    if (evt.button === window.util.UserEvents.MOUSE_LEFT_BUTTON) {
      openCard(evt);
    }
  };

  var pinEnterHandler = function (evt) {
    if (evt.key === window.util.UserEvents.KEYBOARD_ENTER) {
      openCard(evt);
    }
  };

  var remove = function () {
    var currentActivePin = window.util.mapPinsContainer.querySelector('.map__pin--active');
    if (currentActivePin) {
      currentActivePin.classList.remove('map__pin--active');
    }

    var openedCard = window.util.map.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
    }
    document.removeEventListener('keydown', buttonEscHandler);
  };

  var buttonClickHandler = function (evt) {
    if (evt.button === window.util.UserEvents.MOUSE_LEFT_BUTTON) {
      remove();
    }
  };

  var buttonEscHandler = function (evt) {
    if (evt.key === window.util.UserEvents.KEYBOARD_ESCAPE) {
      remove();
    }
  };

  var show = function (marks) {
    marks.forEach(function (mark) {
      if (!mark.classList.contains('map__pin--main')) {
        mark.addEventListener('click', pinClickHandler);
        mark.addEventListener('keydown', pinEnterHandler);
      }
    });
  };


  window.card = {
    show: show,
    remove: remove,
    pinEnterHandler: pinEnterHandler
  };

})();
