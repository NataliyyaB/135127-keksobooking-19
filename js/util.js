'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var formsContainer = document.querySelector('.ad-form');
  var adRooms = formsContainer.querySelector('#room_number');
  var adCapacity = formsContainer.querySelector('#capacity');

  window.util = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    map: map,
    mapPinsContainer: mapPinsContainer,
    mainPin: mainPin,
    formsContainer: formsContainer,
    adRooms: adRooms,
    adCapacity: adCapacity
  };
})();

