/**
 * GET /
 * App
 */
exports.getApp = (req, res) => {
    res.render('app/index', {
      title: 'Kassia App'
    });
  };
  