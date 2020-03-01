'use strict';

(function () {
  var mapFilters = window.util.map.querySelector('.map__filters-container');

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
        default: return 'no type found';
      }
    };

    var getFeatures = function () {
      var featureDomList = cardElementFeatures.querySelectorAll('.popup__feature');
      for (var n = 0; n < featureDomList.length; n++) {
        var featureDataItem = cardItem.offer.features[n];
        featureDomList[n].style.display = 'none';
        if (featureDataItem === 'wifi') {
          featureDomList[n].style.display = 'inline-block';
        } else if (featureDataItem === 'dishwasher') {
          featureDomList[n].style.display = 'inline-block';
        } else if (featureDataItem === 'parking') {
          featureDomList[n].style.display = 'inline-block';
        } else if (featureDataItem === 'washer') {
          featureDomList[n].style.display = 'inline-block';
        } else if (featureDataItem === 'elevator') {
          featureDomList[n].style.display = 'inline-block';
        } else if (featureDataItem === 'conditioner') {
          featureDomList[n].style.display = 'inline-block';
        }
      }
    };

    var renderCardImg = function (photoList) {
      var cardDomPhoto = cardElementPhotos.querySelector('.popup__photo');
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

  var addCardsToDom = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(renderCardData(cards[i]));
    }
    window.util.map.insertBefore(fragment, mapFilters);
  };

  window.card = {
    addCardsToDom: addCardsToDom
  };

})();
