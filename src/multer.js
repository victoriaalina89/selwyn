const multer = require('multer');
const path = require('path');
const ClubImage = require('./classes/ClubImage');

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function(request, file, callback) {
    const newClubImage = new ClubImage(request.params.id, request.body.date, request.body.name, request.body.path);
      callback(null, newClubImage.getNameForImage() + path.extname(file.originalname).toLowerCase())
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 3000000},
  fileFilter:  function (request, file, callback) {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
         request.fileValidationError = "Forbidden extension";
         return callback(null, false, request.fileValidationError);
   }
   callback(null, true);
}
})

module.exports = upload;