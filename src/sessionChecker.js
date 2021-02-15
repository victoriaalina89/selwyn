const sessionChecker = (request, response, next) => {
    if (request.isAuthenticated())
       return next();
   
    response.redirect('/');
      
};

module.exports = sessionChecker;