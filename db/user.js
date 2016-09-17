var db = require('./data_access').mongoose;
var error = require('./errorHandler');
var validator = require('validator');

var UserSchema = new db.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isAlphanumeric(v);
            },
            message: "The username contains alphabet and number only!!"
        }
    },
    password: {
        type: String,
        require: true,
        validate: {
            validator: function (v) {
                return validator.isAscii(v);
            },
            message: "The password contains only ASCII character only!!"
        }
    },
    name: {
        type: String,
        require: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /[a-zA-Z][a-zA-Z ]*/.test(v);
            },
            message: 'Name have more than 1 word and contains only alphabet and space!'
        },
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (V) {
                return validator.isNumeric(v);
            }
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (V) {
                return validator.isEmail(v);
            }
        }
    },
    DOB: Date
});

var User = db.model('User', UserSchema);

//adding
var addUser = function (req, res, data) {
    if (data) {
        var user = new User({
            username: data.username,
            password: data.password,
            name: data.name,
            phone: data.phone,
            email: data.email,
            DOB: data.DOB ? new Date(data.DOB) : undefined
        });
        if (user.validateSync()) {
            error.e400(req, res, '', user.validateSync());
        }else user.save(function (err) {
            if (err) {
                error.e500(req, res, '', err);
            } else {
                error.s201(req, res);
            }
        });
    } else {
        error.e400(req, res);
    }
}

//finding

var find = function (req, res) {
    User.find(function (err, docs) {
        if (err) error.e404(req, res);
        else {
            res.end(JSON.stringify(docs));
        }
    });
}

var findByUsername = function (req, res, username) {
    User.findOne({ username: username }, function (err, doc) {
        if (err) error.e404(req, res);
        else {
            res.end(JSON.stringify(doc));
        }
    });
}

var findByName = function (req, res, name) {
    User.find({ name: new RegExp(name, "i") }, function (err, docs) {
        if (err) error.e404(req, res);
        else {
            res.end(JSON.stringify(docs));
        }
    });
}
//ToDO : not yet logined state
var checkLogin = function(req, res, username, password) {
    if (username && password) {
        User.findOne({ username: username, password: password }, function (err, doc) {
            if (err) error.e500(req, res);
            else {
                //TODO : save the user login to >> ck ? token
                error.s200(req, res);
            }
        });
    } else {
        error.e400(req, res, 'Login failed!');
    }
}

module.exports = {
    'addUser': addUser,
    'checkLogin': checkLogin,
    'find': find,
    'findByUsername': findByUsername,
    'findByName': findByName
}