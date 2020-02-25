'use strict';

(function () {
  var mapMaxX = window.util.map.offsetWidth - window.util.MAP_MIN_X;

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
          price: window.util.getRandomRange(window.util.PRICE_MAX, window.util.PRICE_MIN),
          type: window.util.getRandomArrayElement(window.util.OFFER_TYPES),
          rooms: window.util.getRandomRange(window.util.ROOMS_NUM_MAX, window.util.ROOMS_NUM_MIN),
          guests: window.util.getRandomRange(window.util.GUESTS_NUM_MAX, window.util.GUESTS_NUM_MIN),
          checkin: window.util.getRandomArrayElement(window.util.OFFER_CHECKINS),
          checkout: window.util.getRandomArrayElement(window.util.OFFER_CHECKOUTS),
          features: window.util.generateRandomArray(window.util.FEATURE_OPTIONS),
          description: 'Room description ' + (i + 1),
          photos: window.util.generateRandomArray(window.util.OFFER_PHOTOS)
        },
        location: {
          x: window.util.getRandomRange(mapMaxX, window.util.MAP_MIN_X),
          y: window.util.getRandomRange(window.util.MAP_MAX_Y, window.util.MAP_MIN_Y)
        }
      };
      pin.offer.address = pin.location.x + ',' + pin.location.y;
      pins.push(pin);
    }
    return pins;
  };

  // var renderPin = function (pinItem) {
  //   var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  //   var pinElement = similarPinTemplate.cloneNode(true);
  //   var pinElementImg = pinElement.querySelector('img');

  //   pinElement.style.left = pinItem.location.x - (window.util.PIN_WIDTH / 2) + 'px';
  //   pinElement.style.top = pinItem.location.y - window.util.PIN_HEIGHT + 'px';
  //   pinElementImg.src = pinItem.author.avatar;
  //   pinElementImg.alt = pinItem.offer.title;

  //   return pinElement;
  // };

  // var addPinsToDom = function (elements) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < elements.length; i++) {
  //     fragment.appendChild(renderPin(elements[i]));
  //   }
  //   similarListPin.appendChild(fragment);
  // };

  var pins = getPins();


  window.data = {
    pins: pins
  };

})();
