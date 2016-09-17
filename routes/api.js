var express = require('express'),
    router = express.Router(),
    User = require('../db/user'),
    Question = require('../db/question'),
    Test = require('../db/test'),
    Result = require('../db/result'),
    error = require('../db/errorHandler'),
    validator = require('validator');

router.get('/test', function (req, res) {
    res.end('test');
});

//----------------------user----------------

router.get('/user', function (req, res) {
    User.find(req, res);
})

router.get('/user/:username', function (req, res) {
    var username = req.params.username;
    if (username) {
        User.findByUsername(req, res, username);
    } else {
        error.e400(req, res);
    }
})

router.post('/user/find', function (req, res) {
    var name = req.body.name;
    if (name) {
        User.findByName(req, res, name);
    } else {
        error.e400(req, res);
    }
})

router.post('/user', function (req, res) {
    var data = req.body;
    if (data) {
        User.addUser(req, res, data);
    } else {
        error.e400(req, res);
    }
})


router.post('/user/login', function (req, res) {
    var data = req.body;
    if (data) {
        User.checkLogin(req, res, data.username, data.password);
    } else {
        error.e400(req, res, 'Missing username and password');
    }
})

//----------------------question---------------
router.get('/question', function (req, res) {
    Question.find(req, res);
})

router.get('/question/:order', function (req, res) {
    var order = req.params.order;
    if (order) Question.findByOrder(req, res, order);
    else error.e400(req, res);
})

router.post('/question', function (req, res) {
    var data = req.body;
    if (data) {
        Question.addQuestion(req, res, data);
    } else {
        error.e400(req, res);
    }
})

router.post('/question/number', function (req, res) {
    var number = req.body.number;
    if (number) Question.findByNumber(req, res, number);
    else error.e400(req, res);
})

router.post('/question/type', function (req, res) {
    var type = req.body.type;
    if (type) {
        type = type === 'true' ? true : type === 'false' ? false : null;
        if (type || type == false) {
            Question.findByType(req, res, type);
            return;
        }
    }
    error.e400(req, res);
})


//----------------------Test---------------

router.get('/test', function (req, res) {
    Test.find(req, res);
})

router.get('/test/:title', function (req, res) {
    var title = req.params.title;
    if (title) {
        Test.findByTitle(req, res, title);
    } else error.e400(req, res);
})

//----------------------result---------------

router.get('/result', function (req, res) {
    Result.find(req, res);
})

router.get('/result/:userID', function (req, res) {
    var user = req.params.userID;
    if (user) {
        Result.findByUserID(req, res, user);
    } else error.e400(req, res);
})

module.exports = router;