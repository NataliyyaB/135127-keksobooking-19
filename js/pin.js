'use strict';

(function () {
  var similarListPin = document.querySelector('.map__pins');

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


  var addPinsToDom = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(renderPin(elements[i]));
    }
    similarListPin.appendChild(fragment);
  };

  window.pin = {
    addPinsToDom: addPinsToDom
  };

})();
