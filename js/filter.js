'use strict';

(function () {

  var filterForm = window.util.map.querySelector('.map__filters');
  var typefilterForm = filterForm.querySelector('#housing-type');

  var selectedPinType;

  var filterTypeHandler = function (evt) {
    var clickTarget = evt.target;
    selectedPinType = clickTarget.value;

    if (selectedPinType === 'any') {
      window.pin.renderLimitedPins(window.loadResult);
      var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
      window.card.showPinCard(currentPins);
      window.card.removeCard();
    } else {
      filterByType();
      window.card.removeCard();
    }
  };

  var filterByType = function () {
    var sameTypePins = window.loadResult.filter(function (it) {
      return it.offer.type === selectedPinType;
    });
    window.pin.renderLimitedPins(sameTypePins);
    var currentPins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    window.card.showPinCard(currentPins);
  };

  window.filter = {
    typefilterForm: typefilterForm,
    filterTypeHandler: filterTypeHandler
  };

})();
