const request = require('request');
const path = require('path');
const fs = require('fs-extra');

/**
 * POST /api/convert
 * File convert to PDF by python
 */
exports.postConvert = (req, res) => {
  // Call python script on data
  const { spawn } = require('child_process');
  const scriptPath = path.posix.join(process.cwd(), 'kassia/pdfmaker/kassia.py');
  const inputFile = path.posix.join(process.cwd(), 'uploads', req.user._id.toString(), req.file.filename);
  const outputPath = path.posix.join(process.cwd(), 'output', req.user._id.toString());

  fs.mkdirsSync(outputPath)

  const pyScript = spawn('python', [scriptPath, inputFile, `${outputPath}/${req.file.filename}.pdf`]);

  // Get data while python script is running
  pyScript.stdout.on('data', function(data) {
    console.log("Data:", data.toString());
  });

  // Redirect on script completion
  pyScript.stdout.on('end', function() {
    res.redirect(`/output/${req.user._id.toString()}/${req.file.filename}`);
  });
}