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
var PHOTO_NUM_MAX = 5;
var PHOTO_NUM_MIN = 1;
var FEATURE_NUM_MAX = 6;
var FEATURE_NUM_MIN = 1;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ADVERT_NUM_MAX = 8;

var mapСoordinates = document.querySelector('.map');
var mapMaxX = mapСoordinates.offsetWidth - MAP_MIN_X;

var getRandomRange = function (max, min) {
  var randomRange = Math.floor(Math.random() * (max - min) + min);
  return randomRange;
};

var getRandomArray = function (adArray) {
  var randomArray = Math.floor(Math.random() * adArray.length);
  return randomArray;
};

var AVATARS = [];
var OFFERTITLES = [];
var OFFERTYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFERCHECKINS = ['12:00', '13:00', '14:00'];
var OFFERCHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATUREOPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFERFEATURES = [];
var OFFERDESCRIPTIONS = [];
var OFFERPHOTOS = [];

var getPins = function () {
  var pins = [];

  for (var i = 0; i < ADVERT_NUM_MAX; i++) {
    AVATARS[i] = 'img/avatars/user0' + (i + 1) + '.png';
    OFFERTITLES[i] = 'title ' + (i + 1);
    OFFERDESCRIPTIONS[i] = 'Room description ' + (i + 1);
  }
  // var authorRandom = getRandomArray(AVATARS);
  // AVATARS.splice(authorRandom, 1);

  for (i = 0; i < ADVERT_NUM_MAX; i++) {

    var randomPhotoNum = getRandomRange(PHOTO_NUM_MAX, PHOTO_NUM_MIN);
    for (var j = 0; j <= randomPhotoNum; j++) {
      OFFERPHOTOS[j] = 'http://o0.github.io/assets/images/tokyo/hotel' + (j + 1) + '.jpg';
    }

    var randomFeature = getRandomArray(FEATUREOPTIONS);
    for (j = 0; j < randomFeature; j++) {
      OFFERFEATURES[j] = FEATUREOPTIONS[j];
    }

    var pin = {
      author: {
        avatar: AVATARS[getRandomArray(AVATARS)],
      },
      offer: {
        title: OFFERTITLES[getRandomArray(OFFERTITLES)],
        address: '',
        price: getRandomRange(PRICE_MAX, PRICE_MIN),
        type: OFFERTYPES[getRandomArray(OFFERTYPES)],
        rooms: getRandomRange(ROOMS_NUM_MAX, ROOMS_NUM_MIN),
        guests: getRandomRange(GUESTS_NUM_MAX, GUESTS_NUM_MIN),
        checkin: OFFERCHECKINS[getRandomArray(OFFERCHECKINS)],
        checkout: OFFERCHECKOUTS[getRandomArray(OFFERCHECKOUTS)],
        features: OFFERFEATURES,
        description: OFFERDESCRIPTIONS[getRandomArray(OFFERDESCRIPTIONS)],
        photos: OFFERPHOTOS
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

console.log(getPins());
// создание DOM-элементов, соответствующих меткам на карте и вставка элементов в блок .map__pins
var similarListPin = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pinItem) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pinItem.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = pinItem.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pinItem.author.avatar;
  pinElement.querySelector('img').alt = pinItem.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ADVERT_NUM_MAX; i++) {
  fragment.appendChild(renderPin(getPins()[i]));
}
similarListPin.appendChild(fragment);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
