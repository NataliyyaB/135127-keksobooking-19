'use strict';

(function () {
  var MAX_PINS_NUMBER = 5;
  var similarListPin = document.querySelector('.map__pins');
  var mainPinImg = window.util.mainPin.querySelector('img');
  var mainPinWidth = mainPinImg.offsetWidth;
  var mainPinHeight = mainPinImg.offsetHeight;
  var mainPinPointer = window.getComputedStyle(window.util.mainPin, ':after').getPropertyValue('border-top-width');

  var splitString = function (stringToSplit, separator) {
    var splitResult = stringToSplit.split(separator);
    var result = +splitResult[0];
    return result;
  };
  var mainPinPointerHeight = splitString(mainPinPointer, 'px');
  var mainPinFullHeight = mainPinPointerHeight + mainPinHeight;


  var renderPin = function (pinItem) {
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = pinItem.location.x - (window.util.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = pinItem.location.y - window.util.PIN_HEIGHT + 'px';
    pinElementImg.src = pinItem.author.avatar;
    pinElementImg.alt = pinItem.offer.title;

    return pinElement;
  };

  var getMainItemAddress = function (isActive) {
    window.util.addressForm.value = (window.util.InitialMainPinCoords.x + mainPinWidth / 2) + ', ' + (window.util.InitialMainPinCoords.y + mainPinHeight / 2);

    if (isActive) {
      window.util.addressForm.value = (window.util.mainPin.offsetLeft + mainPinWidth / 2) + ', ' + (window.util.mainPin.offsetTop + mainPinFullHeight);
    }
  };

  var renderLimitedItems = function (data) {
    var arrayLength = data.length > MAX_PINS_NUMBER ? MAX_PINS_NUMBER : data.length;
    var fragment = document.createDocumentFragment();
    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');

    if (currentPins.length > 1 || data.length === 0) {

      currentPins.forEach(function (currentPin) {
        if (!currentPin.classList.contains('map__pin--main')) {
          currentPin.remove();
        }
      });
    }
    for (var j = 0; j < arrayLength; j++) {
      var newPin = renderPin(data[j]);
      newPin.id = data[j].uniqueId;
      fragment.appendChild(newPin);
    }
    similarListPin.appendChild(fragment);
  };


  var relocateMainItem = function (coords) {
    window.util.mainPin.style.top = coords.y + 'px';
    window.util.mainPin.style.left = coords.x + 'px';
  };


  var mainItemDraggableHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var finalCoords = {
        x: window.util.mainPin.offsetLeft - shift.x,
        y: window.util.mainPin.offsetTop - shift.y
      };

      if (finalCoords.x + mainPinWidth / 2 < window.util.CoordsList.LEFT || finalCoords.x + mainPinWidth / 2 > window.util.CoordsList.RIGHT) {
        finalCoords.x = window.util.mainPin.offsetLeft;
      }
      if (finalCoords.y + mainPinFullHeight < window.util.CoordsList.TOP || finalCoords.y + mainPinFullHeight > window.util.CoordsList.BOTTOM) {
        finalCoords.y = window.util.mainPin.offsetTop;
      }

      relocateMainItem(finalCoords);
      getMainItemAddress(true);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      getMainItemAddress(true);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.util.mainPin.addEventListener('mousedown', mainItemDraggableHandler);


  window.pin = {
    renderLimitedItems: renderLimitedItems,
    getMainItemAddress: getMainItemAddress,
    mainItemDraggableHandler: mainItemDraggableHandler,
    relocateMainItem: relocateMainItem
  };

})();
