//Bad request
exports.e400 = function (req, res, mess, err) {
    console.log("Error: 400 Bad request. " + (mess || '') + (err || ''));
    res.end("Error: 400 Bad request. " + (mess || '') + (err || ''));
}

exports.e500 = function (req, res, mess, err) {
    console.log("Error: 500 Internal Server Error. " + (mess || '') + (err || ''));
    res.end("Error: 500 Internal Server Error. " + (mess || '') + (err || ''));
}

exports.e404 = function (req, res, mess, err) {
    console.log("Error: 404 Not Found. " + (mess || '') + (err || ''));
    res.end("Error: 404 Not Found. " + (mess || '') + (err || ''));
}

exports.s200 = function (req, res, mess, err) {
    console.log("Success! " + (mess || ''));
    res.end("Success! " + (mess || ''));
}

exports.s201 = function (req, res, mess, err) {
    console.log("Created! " + (mess || ''));
    res.json({success: "Created! " + (mess || '') });
}

