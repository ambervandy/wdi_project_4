// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');


// SHOW ALL USERS (JSON FOR TESTING)
router.get('/', function(req, res) {
	// check if user is logged in
	res.locals.login = req.isAuthenticated();
	// find all users
	User.find({}, function(err, data) {
		// send back json data
		res.json(data);
	});
});


// NEW / SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/'}), function(req, res){
    console.log("USER STUFF HERE   " + req.user);
    res.send(req.user);
});


// LOGIN
router.post('/login', passport.authenticate('local-login'), function(req, res){
    res.send(req.user);
});


// IS LOGGED IN
router.get('/isLoggedIn', function(req, res) {
	if(req.isAuthenticated() == true) {
		res.send(req.user);
	}
	else {
		console.log("not logged in");
		res.send("not logged in");
	}
});


// EDIT USER PROFILE????


// DELETE DAY


// LOGOUT
router.get('/logout', function(req, res) {
	console.log("Logging out!");
	// log user out
	req.session.destroy();
	req.user = null;
	res.send(req.user);
});


// SHOW USER


// ADD DAY TO USER'S DAY ARRAY


// MIDDLEWARE TO CHECK LOGIN STATUS
function isLoggedIn(req, res, next) {
    console.log('isLoggedIn middleware');     
    if (req.isAuthenticated()) {
        console.log("successful login!")
        return next(); 
    } else {      
        console.log("BAD LOGIN")
        res.redirect('/');
    }
};


// MODULE.EXPORTS
module.exports = router;































