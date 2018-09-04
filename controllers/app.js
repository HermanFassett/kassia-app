const path = require('path');
const fs = require('fs-extra');
const Project = require('../models/Project');

exports.getProjects = (req, res) => {
  Project.find({ owner: req.user._id }, (err, projects) => {
    res.render('app/projects', {
      title: "Projects",
      projects
    });
  });  
};

exports.getProject = (req, res) => {
  const projectId = req.params.id;
  if (!projectId) {
    res.render('app/index', {
      title: 'Kassia App',
    });
  } else {
    const projectPath = path.join(process.cwd(), 'projects', req.user._id.toString(), projectId);
    fs.readFile(projectPath, 'utf8', function(err, data) {
      if (err) {
        res.render('app/index', {
          title: 'Kassia App',
          id: projectId
        });
      } else {
        res.render('app/index', {
          title: 'Kassia App',
          xml: encodeURIComponent(data),
          pdf: `/project/${projectId}/pdf`,
          id: projectId
        });
      }
    })
  }
};

exports.getPDF = (req, res) => {
  const projectId = req.params.id;

  if (req.user) {
    const file = path.join(process.cwd(), 'projects', req.user._id.toString(), `${projectId}.pdf`);
    if (fs.existsSync(file)) {
      res.sendFile(file);
    } else {
      res.render('app/missing');
    }
  } else {
    res.status(403).send('You are not authorized');
  }
}

exports.addProject = (req, res) => {
  const project = new Project({
    name: req.body.name || 'Untitled',
    owner: req.user._id
  });

  project.save((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};