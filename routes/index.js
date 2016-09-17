var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/addUser', function (req, res) {
    res.render('addUser', { title: 'Create new user' });
});
module.exports = router;