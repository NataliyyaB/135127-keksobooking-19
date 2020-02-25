'use strict';

(function () {
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

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var formsContainer = document.querySelector('.ad-form');
  var adRooms = formsContainer.querySelector('#room_number');
  var adCapacity = formsContainer.querySelector('#capacity');

  window.util = {
    MAP_MIN_X: MAP_MIN_X,
    MAP_MAX_Y: MAP_MAX_Y,
    MAP_MIN_Y: MAP_MIN_Y,
    ROOMS_NUM_MAX: ROOMS_NUM_MAX,
    ROOMS_NUM_MIN: ROOMS_NUM_MIN,
    GUESTS_NUM_MAX: GUESTS_NUM_MAX,
    GUESTS_NUM_MIN: GUESTS_NUM_MIN,
    PRICE_MAX: PRICE_MAX,
    PRICE_MIN: PRICE_MIN,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    OFFER_TYPES: OFFER_TYPES,
    OFFER_CHECKINS: OFFER_CHECKINS,
    OFFER_CHECKOUTS: OFFER_CHECKOUTS,
    FEATURE_OPTIONS: FEATURE_OPTIONS,
    OFFER_PHOTOS: OFFER_PHOTOS,
    getRandomRange: getRandomRange,
    generateRandomArray: generateRandomArray,
    getRandomArrayElement: getRandomArrayElement,
    map: map,
    mainPin: mainPin,
    formsContainer: formsContainer,
    adRooms: adRooms,
    adCapacity: adCapacity
  };
})();

