const path = require('path');
const fs = require('fs-extra');

/**
 * POST /api/convert
 * File convert to PDF by python
 */
exports.postConvert = (req, res) => {
  const { spawn } = require('child_process'),
    project = req.params.id,
    filename = project || 'draft',
    scriptPath = path.join(process.cwd(), 'kassia/kassia.py'),
    inputPath = path.join(process.cwd(), 'projects', req.user._id.toString()),
    inputFile = path.join(inputPath, filename),
    outputPath = path.join(process.cwd(), 'projects',  req.user._id.toString());

  // Ensure directories exist
  fs.mkdirsSync(outputPath);
  fs.mkdirsSync(inputPath);

  // Create XML file from req for passing to python script
  fs.writeFileSync(path.join(inputPath, filename), req.body.xmlText);
  
  // Call python script on data 
  const pyScript = spawn('python', [scriptPath, inputFile, `${outputPath}/${filename}.pdf`]);

  // Get data while python script is running
  pyScript.stdout.on('data', function(data) {
    console.log("Data:", data.toString());
  });

  // Redirect on script completion
  pyScript.stdout.on('end', function() {
    res.redirect(`/project/${filename}/pdf`);
  });
}