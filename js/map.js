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
    window.pin.renderLimitedPins(window.loadResult);
    window.util.formsContainer.classList.remove('ad-form--disabled');
    window.form.makeFormsActive(window.form.formElements);
    window.form.makeFormsActive(window.form.filterElements);
    window.util.mainPin.removeEventListener('keydown', mapEnterHandler);
    window.util.mainPin.removeEventListener('mousedown', mapMouseHandler);

    var pins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    window.card.showPinCard(pins);
  };

  window.util.mainPin.addEventListener('mousedown', mapMouseHandler);
  window.util.mainPin.addEventListener('keydown', mapEnterHandler);

  window.util.adRooms.addEventListener('change', window.form.selectValidityHandler);
  window.util.adCapacity.addEventListener('change', window.form.selectValidityHandler);

  window.form.typeForm.addEventListener('change', window.form.setPriceHandler);

  window.form.checkinForm.addEventListener('change', window.form.setcheckinsHandler);
  window.form.checkoutForm.addEventListener('change', window.form.setcheckinsHandler);

  window.filter.typefilterForm.addEventListener('change', window.filter.filterTypeHandler);

  window.map = {
    mapEnterHandler: mapEnterHandler
  };

})();
