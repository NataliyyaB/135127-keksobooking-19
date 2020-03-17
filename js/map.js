'use strict';

(function () {
  var activateMap = function () {
    window.util.map.classList.remove('map--faded');
  };

  var mainPinEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      makeMapActive();
      window.util.mainPin.removeEventListener('keydown', mainPinEnterHandler);
      window.util.mainPin.removeEventListener('mousedown', mainPinMouseHandler);
    }
  };

  var mainPinMouseHandler = function (evt) {
    if (evt.button === 0) {
      makeMapActive();
      window.util.mainPin.removeEventListener('keydown', mainPinEnterHandler);
      window.util.mainPin.removeEventListener('mousedown', mainPinMouseHandler);
    }
  };

  var makeMapActive = function () {
    activateMap();
    window.pin.renderLimitedPins(window.loadResult);
    window.util.formsContainer.classList.remove('ad-form--disabled');

    window.form.makeFormsActive(window.form.formElements);
    window.form.makeFormsActive(window.form.filterElements);
    window.util.adRooms.addEventListener('change', window.form.roomsValidityHandler);
    window.util.adCapacity.addEventListener('change', window.form.roomsValidityHandler);
    window.form.typeForm.addEventListener('change', window.form.setPriceHandler);
    // window.form.checkinForm.addEventListener('change', window.form.setCheckinsHandler);
    // window.form.checkoutForm.addEventListener('change', window.form.setCheckinsHandler);
    window.util.checkinCheckoutForms.addEventListener('change', window.form.setCheckinsHandler);
    window.util.formsResetBtn.addEventListener('click', window.form.resetBtnHandler);

    var pins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    window.card.showPinCard(pins);
  };

  window.util.mainPin.addEventListener('mousedown', mainPinMouseHandler);
  window.util.mainPin.addEventListener('keydown', mainPinEnterHandler);

  window.util.filterForm.addEventListener('change', window.filter.filterChangeHandler);

  window.map = {
    mainPinMouseHandler: mainPinMouseHandler,
    mainPinEnterHandler: mainPinEnterHandler
  };

})();
