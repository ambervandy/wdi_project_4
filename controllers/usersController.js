// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');


// SHOW ALL USERS (JSON FOR TESTING)
router.get('/', function(req, res) {
	// find all users
	User.find({}, function(err, data) {
		// send back json data
		res.json(data);
	});
});


// NEW / SIGNUP

// LOGIN

// IS LOGGED IN

// EDIT USER PROFILE????

// DELETE DAY

// LOGOUT

// SHOW USER

// ADD DAY TO USER'S DAY ARRAY

// MIDDLEWARE TO CHECK LOGIN STATUS


// MODULE.EXPORTS
module.exports = router;































