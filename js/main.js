'use strict';

var MAP_MAX_X = 1100;
var MAP_MIN_X = 100;
var MAP_MAX_Y = 630;
var MAP_MIN_Y = 130;
var ROOMS_NUM_MAX = 5;
var ROOMS_NUM_MIN = 1;
var GUESTS_NUM_MAX = 10;
var GUESTS_NUM_MIN = 1;
var PRICE_MAX = 8000;
var PRICE_MIN = 3000;
var DESCR_NUM_MAX = 8;
var DESCR_NUM_MIN = 1;
var PHOTO_NUM_MAX = 5;
var PHOTO_NUM_MIN = 1;
var FEATURE_NUM_MAX = 6;
var FEATURE_NUM_MIN = 1;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ADVERT_NUM_MAX = 8;

// генерация случайных данных
var authorAvatar = [];
var offerTitle = [];
var offerAddress = [];
var offerType = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerCheckout = ['12:00', '13:00', '14:00'];
var offerFeatures = [];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerDescription = [];
var offerPhotos = [];
var locationX = [];
var locationY = [];
var advertList = [];

for (var i = 0; i < ADVERT_NUM_MAX; i++) {
  var avaSrc = 'img/avatars/user' + 0 + (i + 1) + '.png';
  authorAvatar[i] = avaSrc;

  var titleValue = 'title' + ' ' + (i + 1);
  offerTitle[i] = titleValue;
}

for (i = DESCR_NUM_MIN; i <= DESCR_NUM_MAX; i++) {
  var descrValue = 'Room description' + ' ' + i;
  offerDescription[i] = descrValue;
}

for (i = MAP_MIN_X; i < MAP_MAX_X; i++) {
  locationX[i] = i;
}

for (i = MAP_MIN_Y; i < MAP_MAX_Y; i++) {
  locationY[i] = i;
}

function Advert(author, offer, location) {
  this.author = author;
  this.offer = offer;
  this.location = location;
}

function Author(avatar) {
  this.avatar = avatar;
}

function Offer(title, address, price, type, rooms, guests, checkin, checkout, features, desription, photos) {
  this.title = title;
  this.address = address;
  this.price = price;
  this.type = type;
  this.rooms = rooms;
  this.guests = guests;
  this.checkin = checkin;
  this.checkout = checkout;
  this.features = features;
  this.description = desription;
  this.photos = photos;
}

function AdvertLocation(x, y) {
  this.x = x;
  this.y = y;
}

for (var j = 0; j < ADVERT_NUM_MAX; j++) {
  var authorRandom = Math.floor(Math.random() * authorAvatar.length);
  var newAuthor = new Author(authorAvatar[authorRandom]);
  authorAvatar.splice(authorRandom, 1);

  var randomTitle = Math.floor(Math.random() * offerTitle.length);
  var randomPrice = Math.floor(Math.random() * (PRICE_MAX - PRICE_MIN) + PRICE_MIN);
  var randomType = Math.floor(Math.random() * offerType.length);
  var randomRooms = Math.floor(Math.random() * (ROOMS_NUM_MAX - ROOMS_NUM_MIN) + ROOMS_NUM_MIN);
  var randomGuests = Math.floor(Math.random() * (GUESTS_NUM_MAX - GUESTS_NUM_MIN) + GUESTS_NUM_MIN);
  var randomCheckin = Math.floor(Math.random() * offerCheckin.length);
  var randomCheckout = Math.floor(Math.random() * offerCheckout.length);

  var randomFeature = Math.floor(Math.random() * (FEATURE_NUM_MAX - FEATURE_NUM_MIN) + 1);
  for (i = 0; i < randomFeature; i++) {
    offerFeatures[i] = featuresList[i];
  }

  var randomDescription = Math.floor(Math.random() * offerDescription.length);

  var randomPhotoNum = Math.floor(Math.random() * (PHOTO_NUM_MAX - PHOTO_NUM_MIN) + 1);
  for (i = 0; i <= randomPhotoNum; i++) {
    offerPhotos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }

  var randomX = Math.floor(Math.random() * (MAP_MAX_X - MAP_MIN_X) + MAP_MIN_X);
  var randomY = Math.floor(Math.random() * (MAP_MAX_Y - MAP_MIN_Y) + MAP_MIN_Y);
  var newLocation = new AdvertLocation(locationX[randomX], locationY[randomY]);
  offerAddress[j] = locationX[randomX].toString() + ',' + locationY[randomY].toString();

  var newOffer = new Offer(offerTitle[randomTitle], offerAddress[j], randomPrice, offerType[randomType], randomRooms, randomGuests, offerCheckin[randomCheckin], offerCheckout[randomCheckout], offerFeatures, offerDescription[randomDescription], offerPhotos);

  advertList[j] = new Advert(newAuthor, newOffer, newLocation);
}

// создание DOM-элементов, соответствующих меткам на карте и вставка элементов в блок .map__pins
var similarListPin = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < ADVERT_NUM_MAX; i++) {
  fragment.appendChild(renderPin(advertList[i]));
}
similarListPin.appendChild(fragment);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
