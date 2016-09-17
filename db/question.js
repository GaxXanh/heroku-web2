var db = require('./data_access').mongoose;
var error = require('./errorHandler');
var QuestionSchema = new db.Schema({
    order: Number,
    content: {
        type: String,
        require: true
    },
    type: Boolean,//true: single/false: multiple 
    answers: {
        type: [
            String
        ],
        require: true
    },
    rightAnswers: {
        type: [
            String
        ],
        require: true
    },
});

var Question = db.model('Question', QuestionSchema);

//insert
var addQuestion = function (req, res, data) {
    if (data) {
        Question.findOne().sort({ order: -1 }).exec(function (err, doc) {
            if (err) {
                error.e500(req, res);
            } else {
                try {
                    var qAdd = new Question({
                        order: doc ? doc.order + 1 : 0,
                        answers: data.answers,
                        rightAnswers: data.rightAnswers,
                        type: data.rightAnswers.length > 1 ? false : true
                    });
                    qAdd.save(function (err) {
                        if (err) {
                            error.e400(req, res);
                        } else {
                            error.s201(req, res);
                        }
                    });
                } catch (err) {
                    error.e400(req, res, '', err);
                }
            }
        })
    } else {
        error.e400(req, res);
    }
}

//find
var find = function (req, res) {
    Question.find({}, function (err, docs) {
        if (err) error.e500(req, res, '', err);
        else {
            res.end(JSON.stringify(docs));
        }
    });
}

var findByNumber = function (req, res, number) {
    number = parseInt(number);
    if (!number || number < 1) error.e400(req, res, 'Number of question must > 0');
    else
        Question.find().limit(number).exec(function (err, docs) {
            if (err) error.e500(req, res, '', err);
            else {
                res.end(JSON.stringify(docs));
            }
        });
}

var findByOrder = function (req, res, order) {
    if (!order) error.e400(req, res, '');
    else
        Question.findOne({ order: order }, function (err, doc) {
            if (err) error.e404(req, res, '', err);
            else
                res.end(JSON.stringify(doc));
        });
}

var findByType = function (req, res, type) {
    if (type) {
        Question.findOne({ type: type }, function (err, doc) {
            if (err) error.e404(req, res);
            else res.end(JSON.stringify(doc));
        })
    } else {
        error.e400(req, res);
    }
}

module.exports = {
    'addQuestion': addQuestion,
    'find': find,
    'findByNumber': findByNumber,
    'findByOrder': findByOrder,
    'findByType': findByType
}