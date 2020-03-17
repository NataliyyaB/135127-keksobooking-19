'use strict';

(function () {
  var similarListPin = document.querySelector('.map__pins');
  var mainPinImg = window.util.mainPin.querySelector('img');
  var mainPinWidth = mainPinImg.offsetWidth;
  var mainPinHeight = mainPinImg.offsetHeight;
  var mainPinPointer = window.getComputedStyle(window.util.mainPin, ':after').getPropertyValue('border-top-width');

  // define main pin pointer height to use it for calculation Y location of the main pin
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

  var getMainPinAddress = function (isActive) {
    window.util.addressForm.value = (window.util.initialMainPinCoordsMap.x + mainPinWidth / 2) + ', ' + (window.util.initialMainPinCoordsMap.y + mainPinHeight / 2);

    if (isActive) {
      window.util.addressForm.value = (window.util.mainPin.offsetLeft + mainPinWidth / 2) + ', ' + (window.util.mainPin.offsetTop + mainPinFullHeight);
    }
  };

  var renderLimitedPins = function (data) {
    var arrayLength = data.length > 5 ? 5 : data.length;
    var fragment = document.createDocumentFragment();
    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    if (currentPins.length > 1 || data.length === 0) {
      for (var i = 0; i < currentPins.length; i++) {
        if (!currentPins[i].classList.contains('map__pin--main')) {
          currentPins[i].remove();
        }
      }
    }
    for (var j = 0; j < arrayLength; j++) {
      var newPin = renderPin(data[j]);
      newPin.id = data[j].uniqueId;
      fragment.appendChild(newPin);
    }
    similarListPin.appendChild(fragment);
  };


  var relocateMainPin = function (coords) {
    window.util.mainPin.style.top = coords.y + 'px';
    window.util.mainPin.style.left = coords.x + 'px';
  };


  var mainPinDraggableHandler = function (evt) {
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

      if (finalCoords.x + mainPinWidth / 2 < window.util.coordsListMap.left || finalCoords.x + mainPinWidth / 2 > window.util.coordsListMap.right) {
        finalCoords.x = window.util.mainPin.offsetLeft;
      }
      if (finalCoords.y + mainPinFullHeight < window.util.coordsListMap.top || finalCoords.y + mainPinFullHeight > window.util.coordsListMap.bottom) {
        finalCoords.y = window.util.mainPin.offsetTop;
      }

      relocateMainPin(finalCoords);
      getMainPinAddress(true);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      getMainPinAddress(true);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.util.mainPin.addEventListener('mousedown', mainPinDraggableHandler);


  window.pin = {
    renderLimitedPins: renderLimitedPins,
    getMainPinAddress: getMainPinAddress,
    mainPinDraggableHandler: mainPinDraggableHandler,
    relocateMainPin: relocateMainPin
  };

})();
