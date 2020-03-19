'use strict';

(function () {
  var activateMap = function () {
    window.util.map.classList.remove('map--faded');
  };

  var mainPinEnterHandler = function (evt) {
    if (evt.key === window.util.UserEvents.KEYBOARD_ENTER) {
      makeMapActive();
      window.util.mainPin.removeEventListener('keydown', mainPinEnterHandler);
      window.util.mainPin.removeEventListener('mousedown', mainPinMouseHandler);
    }
  };

  var mainPinMouseHandler = function (evt) {
    if (evt.button === window.util.UserEvents.MOUSE_LEFT_BUTTON) {
      makeMapActive();
      window.util.mainPin.removeEventListener('keydown', mainPinEnterHandler);
      window.util.mainPin.removeEventListener('mousedown', mainPinMouseHandler);
    }
  };

  var makeMapActive = function () {
    window.load.getData(window.load.successHandler, window.load.errorHandler);
    activateMap();
    window.util.formsContainer.classList.remove('ad-form--disabled');
    window.form.makeActive(window.form.elements);
    window.form.makeActive(window.form.filterElements);
    window.util.adRoom.addEventListener('change', window.form.roomsValidityHandler);
    window.util.adCapacity.addEventListener('change', window.form.roomsValidityHandler);
    window.form.type.addEventListener('change', window.form.setPriceHandler);
    window.util.checkinCheckoutForm.addEventListener('change', window.form.setCheckinsHandler);
    window.util.formsResetBtn.addEventListener('click', window.form.resetBtnHandler);
    window.util.formsContainer.addEventListener('change', window.file.photoUploadHandler);
  };

  window.util.mainPin.addEventListener('mousedown', mainPinMouseHandler);
  window.util.mainPin.addEventListener('keydown', mainPinEnterHandler);
  window.util.filterForm.addEventListener('change', window.filter.formsChangeHandler);


  window.map = {
    mainPinMouseHandler: mainPinMouseHandler,
    mainPinEnterHandler: mainPinEnterHandler
  };

})();
