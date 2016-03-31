var app = angular.module('weekendApp', []);

// USER CONTROLLER
app.controller('userController', ['$http', '$scope', function($http, $scope) {

	// VAR FOR THIS
	var self = this;


	// VAR FOR OPEN TABLE
	var otBrunchLink = '';
	var otDinnerLink = '';


	// CREATE EMPTY OBJECT TO HOLD USER ID
	var userObj = {};


	// CREATE EMPTY OBJECT TO HOLD DAY DATA
	var dayObj = {}; 


	// GET ALL USER DATA
	$http.get('/users').then(
		// success
		function(response) {
			console.log(response)
			self.users = response.data;
		}, 
		// error
		function() {
			console.log("ERROR");
		}
	);


	// SIGN UP
	this.signUp = function() {
		// console.log(this.signUpData);
		$http({
			method: 'POST',
			url: '/users/signup',
			data: this.signUpData
		}).then(
		// success
		function(response) {
			console.log(response);
			// user is logged in
			self.user = true;
			// variable to call in template
			self.single = response.data;
			// save user id
			userObj.id = response.data._id;
		});
	};


	// LOGIN
	this.logIn = function() {
		console.log("LOGIN function firing");
		$http({
			method: 'POST',
			url: '/users/login',
			data: this.loginData
		}).then(
		// success
		function(response) {
			console.log(response);
			// user is logged in
			self.user = true;
			// variable to call in template
			self.single = response.data;
			// save user id
			userObj.id = response.data._id;
		});
		// ADD ERROR HERE TO BOXES FOR INCORRECT LOGIN
	};


	// IS LOGGED IN
	this.getUser = function() {
		$http({
			method: 'GET',
			url: '/users/isLoggedIn'
		}).then(
		// success
		function(response) {
			// console.log(response);
			if (response.data.username != null) {
				console.log("User is logged in!");
				// user is logged in
				self.user = true;
				// variable to call in template
				self.single = response.data;
				// save user id
				userObj.id = response.data._id;
			}
			else {
				console.log("User is not logged in");
				// user is not logged in
				self.user = false;
			};
		});
	};


	// EVOKE GET USER FUNCTION ON PAGE LOAD
	this.getUser();


	// LOGOUT
	this.logout = function() {
		$http({
			method: 'GET',
			url: '/users/logout'
		}).then(
		// success
		function(response) {
			console.log("logged out!");
		});
	};


	// YELP GET REQUEST (RANDOM ACTIVITY)
	this.searchYelp = function() {
		console.log('This is working');
		$http({
			method: 'GET',
			url: '/yelp/random'
		}).then(
		// success
		function(response) {
			console.log(response.data);
			// send data to view
			self.activity = response.data
			// add activity to dayObj
			dayObj.activity = response.data;

			var address = response.data.location.display_address.join(', ');
			self.getBrunch(address);
			self.getDrinks(address);
			self.getDinner(address);
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	// YELP GET REQUEST (SEARCH BY NEIGHBORHOOD)
	this.searchByNeighb = function(input) {
		console.log(this.input);

		var param = this.input

		$http({
			method: 'GET',
			url:'/yelp/neighborhood/' + param,
		}).then(
		// success
		function(response) {
			console.log(response.data);
			// send data to view
			self.activity = response.data
			// add activity to dayObj
			dayObj.activity = response.data;

			var address = response.data.location.display_address.join(', ');
			self.getBrunch(address);
			self.getDrinks(address);
			self.getDinner(address);
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	// YELP GET REQUEST - BRUNCH
	this.getBrunch = function(address) {

		console.log(address);
		var param = address

		$http({
			method: 'GET',
			url: '/yelp/brunch/' + param,
		}).then(
		// success
		function(response) {
			console.log(response.data);
			// send data to view
			self.brunch = response.data;
			// add brunch to dayObj
			dayObj.brunch = response.data;

			// create single string for opentable link
			nameBrunch = response.data.name.split(' ').join('-');
			self.otBrunchLink = 'http://www.opentable.com/' + nameBrunch;
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	// YELP GET REQUEST - DRINKS
	this.getDrinks = function(address) {

		console.log(address);
		var param = address

		$http({
			method: 'GET',
			url: '/yelp/drinks/' + param,
		}).then(
		// success
		function(response) {
			console.log(response.data);
			// send data to view
			self.drinks = response.data;
			// add drinks to dayObj
			dayObj.drinks = response.data;
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	// YELP GET REQUEST - DINNER
	this.getDinner = function(address) {

		console.log(address);
		var param = address

		$http({
			method: 'GET',
			url: '/yelp/dinner/' + param,
		}).then(
		// success
		function(response) {
			console.log(response.data);
			// send data to view
			self.dinner = response.data;
			// add dinner to dayObj
			dayObj.dinner = response.data;

			// create single string for opentable link
			nameDinner = response.data.name.split(' ').join('-');
			self.otDinnerLink = 'http://www.opentable.com/' + nameDinner;
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	// ROUTE TO ADD DAYOBJ TO USER'S DAY ARRAY
	this.addDay = function() {
		console.log(dayObj);
		console.log(userObj);
		$http({
			method: 'PUT',
			url: '/users/' + userObj.id,
			data: dayObj
		}).then(
		// success
		function(response) {
			console.log(response);
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	


}]); // <--------------------------------------------------------------------- END OF CONTROLLER











































