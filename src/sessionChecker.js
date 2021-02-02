const sessionChecker = (request, response, next) => {
    if (request.session.admin) {
        next();
    } else {
        response.redirect('/');
    }    
};

module.exports = sessionChecker;