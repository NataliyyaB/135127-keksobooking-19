'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_POSITION_X = 570;
  var PIN_POSITION_Y = 375;
  var MAP_MAX_Y = 630;
  var MAP_MIN_Y = 130;
  var MAP_MIN_X = 0;

  var mainContainer = document.querySelector('main');
  var map = document.querySelector('.map');
  var filterForm = map.querySelector('.map__filters');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var formsContainer = document.querySelector('.ad-form');
  var formPhoto = formsContainer.querySelector('.ad-form__photo');
  var avatar = formsContainer.querySelector('.ad-form-header__preview img');
  var checkinCheckoutForm = formsContainer.querySelector('.ad-form__element--time');
  var formsResetBtn = formsContainer.querySelector('.ad-form__reset');
  var addressForm = formsContainer.querySelector('#address');
  var adRoom = formsContainer.querySelector('#room_number');
  var adCapacity = formsContainer.querySelector('#capacity');
  var adTitle = formsContainer.querySelector('#title');
  var adDescription = formsContainer.querySelector('#description');
  var adFeatures = formsContainer.querySelectorAll('.feature__checkbox');
  var adFeatureLabels = formsContainer.querySelectorAll('.feature');

  var UserEvents = {
    MOUSE_LEFT_BUTTON: 0,
    KEYBOARD_ENTER: 'Enter',
    KEYBOARD_ESCAPE: 'Escape'
  };

  var InitialMainPinCoords = {
    x: PIN_POSITION_X,
    y: PIN_POSITION_Y
  };

  var CoordsList = {
    TOP: MAP_MIN_Y,
    RIGHT: map.offsetWidth,
    BOTTOM: MAP_MAX_Y,
    LEFT: MAP_MIN_X
  };

  window.util = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    UserEvents: UserEvents,
    InitialMainPinCoords: InitialMainPinCoords,
    mainContainer: mainContainer,
    map: map,
    filterForm: filterForm,
    mapPinsContainer: mapPinsContainer,
    mainPin: mainPin,
    formsContainer: formsContainer,
    formPhoto: formPhoto,
    avatar: avatar,
    checkinCheckoutForm: checkinCheckoutForm,
    formsResetBtn: formsResetBtn,
    addressForm: addressForm,
    adRoom: adRoom,
    adCapacity: adCapacity,
    adTitle: adTitle,
    adDescription: adDescription,
    adFeatures: adFeatures,
    adFeatureLabels: adFeatureLabels,
    CoordsList: CoordsList
  };
})();

