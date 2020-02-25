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

  var makeMapActive = function () {
    activateMap();
    window.pin.addPinsToDom(window.data.pins);
    window.util.formsContainer.classList.remove('ad-form--disabled');
    window.form.makeFormsActive(window.form.formElements);
    window.form.makeFormsActive(window.form.filterElements);
    window.util.mainPin.removeEventListener('keydown', mapEnterHandler);
    window.form.getMainPinAddress(true);
    window.card.addCardsToDom(window.data.pins);
  };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      makeMapActive();
    }
  });

  window.util.mainPin.addEventListener('keydown', mapEnterHandler);

  window.util.adRooms.addEventListener('change', function () {
    window.form.checkSelectValidity();
  });

  window.util.adCapacity.addEventListener('change', function () {
    window.form.checkSelectValidity();
  });

})();
