'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var getSuccessPopup = function () {
    var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successPopupTemplate.cloneNode(true);
    var successPopup = window.util.mainContainer.querySelector('.success');

    if (successPopup) {
      successPopup.style.display = 'block';
    } else {
      window.util.mainContainer.appendChild(successElement);
    }

    return successElement;
  };

  var deactivateSuccessPopup = function () {
    window.util.mainContainer.querySelector('.success').style.display = 'none';
    document.removeEventListener('keydown', successEscHandler);
    document.removeEventListener('click', successClickHandler);
  };

  var successEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      deactivateSuccessPopup();
    }
  };

  var successClickHandler = function () {
    deactivateSuccessPopup();
  };

  var formsSuccessHandler = function () {
    getSuccessPopup();
    document.addEventListener('keydown', successEscHandler);
    document.addEventListener('click', successClickHandler);

    window.pin.relocateMainPin(window.util.initialMainPinCoordsMap);
    window.pin.getMainPinAddress();

    window.util.map.classList.add('map--faded');
    window.util.formsContainer.classList.add('ad-form--disabled');
    window.form.makeFormsDisabled(window.form.formElements);
    window.form.makeFormsDisabled(window.form.filterElements);
    window.form.clearForms();
    window.util.formsResetBtn.removeEventListener('click', window.form.resetBtnHandler);
    window.util.formsContainer.removeEventListener('change', window.file.photoUploadHandler);
    window.util.adRoom.removeEventListener('change', window.form.formValidityHandler);
    window.util.adCapacity.removeEventListener('change', window.form.formValidityHandler);
    window.form.checkinForm.removeEventListener('change', window.form.checkSelectionHandler);
    window.form.checkoutForm.removeEventListener('change', window.form.checkSelectionHandler);

    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    if (currentPins.length > 1) {
      for (var i = 0; i < currentPins.length; i++) {
        if (!currentPins[i].classList.contains('map__pin--main')) {
          currentPins[i].remove();
        }
      }
    }

    var openedCard = window.util.map.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
    }

    window.util.mainPin.addEventListener('mousedown', window.map.mainPinMouseHandler);
    window.util.mainPin.addEventListener('keydown', window.map.mainPinEnterHandler);
  };


  var errorMessageClickHandler = function () {
    deactivateErrorPopup();
  };

  var errorMessageEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      deactivateErrorPopup();
    }
  };

  var deactivateErrorPopup = function () {
    window.util.mainContainer.querySelector('.error').style.display = 'none';
    document.removeEventListener('keydown', errorMessageEscHandler);
    document.removeEventListener('click', errorMessageClickHandler);
  };

  var getErrorPopup = function () {
    var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorPopupTemplate.cloneNode(true);
    var errorBtn = errorElement.querySelector('.error__button');
    var errorPopup = window.util.mainContainer.querySelector('.error');

    if (errorPopup) {
      errorPopup.style.display = 'block';
    } else {
      window.util.mainContainer.appendChild(errorElement);
    }
    errorBtn.addEventListener('click', function () {
      window.util.mainContainer.querySelector('.error').style.display = 'none';
      document.removeEventListener('keydown', errorMessageEscHandler);
      document.removeEventListener('click', errorMessageClickHandler);
    });

    return errorElement;
  };

  var formsErrorHandler = function () {
    getErrorPopup();
    document.addEventListener('keydown', errorMessageEscHandler);
    document.addEventListener('click', errorMessageClickHandler);
  };


  window.util.formsContainer.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.util.formsContainer), formsSuccessHandler, formsErrorHandler);
    evt.preventDefault();
  });

})();
