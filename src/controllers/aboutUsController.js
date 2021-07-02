const aboutUsController = {

    async displayAboutUs(request, response) {
        
        response.render("noAdmin/aboutUs.ejs", {currentPage: "about-us"});
    }

};

module.exports = aboutUsController;