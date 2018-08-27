const request = require('request');
const path = require('path');

exports.getConvertedFile = (req, res) => {
    const userid = req.params.userid;
    const filename = req.params.filename;

    if (req.user._id.toString() === userid) {
        res.sendFile(path.join(process.cwd(), 'output', userid, `${filename}.pdf`));
    } else {
        res.status(403).send("You are not authorized");
    }
}