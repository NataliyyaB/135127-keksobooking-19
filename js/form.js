'use strict';

(function () {
  var formElements = window.util.formsContainer.querySelectorAll('.ad-form__element');
  var filterContainer = document.querySelector('.map__filters');
  var filterElements = filterContainer.children;
  var typeForm = window.util.formsContainer.querySelector('#type');
  var priceForm = window.util.formsContainer.querySelector('#price');
  var checkinForm = window.util.formsContainer.querySelector('#timein');
  var checkoutForm = window.util.formsContainer.querySelector('#timeout');

  var makeFormsDisabled = function (formsList) {
    for (var i = 0; i < formsList.length; i++) {
      formsList[i].setAttribute('disabled', '');
      formsList[i].style.cursor = 'default';
    }
  };

  var makeFormsActive = function (formsList) {
    for (var j = 0; j < formsList.length; j++) {
      formsList[j].removeAttribute('disabled');
      formsList[j].removeAttribute('style');
    }
  };

  var checkRoomsValidity = function () {
    var roomsOption = window.util.adRoom.value;
    var capacityOption = window.util.adCapacity.value;

    if (roomsOption === '1' && (capacityOption === '2' || capacityOption === '3' || capacityOption === '0')) {
      window.util.adCapacity.setCustomValidity('Не подходит для 1 комнаты');
    } else if (roomsOption === '2' && (capacityOption === '3' || capacityOption === '0')) {
      window.util.adCapacity.setCustomValidity('Не подходит для 2 комнат');
    } else if (roomsOption === '3' && capacityOption === '0') {
      window.util.adCapacity.setCustomValidity('Не подходит для 3 комнат');
    } else if (roomsOption === '100' && (capacityOption === '1' || capacityOption === '2' || capacityOption === '3')) {
      window.util.adCapacity.setCustomValidity('Не подходит для 100 комнат');
    } else {
      window.util.adCapacity.setCustomValidity('');
    }
  };

  var roomsValidityHandler = function () {
    checkRoomsValidity();
  };

  var setPrice = function () {
    var typeValue = typeForm.value;
    switch (typeValue) {
      case 'flat':
        priceForm.min = 1000;
        priceForm.placeholder = '1000';
        break;
      case 'bungalo':
        priceForm.min = 0;
        priceForm.placeholder = '0';
        break;
      case 'house':
        priceForm.min = 5000;
        priceForm.placeholder = '5000';
        break;
      case 'palace':
        priceForm.min = 10000;
        priceForm.placeholder = '10000';
        break;
      default: return 'no type found';
    }

    return undefined;
  };

  var setPriceHandler = function () {
    setPrice();
  };

  var setCheckinCkeckout = function (selectedOption) {
    var timeResult;
    if (selectedOption.id === 'timein') {
      timeResult = checkoutForm;
    } else {
      timeResult = checkinForm;
    }

    switch (selectedOption.value) {
      case '12:00':
        timeResult.value = '12:00';
        break;
      case '13:00':
        timeResult.value = '13:00';
        break;
      case '14:00':
        timeResult.value = '14:00';
        break;
      default: return 'no type found';
    }

    return undefined;
  };

  var setCheckinsHandler = function (evt) {
    var target = evt.target;
    setCheckinCkeckout(target);
  };

  var clearForms = function () {
    window.util.adTitle.value = '';
    window.util.adDescription.value = '';
    priceForm.value = '';
    checkinForm.value = '12:00';
    checkoutForm.value = '12:00';
    typeForm.value = 'flat';
    window.util.formPhoto.style = '';
    window.util.avatar.src = 'img/muffin-grey.svg';
    setPrice();
    window.util.adRoom.value = '1';
    window.util.adCapacity.value = '1';
    checkRoomsValidity();

    for (var k = 0; k < window.util.adFeatures.length; k++) {
      if (window.util.adFeatures[k].checked === true) {
        window.util.adFeatures[k].checked = false;
      }
    }
  };

  var resetBtnHandler = function (evt) {
    evt.preventDefault();
    clearForms();
  };


  makeFormsDisabled(formElements);
  makeFormsDisabled(filterElements);
  window.pin.getMainPinAddress();


  window.form = {
    formElements: formElements,
    filterElements: filterElements,
    makeFormsActive: makeFormsActive,
    makeFormsDisabled: makeFormsDisabled,
    checkRoomsValidity: checkRoomsValidity,
    roomsValidityHandler: roomsValidityHandler,
    typeForm: typeForm,
    priceForm: priceForm,
    setPrice: setPrice,
    setPriceHandler: setPriceHandler,
    checkinForm: checkinForm,
    checkoutForm: checkoutForm,
    setCheckinsHandler: setCheckinsHandler,
    clearForms: clearForms,
    resetBtnHandler: resetBtnHandler
  };

})();
