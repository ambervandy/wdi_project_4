// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Day = require('../models/day.js');
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
		console.log("USER IS LOGGED IN");
		res.send(req.user);
	}
	else {
		console.log("not logged in");
		res.send("not logged in");
	}
});


// EDIT USER PROFILE
router.post('/edit', function(req, res) {
	console.log("REQ.BODY: ", req.body.editData);
	User.findById(req.user.id, function(err, data) {
		data.username = req.body.editData.username;
		data.email = req.body.editData.email;
		data.save();
		res.send(data);
	});
});



// LOGOUT
router.get('/logout', function(req, res) {
	console.log("Logging out!");
	// log user out
	req.session.destroy();
	req.user = null;
	res.send(req.user);
});


// ADD DAY TO USER'S DAY ARRAY
router.put('/:id', function(req, res) {
	console.log("THIS IS THE PUT ROUTE FOR THE DAY OBJ: ", req.body);
	console.log(req.params.id);
	// make sure user is logged in
	res.locals.usertrue = (req.user.id == req.params.id);
	// create new day and set values
	var newDay = new Day();
	newDay.brunch = req.body.brunch;
	newDay.drinks = req.body.drinks;
	newDay.dinner = req.body.dinner;
	newDay.activity = req.body.activity;
	// find user and push newDay into days
	User.findById(req.params.id, function(err, data) {
		data.days.push(newDay);
		data.save();
		res.send(newDay);
	});
});



// DELETE DAY FROM USER DAYS
router.delete('/delete/:id', function(req, res) {
	console.log("REQ.USER: ", req.user);
	console.log(req.user.id);
	console.log("REQ.PARAMS: ",req.params.id);
	User.findById(req.user.id, function(err, user) {
		for (var i = 0; i < user.days.length; i++) {
			if (user.days[i]._id == req.params.id) {
				user.days.splice(i, 1);
				user.save();
				res.send('spliced!');
			};
		};
	});
});



// DELETE USER
router.delete('/:id', function(req, res) {
	User.findByIdAndRemove(req.params.id, function(err, user) {
		console.log('DELETED');
		// can we redirect to somewhere?
	});
});



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































