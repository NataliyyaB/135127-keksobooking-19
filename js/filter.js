'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var FILTER_SELECTOR_DEFAULT = 'any';

  var PriceValues = {
    MIN: 10000,
    MAX: 50000,
  };

  var PriceRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var typeSelector = window.util.filterForm.querySelector('#housing-type');
  var priceSelector = window.util.filterForm.querySelector('#housing-price');
  var roomsSelector = window.util.filterForm.querySelector('#housing-rooms');
  var guestsSelector = window.util.filterForm.querySelector('#housing-guests');
  var featureSelectors = window.util.filterForm.querySelectorAll('.map__checkbox');

  var selectedType = FILTER_SELECTOR_DEFAULT;
  var selectedPrice = FILTER_SELECTOR_DEFAULT;
  var selectedRooms = FILTER_SELECTOR_DEFAULT;
  var selectedCapacity = FILTER_SELECTOR_DEFAULT;
  var selectedFeatures = [];

  var formsChangeHandler = function (clickEvt) {
    var selectedTarget = clickEvt.target;
    var selectedFilterOption = selectedTarget.value;

    var currentTarget = selectedTarget.checked === undefined ? selectedTarget.id : selectedTarget.checked;

    switch (currentTarget) {
      case true: selectedFeatures.push(selectedFilterOption);
        break;
      case false:
        var currentFeatureIndex = selectedFeatures.indexOf(selectedFilterOption);
        selectedFeatures.splice(currentFeatureIndex, 1);
        break;
      case 'housing-type': selectedType = selectedTarget.value;
        break;
      case 'housing-price': selectedPrice = selectedTarget.value;
        break;
      case 'housing-rooms': selectedRooms = selectedTarget.value;
        break;
      case 'housing-guests': selectedCapacity = selectedTarget.value;
        break;
      default: break;
    }


    var checkType = function (value) {
      return (selectedType === FILTER_SELECTOR_DEFAULT || value === selectedType);
    };

    var checkPrice = function (value) {
      return (selectedPrice === FILTER_SELECTOR_DEFAULT || selectedPrice === PriceRange.MIDDLE && value >= PriceValues.MIN && value <= PriceValues.MAX) || (selectedPrice === PriceRange.HIGH && value > PriceValues.MAX) || (selectedPrice === PriceRange.LOW && value < PriceValues.MIN);
    };

    var checkRooms = function (value) {
      return (selectedRooms === FILTER_SELECTOR_DEFAULT || value === selectedRooms);
    };

    var checkCapacity = function (value) {
      return (selectedCapacity === FILTER_SELECTOR_DEFAULT || value === selectedCapacity);
    };

    var checkFeatures = function (value) {
      return (selectedFeatures.length === 0 || selectedFeatures.every(function (feature) {
        return value.includes(feature);
      }));
    };

    var samePins = window.loadResult.filter(function (it) {
      if (!it.offer) {
        return false;
      }
      return checkType(it.offer.type) &&
        checkPrice(it.offer.price) &&
        checkRooms(it.offer.rooms.toString()) &&
        checkCapacity(it.offer.guests.toString()) &&
        checkFeatures(it.offer.features);
    });


    window.debounce(function () {
      window.pin.renderLimitedItems(samePins);
      window.card.remove();
      var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
      window.card.show(currentPins);
    });
  };


  var resetSelectors = function () {
    typeSelector.value = FILTER_SELECTOR_DEFAULT;
    priceSelector.value = FILTER_SELECTOR_DEFAULT;
    roomsSelector.value = FILTER_SELECTOR_DEFAULT;
    guestsSelector.value = FILTER_SELECTOR_DEFAULT;
    selectedType = FILTER_SELECTOR_DEFAULT;
    selectedPrice = FILTER_SELECTOR_DEFAULT;
    selectedRooms = FILTER_SELECTOR_DEFAULT;
    selectedCapacity = FILTER_SELECTOR_DEFAULT;
    selectedFeatures = [];

    featureSelectors.forEach(function (featureSelector) {
      if (featureSelector.checked) {
        featureSelector.checked = false;
      }
    });
  };


  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };


  window.filter = {
    formsChangeHandler: formsChangeHandler,
    resetSelectors: resetSelectors
  };

})();
