'use strict';

(function () {
  var Code = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var TIMEOUT_IN_MS = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var messageTopPosition = 0;
  var messageLeftPosition = 0;

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 20px; text-align: center; color: #ffffff; background-color: #ff5635e6;';
    node.style.position = 'absolute';
    node.style.left = messageTopPosition;
    node.style.right = messageLeftPosition;
    node.style.fontSize = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (data) {
    data.forEach(function (dataItem, i) {
      dataItem.uniqueId = i;
    });

    window.pin.renderLimitedItems(data);
    window.loadResult = data;
    var pins = window.util.mapPinsContainer.querySelectorAll('.map__pin');
    window.card.show(pins);
  };

  var getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.OK:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case Code.UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case Code.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        case Code.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send();
  };

  window.load = {
    getData: getData,
    successHandler: successHandler,
    errorHandler: errorHandler
  };

})();
