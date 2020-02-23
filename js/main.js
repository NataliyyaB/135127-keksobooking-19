'use strict';

var MAP_MIN_X = 100;
var MAP_MAX_Y = 630;
var MAP_MIN_Y = 130;
var ROOMS_NUM_MAX = 5;
var ROOMS_NUM_MIN = 1;
var GUESTS_NUM_MAX = 10;
var GUESTS_NUM_MIN = 1;
var PRICE_MAX = 8000;
var PRICE_MIN = 3000;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURE_OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapСoordinates = document.querySelector('.map');
var mapMaxX = mapСoordinates.offsetWidth - MAP_MIN_X;
var similarListPin = document.querySelector('.map__pins');


var getRandomRange = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateRandomArray = function (predefinedArray) {
  var randomNum = Math.ceil(Math.random() * predefinedArray.length);
  return predefinedArray.slice(0, randomNum);
};

var getRandomArrayElement = function (predefinedArray) {
  var randomItem = getRandomRange(predefinedArray.length, 0);
  return predefinedArray[randomItem];
};

var getPins = function () {
  var pins = [];
  var ADVERT_NUM_MAX = 8;

  for (var i = 0; i < ADVERT_NUM_MAX; i++) {
    var pin = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'title ' + (i + 1),
        address: '',
        price: getRandomRange(PRICE_MAX, PRICE_MIN),
        type: getRandomArrayElement(OFFER_TYPES),
        rooms: getRandomRange(ROOMS_NUM_MAX, ROOMS_NUM_MIN),
        guests: getRandomRange(GUESTS_NUM_MAX, GUESTS_NUM_MIN),
        checkin: getRandomArrayElement(OFFER_CHECKINS),
        checkout: getRandomArrayElement(OFFER_CHECKOUTS),
        features: generateRandomArray(FEATURE_OPTIONS),
        description: 'Room description ' + (i + 1),
        photos: generateRandomArray(OFFER_PHOTOS)
      },
      location: {
        x: getRandomRange(mapMaxX, MAP_MIN_X),
        y: getRandomRange(MAP_MAX_Y, MAP_MIN_Y)
      }
    };
    pin.offer.address = pin.location.x + ',' + pin.location.y;
    pins.push(pin);
  }
  return pins;
};

var renderPin = function (pinItem) {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = pinItem.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = pinItem.location.y - PIN_HEIGHT + 'px';
  pinElementImg.src = pinItem.author.avatar;
  pinElementImg.alt = pinItem.offer.title;

  return pinElement;
};

var addPinsToDom = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(renderPin(elements[i]));
  }
  similarListPin.appendChild(fragment);
};


var pins = getPins();


// task3-3
var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters-container');

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

  var getType = function () {
    var typeName = cardItem.offer.type;
    switch (typeName) {
      case 'flat': typeName = 'Квартира';
        break;
      case 'bungalo': typeName = 'Бунгало';
        break;
      case 'house': typeName = 'Дом';
        break;
      case 'palace': typeName = 'Дворец';
        break;
    }
    return typeName;
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
    var cardDomPhotos = cardElementPhotos.querySelectorAll('.popup__photo');
    if (cardDomPhotos.length >= 1) {
      cardDomPhotos[0].src = photoList[0];
      for (var m = 1; m < photoList.length; m++) {
        var newImg = document.createElement('img');
        newImg.src = photoList[m];
        newImg.classList.add('popup__photo');
        newImg.width = 45;
        newImg.height = 40;
        newImg.alt = cardItem.offer.title;
        cardElementPhotos.appendChild(newImg);
      }
    }
  };

  cardElementAvatar.src = cardItem.author.avatar;
  cardElementTitle.textContent = cardItem.offer.title;
  cardElementAddress.textContent = cardItem.offer.address;
  cardElementPrice.textContent = cardItem.offer.price + ' ₽/ночь';
  cardElementType.textContent = getType();
  cardElementCapacity.textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + ' гостей';
  cardElementTime.textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
  getFeatures();
  cardElementDescription.textContent = cardItem.offer.description;
  renderCardImg(cardItem.offer.photos);

  return cardElement;
};

