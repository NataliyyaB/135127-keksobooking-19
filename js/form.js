'use strict';

(function () {
  var IMG_DEFAULT = 'img/muffin-grey.svg';
  var ROOM_DEFAULT_NUMBER = '1';
  var CAPACITY_DEFAULT_NUMBER = '1';
  var TYPE_DEFAULT = 'flat';
  var CHECKIN_CHECKOUT_DEFAULT = '12:00';
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var elements = window.util.formsContainer.querySelectorAll('.ad-form__element');
  var filterContainer = document.querySelector('.map__filters');
  var filterElements = filterContainer.children;
  var type = window.util.formsContainer.querySelector('#type');
  var price = window.util.formsContainer.querySelector('#price');
  var checkin = window.util.formsContainer.querySelector('#timein');
  var checkout = window.util.formsContainer.querySelector('#timeout');

  var makeDisabled = function (formsList) {
    for (var i = 0; i < formsList.length; i++) {
      formsList[i].setAttribute('disabled', '');
      formsList[i].style.cursor = 'default';
    }
  };

  var makeActive = function (formsList) {
    for (var j = 0; j < formsList.length; j++) {
      formsList[j].removeAttribute('disabled');
      formsList[j].removeAttribute('style');
    }
  };

  var checkRoomsValidity = function () {
    var roomsOption = window.util.adRoom.value;
    var capacityOption = window.util.adCapacity.value;

    var RoomsCapacity = {
      FOR_ONE: '1',
      FOR_TWO: '2',
      FOR_THREE: '3',
      NOT_FOR_GUESTS: '0'
    };
    var ROOMS_BIG_NUMBER = '100';

    if (roomsOption === RoomsCapacity.FOR_ONE && !(capacityOption === RoomsCapacity.FOR_ONE)) {
      window.util.adCapacity.setCustomValidity('Для 1 комнаты выберите не более 1 гостя');
    } else if (roomsOption === RoomsCapacity.FOR_TWO && (capacityOption > RoomsCapacity.FOR_TWO || capacityOption === RoomsCapacity.NOT_FOR_GUESTS)) {
      window.util.adCapacity.setCustomValidity('Для 2х комнат выберите не более 2х гостей');
    } else if (roomsOption === RoomsCapacity.FOR_THREE && capacityOption === RoomsCapacity.NOT_FOR_GUESTS) {
      window.util.adCapacity.setCustomValidity('Для 3х комнат выберите не более 3х гостей');
    } else if (roomsOption === ROOMS_BIG_NUMBER && !(capacityOption === RoomsCapacity.NOT_FOR_GUESTS)) {
      window.util.adCapacity.setCustomValidity('100 комнат не предназначено для гостей');
    } else {
      window.util.adCapacity.setCustomValidity('');
    }
  };

  var roomsValidityHandler = function () {
    checkRoomsValidity();
  };

  var setPrice = function () {
    var formTypeMap = {
      'flat': {
        min: MIN_PRICE_FLAT,
        placeholder: MIN_PRICE_FLAT
      },
      'bungalo': {
        min: MIN_PRICE_BUNGALO,
        placeholder: MIN_PRICE_BUNGALO
      },
      'house': {
        min: MIN_PRICE_HOUSE,
        placeholder: MIN_PRICE_HOUSE
      },
      'palace': {
        min: MIN_PRICE_PALACE,
        placeholder: MIN_PRICE_PALACE
      }
    };

    price.min = formTypeMap[type.value].min;
    price.placeholder = formTypeMap[type.value].placeholder;
  };

  var setPriceHandler = function () {
    setPrice();
  };

  var setCheckinCkeckout = function (selectedOption) {
    var timeResult;
    if (selectedOption.id === 'timein') {
      timeResult = checkout;
    } else {
      timeResult = checkin;
    }

    timeResult.value = selectedOption.value;
  };

  var setCheckinsHandler = function (evt) {
    var target = evt.target;
    setCheckinCkeckout(target);
  };

  var clear = function () {
    window.util.adTitle.value = '';
    window.util.adDescription.value = '';
    price.value = '';
    checkin.value = CHECKIN_CHECKOUT_DEFAULT;
    checkout.value = CHECKIN_CHECKOUT_DEFAULT;
    type.value = TYPE_DEFAULT;
    window.util.formPhoto.style = '';
    window.util.avatar.src = IMG_DEFAULT;
    setPrice();
    window.util.adRoom.value = ROOM_DEFAULT_NUMBER;
    window.util.adCapacity.value = CAPACITY_DEFAULT_NUMBER;
    checkRoomsValidity();
    window.filter.resetSelectors();

    window.util.adFeatures.forEach(function (adFeaturesItem) {
      if (adFeaturesItem.checked) {
        adFeaturesItem.checked = false;
      }
    });
  };

  var deactivateElements = function () {
    window.pin.relocateMainItem(window.util.InitialMainPinCoords);
    window.pin.getMainItemAddress();
    window.util.map.classList.add('map--faded');
    window.util.formsContainer.classList.add('ad-form--disabled');
    window.form.makeDisabled(window.form.elements);
    window.form.makeDisabled(window.form.filterElements);
    window.util.formsResetBtn.removeEventListener('click', window.form.resetBtnHandler);
    window.util.formsContainer.removeEventListener('change', window.file.photoUploadHandler);
    window.util.adRoom.removeEventListener('change', window.form.formValidityHandler);
    window.util.adCapacity.removeEventListener('change', window.form.formValidityHandler);
    window.form.checkin.removeEventListener('change', window.form.checkSelectionHandler);
    window.form.checkout.removeEventListener('change', window.form.checkSelectionHandler);

    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    if (currentPins.length > 1) {

      currentPins.forEach(function (currentPin) {
        if (!currentPin.classList.contains('map__pin--main')) {
          currentPin.remove();
        }
      });
    }

    var openedCard = window.util.map.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
    }

  };

  var resetBtnHandler = function (evt) {
    evt.preventDefault();
    deactivateElements();
    clear();
    window.util.mainPin.addEventListener('mousedown', window.map.mainPinMouseHandler);
    window.util.mainPin.addEventListener('keydown', window.map.mainPinEnterHandler);
  };


  makeDisabled(elements);
  makeDisabled(filterElements);
  window.pin.getMainItemAddress();


  window.form = {
    elements: elements,
    filterElements: filterElements,
    makeActive: makeActive,
    makeDisabled: makeDisabled,
    checkRoomsValidity: checkRoomsValidity,
    roomsValidityHandler: roomsValidityHandler,
    type: type,
    price: price,
    setPrice: setPrice,
    setPriceHandler: setPriceHandler,
    checkin: checkin,
    checkout: checkout,
    setCheckinsHandler: setCheckinsHandler,
    clear: clear,
    deactivateElements: deactivateElements,
    resetBtnHandler: resetBtnHandler
  };

})();
