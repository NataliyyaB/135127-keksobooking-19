'use strict';

(function () {

  var formElements = window.util.formsContainer.querySelectorAll('.ad-form__element');
  var filterContainer = document.querySelector('.map__filters');
  var filterElements = filterContainer.children;
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


  var makeFormsDisabled = function (formsList) {
    for (var i = 0; i < formsList.length; i++) {
      formsList[i].setAttribute('disabled', '');
      formsList[i].style.cursor = 'default';
    }
  };

  var makeFormsActive = function (formsList) {
    for (var i = 0; i < formsList.length; i++) {
      formsList[i].removeAttribute('disabled');
      formsList[i].removeAttribute('style');
    }
  };

  var getMainPinAddress = function (isActive) {
    var pinLeftPosition = window.util.mainPin.offsetLeft;
    var pinTopPosition = window.util.mainPin.offsetTop;
    addressForm.value = (pinLeftPosition + mainPinWidth / 2) + ', ' + (pinTopPosition + mainPinHeight / 2);

    if (isActive) {
      var mainPinPointerHeight = splitString(mainPinPointer, 'px');
      addressForm.value = (pinLeftPosition + mainPinWidth / 2) + ', ' + (pinTopPosition + mainPinHeight / 2 + mainPinPointerHeight);
    }
  };

  var checkSelectValidity = function () {
    var roomsOption = window.util.adRooms.value;
    var capacityOption = window.util.adCapacity.value;

    if (roomsOption === '1' && (capacityOption === '2' || capacityOption === '3' || capacityOption === '0')) {
      window.util.adCapacity.setCustomValidity('not for 1 room');
    } else if (roomsOption === '2' && (capacityOption === '3' || capacityOption === '0')) {
      window.util.adCapacity.setCustomValidity('not for 2 rooms');
    } else if (roomsOption === '3' && capacityOption === '0') {
      window.util.adCapacity.setCustomValidity('not for 3 rooms');
    } else if (roomsOption === '100' && (capacityOption === '1' || capacityOption === '2' || capacityOption === '3')) {
      window.util.adCapacity.setCustomValidity('not for 100 rooms');
    } else {
      window.util.adCapacity.setCustomValidity('');
    }
  };

  makeFormsDisabled(formElements);
  makeFormsDisabled(filterElements);

  getMainPinAddress();

  window.form = {
    formElements: formElements,
    filterElements: filterElements,
    makeFormsActive: makeFormsActive,
    getMainPinAddress: getMainPinAddress,
    makeFormsDisabled: makeFormsDisabled,
    checkSelectValidity: checkSelectValidity
  };

})();
