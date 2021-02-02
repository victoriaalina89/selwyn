const homeController = require('./controllers/homeController');
const clubEventsController = require('./controllers/clubEventsController');
const aboutUsController = require('./controllers/aboutUsController');
const adminLoginController = require('./controllers/adminLoginController');
const logoutController = require('./controllers/logoutController');
const clubInfoController = require('./controllers/clubInfoController');
const galleryController = require('./controllers/galleryController');
const contactUsController = require('./controllers/contactUsController');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const multer = require('multer');
const multerUploadingFiles = multer();
const sessionChecker = require('./sessionChecker');



/**
 * @param {Object} expressApp 
 */
function loadRoutes(expressApp) {

    expressApp.get("/", homeController.displayHome);
    expressApp.get("/events", clubEventsController.displayEvents);
    expressApp.get("/about-us", aboutUsController.displayAboutUs);
    expressApp.get("/admin/login", adminLoginController.displayAdminLogin);
    expressApp.post("/admin/login", urlencodedParser, adminLoginController.postAdminLogin);
    expressApp.get("/logout", logoutController.displayLogout);
    expressApp.get("/admin/events-list", sessionChecker, clubEventsController.displayAdminEvents);
    expressApp.get("/admin/add-event", sessionChecker, clubEventsController.displayAddEvent);
    expressApp.get("/club-info", clubInfoController.displayClubInfo);
    expressApp.get("/gallery", galleryController.displayGallery);
    expressApp.get("/contact-us", contactUsController.displayContactUs);
    expressApp.post("/admin/add-event", multerUploadingFiles.none(), clubEventsController.addClubEvent);
    expressApp.get("/admin/delete-event/:id", urlencodedParser, sessionChecker, clubEventsController.deleteClubEvent);
    expressApp.get("/admin/edit-event/:id", sessionChecker, clubEventsController.getClubEvent);
    expressApp.post("/admin/edit-event/:id", urlencodedParser, multerUploadingFiles.none(), clubEventsController.editClubEvent);
    expressApp.post("/contact-us", multerUploadingFiles.none(), contactUsController.sendEmail);
}


module.exports = loadRoutes;