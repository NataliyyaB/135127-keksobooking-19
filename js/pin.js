'use strict';

(function () {
  var similarListPin = document.querySelector('.map__pins');
  var addressForm = window.util.formsContainer.querySelector('#address');
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
    var pinLeftPosition = window.util.mainPin.offsetLeft;
    var pinTopPosition = window.util.mainPin.offsetTop;
    addressForm.value = (pinLeftPosition + mainPinWidth / 2) + ', ' + (pinTopPosition + mainPinHeight / 2);

    if (isActive) {
      addressForm.value = (window.util.mainPin.offsetLeft + mainPinWidth / 2) + ', ' + (window.util.mainPin.offsetTop + mainPinHeight + mainPinPointerHeight);
    }
  };

  var renderLimitedPins = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    var fragment = document.createDocumentFragment();
    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    if (currentPins.length > 1) {
      for (var i = 0; i < currentPins.length; i++) {
        if (!currentPins[i].classList.contains('map__pin--main')) {
          currentPins[i].remove();
        }
      }
    }
    for (var j = 0; j < takeNumber; j++) {
      var newPin = renderPin(data[j]);
      newPin.id = data[j].uniqueId;
      fragment.appendChild(newPin);
    }
    similarListPin.appendChild(fragment);
  };

  window.pin = {
    renderLimitedPins: renderLimitedPins,
    getMainPinAddress: getMainPinAddress
  };

})();
