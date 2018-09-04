const appController = require('./app');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.isAuthenticated()) {
    return appController.getProjects(req, res);
  } else {
    res.render('home', {
      title: 'Home'
    });
  }
};
