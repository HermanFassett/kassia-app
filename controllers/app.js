const path = require('path');
const fs = require('fs-extra');

/**
 * GET /
 * App
 */
exports.getApp = (req, res) => {
  const projectId = req.params.id;
  if (!projectId) {
    res.render('app/index', {
      title: 'Kassia App',
    });
  } else {
    const projectPath = path.join(process.cwd(), 'projects', req.user._id.toString(), projectId);
    fs.readFile(projectPath, 'utf8', function(err, data) {
      if (err) return next(err);
      res.render('app/index', {
        title: 'Kassia App',
        xml: encodeURIComponent(data),
        pdf: `/project/${projectId}/pdf`
      });
    })
  }
};

exports.getPDF = (req, res) => {
  const projectId = req.params.id;

  if (req.user) {
    res.sendFile(path.join(process.cwd(), 'projects', req.user._id.toString(), `${projectId}.pdf`));
  } else {
    res.status(403).send('You are not authorized or project does not exist');
  }
}

exports.addProject = (req, res) => {
  req.assert('name', 'Project name must exist').exists();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }

  const project = new Project({
    name: req.body.name,
    owner: req.user._id
  });

  project.save((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};