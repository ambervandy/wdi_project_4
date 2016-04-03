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
	// redirect if failed new user
    failureRedirect: '/'}), function(req, res){
    console.log("USER STUFF HERE   " + req.user);
    // send back user data
    res.send(req.user);
});


// LOGIN
router.post('/login', passport.authenticate('local-login'), function(req, res){
	// send back user data
    res.send(req.user);
});


// IS LOGGED IN
router.get('/isLoggedIn', function(req, res) {
	// if user is authenticated
	if(req.isAuthenticated() == true) {
		console.log("USER IS LOGGED IN");
		// send back user data
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
	// find the user
	User.findById(req.user.id, function(err, data) {
		// fulfill each model requirement and save
		data.username = req.body.editData.username;
		data.email = req.body.editData.email;
		data.save();
		// send back user data
		res.send(data);
	});
});



// LOGOUT
router.get('/logout', function(req, res) {
	console.log("Logging out!");
	// log user out
	req.session.destroy();
	// no user data
	req.user = null;
	// sends back null
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
	// fulfills all day model requirements
	newDay.brunch = req.body.brunch;
	newDay.drinks = req.body.drinks;
	newDay.dinner = req.body.dinner;
	newDay.activity = req.body.activity;
	// create a date field with today's date
	newDay.date = new Date();
	// save day
	newDay.save();
	// find user and push newDay into days and save
	User.findById(req.params.id, function(err, data) {
		data.days.push(newDay);
		data.save();
		// send back day
		res.send(newDay);
	});
});



// GET SINGLE DAY
router.get('/days/:id', function(req, res) {
	console.log("DAY ID: ", req.params.id);
	// find the day by params
	Day.findById(req.params.id, function(err, data) {
		// send back day
		res.send(data);
	});
});	



// DELETE DAY FROM USER DAYS
router.delete('/delete/:id', function(req, res) {
	console.log("REQ.USER: ", req.user);
	console.log(req.user.id);
	console.log("REQ.PARAMS: ",req.params.id);
	// find the user by params
	User.findById(req.user.id, function(err, user) {
		// if params = the user id from all users then splice from users
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
	// find users
	User.findByIdAndRemove(req.params.id, function(err, user) {
		console.log('DELETED');
		// send back nothing
		res.send('deleted!');
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































