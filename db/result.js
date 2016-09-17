var db = require('./data_access').mongoose;
var error = require('./errorHandler');
var ObjectID = db.Schema.Types.ObjectId;

var userAnswerSchema = new db.Schema({
    question: {
        require: true,
        type: ObjectID, ref: 'User'
    },
    userAnswer: [String]
})

var resultSchema = new db.Schema({
    test: {
        require: true,
        type: ObjectID, ref: 'Test'
    },
    user: {
        require: true,
        type: ObjectID, ref: 'User'
    },
    userAnswers: [userAnswerSchema]
})

var Result = db.model('Result', resultSchema);

var find = function (req, res) {
    Result.find({}, function (err, docs) {
        if (err) error.e404(req, res);
        else {
            res.end(JSON.stringify(docs));
        }
    });
}

var findByUserID = function (req, res, userID) {
    Result.find({ user: ObjectID(userID) }, function (err, doc) {
        if (err) error.e404(req, res);
        else {
            res.end(JSON.stringify(doc));
        }
    });
}

exports = {
    'find': find,
    'findByUserID': findByUserID
}