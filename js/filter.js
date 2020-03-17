'use strict';

(function () {
  var selectedType = 'any';
  var selectedPrice = 'any';
  var selectedRooms = 'any';
  var selectedCapacity = 'any';
  var selectedFeatures = [];

  var filterChangeHandler = function (clickEvt) {
    var selectedTarget = clickEvt.target;
    var selectedFilterOption = selectedTarget.value;

    if (selectedTarget.id === 'housing-type') {
      selectedType = selectedTarget.value;
    } else if (selectedTarget.id === 'housing-price') {
      selectedPrice = selectedTarget.value;
    } else if (selectedTarget.id === 'housing-rooms') {
      selectedRooms = selectedTarget.value;
    } else if (selectedTarget.id === 'housing-guests') {
      selectedCapacity = selectedTarget.value;
    } else if (selectedTarget.checked === true) {
      selectedFeatures.push(selectedFilterOption);
    } else if (selectedTarget.checked === false) {
      var currentFeatureIndex = selectedFeatures.indexOf(selectedFilterOption);
      selectedFeatures.splice(currentFeatureIndex, 1);
    }


    var samePins = window.loadResult.filter(function (it) {
      return (selectedType === 'any' || it.offer.type === selectedType) &&
        ((selectedPrice === 'any' || selectedPrice === 'middle' && it.offer.price >= 10000 && it.offer.price <= 50000) || (selectedPrice === 'high' && it.offer.price > 50000) || (selectedPrice === 'low' && it.offer.price < 10000)) &&
        (selectedRooms === 'any' || it.offer.rooms.toString() === selectedRooms) &&
        (selectedCapacity === 'any' || it.offer.guests.toString() === selectedCapacity) &&
        (selectedFeatures.length === 0 || selectedFeatures.every(function (feature) {
          return it.offer.features.includes(feature);
        }));
    });

    window.pin.renderLimitedPins(samePins);

    window.card.removeCard();

    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    window.card.showPinCard(currentPins);
  };


  window.filter = {
    filterChangeHandler: filterChangeHandler
  };

})();
