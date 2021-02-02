const aboutUsController = {

    async displayAboutUs(request, response) {
        
        response.render("aboutUs.ejs");
    }

};

module.exports = aboutUsController;