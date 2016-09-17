var db = require('./data_access').mongoose;
var error = require('./errorHandler');
var ObjectID = db.Schema.Types.ObjectId;

var testSchema = new db.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    questions: [{ type: ObjectID, ref: 'Question'}]
});

var Test = db.model('Test', testSchema);

var addTest = function (req, res, data) {
    if (data) {
        var tAdd = new Test({
            title: data.type,
            questions: data.questions
        });
        tAdd.save(function (err) {
            if (err) error.e400(req, res);
            else error.s201(req, res);
        })
    }
}

var find = function (req, res) {
    User.find().populate('questions').exec((function (err, docs) {
        if (err) error.e404(req, res);
        else res.end(req, res);
    }));
}

var findByTitle = function (req, res, title) {
    if (title) {
        Test.findOne({ title: title }, function (err, docs) {
            if (err) {
                error.e400;
            } else {
                res.end(JSON.stringify(docs));
            }
        });
    } else error.e400(req, res);
}
module.exports = {
    'addTest': addTest,
    'find': find,
    'findByTitle': findByTitle
}