var addCardsToDom = function (cards) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCardData(cards[0]));
  map.insertBefore(fragment, mapFilters);
};


var formsContainer = document.querySelector('.ad-form');
var formElements = formsContainer.querySelectorAll('.ad-form__element');
var filterContainer = document.querySelector('.map__filters');
var filterElements = filterContainer.children;
var addressForm = formsContainer.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var mainPinImg = mainPin.querySelector('img');
var adRooms = formsContainer.querySelector('#room_number');
var adCapacity = formsContainer.querySelector('#capacity');
var mainPinWidth = mainPinImg.offsetWidth;
var mainPinHeight = mainPinImg.offsetHeight;
var mainPinPointer = window.getComputedStyle(mainPin, ':after').getPropertyValue('border-top-width');


// define main pin pointer height to use it for calculation Y location of the main pin
var splitString = function (stringToSplit, separator) {
  var splitResult = stringToSplit.split(separator);
  var result = +splitResult[0];
  return result;
};


var makeFormsDisabled = function (formsList) {
  for (var i = 0; i < formsList.length; i++) {
    formsList[i].setAttribute('disabled', '');
    formsList[i].style.cursor = 'default';
  }
};

var makeFormsActive = function (formsList) {
  for (var i = 0; i < formsList.length; i++) {
    formsList[i].removeAttribute('disabled');
    formsList[i].removeAttribute('style');
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
};

var makeMapActive = function () {
  activateMap();
  addPinsToDom(pins);
  formsContainer.classList.remove('ad-form--disabled');
  makeFormsActive(formElements);
  makeFormsActive(filterElements);
  mainPin.removeEventListener('keydown', mapEnterHandler);
  getMainPinAddress(true);
  addCardsToDom(pins);
};

var mapEnterHandler = function (evt) {
  if (evt.key === 'Enter') {
    makeMapActive();
  }
};

var getMainPinAddress = function (isActive) {
  var pinLeftPosition = mainPin.offsetLeft;
  var pinTopPosition = mainPin.offsetTop;
  addressForm.value = (pinLeftPosition + mainPinWidth / 2) + ', ' + (pinTopPosition + mainPinHeight / 2);

  if (isActive) {
    var mainPinPointerHeight = splitString(mainPinPointer, 'px');
    addressForm.value = (pinLeftPosition + mainPinWidth / 2) + ', ' + (pinTopPosition + mainPinHeight / 2 + mainPinPointerHeight);
  }
};

var checkSelectValidity = function () {
  var roomsOption = adRooms.value;
  var capacityOption = adCapacity.value;

  if (roomsOption === '1' && (capacityOption === '2' || capacityOption === '3' || capacityOption === '0')) {
    adCapacity.setCustomValidity('not for 1 room');
  } else if (roomsOption === '2' && (capacityOption === '3' || capacityOption === '0')) {
    adCapacity.setCustomValidity('not for 2 rooms');
  } else if (roomsOption === '3' && capacityOption === '0') {
    adCapacity.setCustomValidity('not for 3 rooms');
  } else if (roomsOption === '100' && (capacityOption === '1' || capacityOption === '2' || capacityOption === '3')) {
    adCapacity.setCustomValidity('not for 100 rooms');
  } else {
    adCapacity.setCustomValidity('');
  }
};

makeFormsDisabled(formElements);
makeFormsDisabled(filterElements);

getMainPinAddress();

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makeMapActive();
  }
});

mainPin.addEventListener('keydown', mapEnterHandler);


adRooms.addEventListener('change', function () {
  checkSelectValidity();
});

adCapacity.addEventListener('change', function () {
  checkSelectValidity();
});
