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
  var randomNum = getRandomRange(predefinedArray.length, 1);
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
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(elements[i]));
  }
  similarListPin.appendChild(fragment);
};

var makeMapActive = function () {
  var userDialog = document.querySelector('.map');
  userDialog.classList.remove('map--faded');
};


var pins = getPins();

addPinsToDom(pins);

makeMapActive();
