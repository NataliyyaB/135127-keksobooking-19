'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoUploadHandler = function (evt) {
    var photoPreview;
    var photoForm;

    if (evt.target.id === 'avatar') {
      photoForm = window.util.formsContainer.querySelector('#avatar');
      photoPreview = window.util.avatar;
    } else if (evt.target.id === 'images') {
      photoForm = window.util.formsContainer.querySelector('#images');
      photoPreview = window.util.formPhoto;
    } else {
      return;
    }

    var file = photoForm.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (photoPreview.tagName.toLowerCase() === 'img') {
          photoPreview.src = reader.result;
        } else if (photoPreview.tagName.toLowerCase() === 'div') {
          var imgURL = reader.result;
          photoPreview.style.backgroundImage = 'url(' + imgURL + ')';
          photoPreview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  window.file = {
    photoUploadHandler: photoUploadHandler
  };

})();
