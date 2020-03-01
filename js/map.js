'use strict';

(function () {
  var activateMap = function () {
    window.util.map.classList.remove('map--faded');
  };

  var mapEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      makeMapActive();
    }
  };

  var mapMouseHandler = function (evt) {
    if (evt.button === 0) {
      makeMapActive();
    }
  };

  var makeMapActive = function () {
    activateMap();
    window.pin.addPinsToDom(window.loadResult);
    window.util.formsContainer.classList.remove('ad-form--disabled');
    window.form.makeFormsActive(window.form.formElements);
    window.form.makeFormsActive(window.form.filterElements);
    window.util.mainPin.removeEventListener('keydown', mapEnterHandler);
    window.util.mainPin.removeEventListener('mousedown', mapMouseHandler);
    window.form.getMainPinAddress(true);

    window.card.addCardsToDom(window.loadResult);
    var cards = window.util.map.querySelectorAll('.map__card');
    for (var j = 0; j < cards.length; j++) {
      cards[j].style.display = 'none';
    }
  };

  window.util.mainPin.addEventListener('mousedown', mapMouseHandler);
  window.util.mainPin.addEventListener('keydown', mapEnterHandler);

  window.util.adRooms.addEventListener('change', function () {
    window.form.checkSelectValidity();
  });

  window.util.adCapacity.addEventListener('change', function () {
    window.form.checkSelectValidity();
  });

})();
