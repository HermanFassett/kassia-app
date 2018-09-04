const appController = require('./app');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.isAuthenticated()) {
    appController.getApp(req, res);
  } else {
    res.render('home', {
      title: 'Home'
    });
  }
};
