
const clubImagesService = require('../services/clubImagesService');


const clubImagesController = {

  async displayGallery(request, response) {

    const clubImages = await clubImagesService.getClubImages();

    response.render('gallery.ejs', {images: clubImages});

  },

  async displayAdminGallery(request, response) {

    const clubImages = await clubImagesService.getClubImages();

    response.render('imagesList.ejs', {images: clubImages});

  },

  async displayAddClubImage(request, response) {

    response.render('addImage.ejs');

  },

  async addClubImage(request, response) {

    if (request.fileValidationError) {
      response.render('addImage.ejs', {msg: 'images .jpg | .png | .jpeg only! '});

      return;
    }

    await clubImagesService.addClubImage(request.file.filename, request.body.date, request.body.name);


    response.redirect('/admin/images-list');

  },

  async updateClubImage(request, response) {

    await clubImagesService.updateClubImage(request.params.id);

    response.redirect('/admin/images-list');

  }


}

module.exports = clubImagesController;