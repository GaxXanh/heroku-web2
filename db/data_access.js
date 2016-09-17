var mongoose = require('mongoose');

mongoose.connect(require('../package.json').connectionString, function (err) {
    console.log(err || "Connected to MongoDB");
});

exports.mongoose = mongoose;