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

    var getType = function (typeName) {
      switch (typeName) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
        default: return 'Тип не определен';
      }
    };

    var getFeatures = function () {
      var featureDomList = cardElementFeatures.querySelectorAll('.popup__feature');
      for (var n = 0; n < featureDomList.length; n++) {
        var currentFeature = featureDomList[n].classList[1].split('--')[1];
        if (!cardItem.offer.features.includes(currentFeature)) {
          featureDomList[n].style.display = 'none';
        }
      }
    };

    var renderCardImg = function (photoList) {
      var cardDomPhoto = cardElementPhotos.querySelector('.popup__photo');
      if (photoList.length === 0) {
        cardDomPhoto.style.display = 'none';
      }
      for (var m = 0; m < photoList.length; m++) {
        if (m === 0) {
          cardDomPhoto.src = photoList[0];
        } else {
          var newImg = cardDomPhoto.cloneNode(true);
          newImg.src = photoList[m];
          cardElementPhotos.appendChild(newImg);
        }
      }
    };

    cardElementAvatar.src = cardItem.author.avatar;
    cardElementTitle.textContent = cardItem.offer.title;
    cardElementAddress.textContent = cardItem.offer.address;
    cardElementPrice.textContent = cardItem.offer.price + ' ₽/ночь';
    cardElementType.textContent = getType(cardItem.offer.type);
    cardElementCapacity.textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + ' гостей';
    cardElementTime.textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
    getFeatures();
    cardElementDescription.textContent = cardItem.offer.description;
    renderCardImg(cardItem.offer.photos);

    return cardElement;
  };

  var addCardsToDom = function (cardItem) {
    var mapFilters = window.util.map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var item = fragment.appendChild(renderCardData(cardItem));
    window.util.map.insertBefore(fragment, mapFilters);

    var closeBtn = item.querySelector('.popup__close');
    closeBtn.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', buttonEscHandler);

    return item;
  };

  var openCard = function (evt) {
    evt.preventDefault();
    var target = evt.currentTarget;
    var targetNumber = target.id;

    var card = window.util.map.querySelector('.map__card');
    if (card) {
      card.remove();
      card = null;
      card = addCardsToDom(window.loadResult[targetNumber]);
    } else {
      card = addCardsToDom(window.loadResult[targetNumber]);
    }
  };

  var pinClickHandler = function (evt) {
    if (evt.button === 0) {
      openCard(evt);
    }
  };

  var pinEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      openCard(evt);
    }
  };

  var removeCard = function () {
    var openedCard = window.util.map.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
    }
    document.removeEventListener('keydown', buttonEscHandler);
  };

  var buttonClickHandler = function (evt) {
    if (evt.button === 0) {
      removeCard();
    }
  };

  var buttonEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
    }
  };

  var showPinCard = function (marks) {
    for (var i = 0; i < marks.length; i++) {
      marks[i].addEventListener('click', pinClickHandler);
      marks[i].addEventListener('keydown', pinEnterHandler);

      if (marks[i].className === 'map__pin map__pin--main') {
        marks[i].removeEventListener('click', pinClickHandler);
        marks[i].removeEventListener('keydown', pinEnterHandler);
      }
    }

  };


  window.card = {
    showPinCard: showPinCard,
    removeCard: removeCard,
    pinEnterHandler: pinEnterHandler
  };

})();
