const submergeAquaticsController = {

    async displaySubmergeAquatics(request, response) {

        response.render("noAdmin/submergeAquatics.ejs", {currentPage: "submerge-aquatics"});
    }

};

module.exports = submergeAquaticsController;