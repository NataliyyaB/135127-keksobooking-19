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
    for (var i = 0; i < formsList.length; i++) {
      formsList[i].removeAttribute('disabled');
      formsList[i].removeAttribute('style');
    }
  };

  var checkSelectValidity = function () {
    var roomsOption = window.util.adRooms.value;
    var capacityOption = window.util.adCapacity.value;

    if (roomsOption === '1' && (capacityOption === '2' || capacityOption === '3' || capacityOption === '0')) {
      window.util.adCapacity.setCustomValidity('Не подходит для 1 комнаты');
    } else if (roomsOption === '2' && (capacityOption === '3' || capacityOption === '0')) {
      window.util.adCapacity.setCustomValidity('Не подходит для 2ч комнат');
    } else if (roomsOption === '3' && capacityOption === '0') {
      window.util.adCapacity.setCustomValidity('Не подходит для 3 комнат');
    } else if (roomsOption === '100' && (capacityOption === '1' || capacityOption === '2' || capacityOption === '3')) {
      window.util.adCapacity.setCustomValidity('Не подходит для 100 комнат');
    } else {
      window.util.adCapacity.setCustomValidity('');
    }
  };

  var selectValidityHandler = function () {
    checkSelectValidity();
  };

  makeFormsDisabled(formElements);
  makeFormsDisabled(filterElements);

  window.pin.getMainPinAddress();


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

  var setCheckinCkeckout = function () {
    var checkinValue = checkinForm.value;
    switch (checkinValue) {
      case '12:00':
        checkoutForm.value = '12:00';
        break;
      case '13:00':
        checkoutForm.value = '13:00';
        break;
      case '14:00':
        checkoutForm.value = '14:00';
        break;
      default: return 'no type found';
    }

    return undefined;
  };

  var setcheckinsHandler = function () {
    setCheckinCkeckout();
  };


  window.form = {
    formElements: formElements,
    filterElements: filterElements,
    makeFormsActive: makeFormsActive,
    makeFormsDisabled: makeFormsDisabled,
    checkSelectValidity: checkSelectValidity,
    selectValidityHandler: selectValidityHandler,
    typeForm: typeForm,
    setPriceHandler: setPriceHandler,
    checkinForm: checkinForm,
    checkoutForm: checkoutForm,
    setcheckinsHandler: setcheckinsHandler,
    setCheckinCkeckout: setCheckinCkeckout
  };

})();
