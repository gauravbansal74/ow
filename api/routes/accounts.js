var express = require('express');
var router = express.Router();
var db  = require('../lib/operations');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});

router.post('/mobilecheck', function(req, res, next){
	db.getmobile(req.body.mobile, function(err, result){
		console.log();
		res.json(err||result);
	});
	
});

router.post('/setaccount', function(req, res, next){
	db.setaccount(Date.parse(new Date()), req.body.name, req.body.email, req.body.mobile, req.body.password, function(err, result){
		res.json(err||result);
	});
});

module.exports = router;
