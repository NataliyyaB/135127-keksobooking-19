'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_MAX_Y = 630;
  var MAP_MIN_Y = 130;
  var MAP_MIN_X = 0;

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var formsContainer = document.querySelector('.ad-form');
  var adRooms = formsContainer.querySelector('#room_number');
  var adCapacity = formsContainer.querySelector('#capacity');

  var coordsListMap = {
    top: MAP_MIN_Y,
    right: map.offsetWidth,
    bottom: MAP_MAX_Y,
    left: MAP_MIN_X
  };

  window.util = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAP_MAX_Y: MAP_MAX_Y,
    MAP_MIN_Y: MAP_MIN_Y,
    map: map,
    mapPinsContainer: mapPinsContainer,
    mainPin: mainPin,
    formsContainer: formsContainer,
    adRooms: adRooms,
    adCapacity: adCapacity,
    coordsListMap: coordsListMap
  };
})();

