const galleryController = {

    async displayGallery(request, response) {

        response.render('gallery.ejs');

    }
}

module.exports = galleryController;