'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;

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
    if (evt.key === window.util.UserEvents.KEYBOARD_ESCAPE) {
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

    window.form.deactivateElements();
    window.form.clear();

    window.util.mainPin.addEventListener('mousedown', window.map.mainPinMouseHandler);
    window.util.mainPin.addEventListener('keydown', window.map.mainPinEnterHandler);
  };


  var errorMessageClickHandler = function () {
    deactivateErrorPopup();
  };

  var errorMessageEscHandler = function (evt) {
    if (evt.key === window.util.UserEvents.KEYBOARD_ESCAPE) {
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
