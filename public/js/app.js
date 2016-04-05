var app = angular.module('weekendApp', ['ngAnimate']);

// USER CONTROLLER
app.controller('userController', ['$http', '$scope', function($http, $scope) {

	// VAR FOR THIS
	var self = this;

	// SHOW LOGIN FORM FIRST
	this.displayForm = true;

	// NO DISPLAY EDIT FORM UNTIL PRESS EDIT BUTTON
	this.userEdit = false;

	// HIDE ITINERARY UNTIL WANTED
	this.itinerary = false;

	// HIDE MAP UNTIL WANTED
	this.map = false;

	// HIDE USER DAYS UNTIL WANTED
	this.days = false;

	// HIDE SINGLE DAY UNTIL WANTED
	this.displaySingleDay = false;

	// HIDE BACK TO TODAY UNLESS WE'VE GOTTEN A SINGLE DAY
	this.weGotDay = false;

	// NO CLASS
	// this.getFirstDay = false;

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
			// ctrl.getDay is true
			self.getDay = true;
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
			// ctrl.getDay is true
			self.getDay = true;

			// self.getFirstDay = true;
		},
		function(err) {
			// make login error true to change class
	    	self.loginError = true;
			// create variable for element with login-status id
			var box = document.getElementById('login-status');
			// add text to p tag
	    	box.innerHTML = "Incorrect username or password";
		});
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
				// ctrl.getDay is true
				self.getDay = true;
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
			self.loginData.email = null;
			self.loginData.password = null;
			self.signUpData.password = null;
			self.signUpData.email = null;
			self.signUpData.username = null;
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
			// we got day is true
			self.weGotDay = true;

			// get lat,lng for brunch, drinks, dinner
			var lat = response.data.location.coordinate.latitude;
			var lng = response.data.location.coordinate.longitude;
			coordinates = lat + "," + lng;

			// invoke brunch, drinks, dinner
			self.getBrunch(coordinates);
			self.getDrinks(coordinates);
			self.getDinner(coordinates);
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
			// we got day is true
			self.weGotDay = true;

			// get lat,lng to pass to brunch, drinks, and dinner
			var lat = response.data.location.coordinate.latitude;
			var lng = response.data.location.coordinate.longitude;
			coordinates = lat + "," + lng;

			// invoke brunch, drinks, dinner functions
			self.getBrunch(coordinates);
			self.getDrinks(coordinates);
			self.getDinner(coordinates);
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	// YELP GET REQUEST - BRUNCH
	this.getBrunch = function(coordinates) {

		console.log(coordinates);

		$http({
			method: 'GET',
			url: '/yelp/brunch/' + coordinates,
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
	this.getDrinks = function(coordinates) {

		$http({
			method: 'GET',
			url: '/yelp/drinks/' + coordinates,
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
	this.getDinner = function(coordinates) {

		$http({
			method: 'GET',
			url: '/yelp/dinner/' + coordinates,
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
			// push to days without reloading
			$scope.ctrl.single.days.push(response.data);
			// SOMETHING CSS NEEDS TO HAPPEN WHEN YOU ADD A DAY TO USER DAYS
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};



	// DELETE DAY FROM USER DAYS
	this.deleteDay = function(item, index) {
		console.log("delete is working");
		console.log(item);
		console.log(index);
		$http({
			method: 'DELETE',
			url: '/users/delete/' + item._id,
			data: item
		}).then(
		// success
		function(response) {
			console.log($scope);
			// splice from scope
			$scope.ctrl.single.days.splice(index, 1);
		});
	};


	// FACEBOOK SHARE BUTTON
	this.shareMe = function(item) {
		console.log(item.activity.url);
		FB.ui({
			method: 'share',
			href: item.activity.url,
			}, function(response){
				console.log('shared!');
			});
	};



	// EDIT USERNAME OR EMAIL
	this.submitEdit = function() {
		$http({
			method: 'POST',
			url: '/users/edit',
			data: this
		}).then(
		// success
		function(response){
			console.log(response);
			console.log($scope);
			$scope.ctrl.single.username = response.data.username;
			$scope.ctrl.single.email = response.data.email;
			self.userEdit = false;
			self.getDay = true;
		},
		// err
		function(err){
			console.log(err)
		});
	};


	// DELETE USER
	this.deleteUser = function() {
		$http({
			method: 'DELETE',
			url: '/users/' + userObj.id,
			data: this
		}).then(
		// success
		function(response) {
			console.log('DELETED');
			self.userEdit = false;
			self.user = false;
			self.logout();
		});
	};


	// SHOW LOGIN OR SIGN UPFORM
	this.formShow = function() {
		this.displayForm = !this.displayForm;
	};


	// DISPLAY ITINERARY
	this.displayItinerary = function() {
		console.log("displayItinerary is running!");
		// show itinerary
		this.itinerary = true;
		// hide getDay
		this.getDay = false;
	};


	// SHOW MAP
	this.getMap = function() {
		console.log('GET MAP FUNCTION IS RUNNING');
		// hide itinerary
		this.itinerary = !this.itinerary;
		// show map
		this.map = !this.map;
	};


	// GET NEIGHBORHOOD FORM
	this.getNeighborhoodForm = function() {
		console.log('button form is working!');
		this.choose_neighborhood = !this.choose_neighborhood;
	};


	// SHOW EDIT FORM
	this.editProfile = function() {
		this.userEdit = !this.userEdit;
		this.displaySingleDay = false;
		this.map = false;
		this.itinerary = false;
		this.days = false;
		this.getDay = false;
	};


	// BACK TO GET DAY FORM
	this.getNew = function() {
		this.getDay = true;
		this.map = false;
		this.itinerary = false;
		this.days = false;
		this.displaySingleDay = false;
	};


	// BACK TO LOGIN ON LOGOUT
	this.toLogIn = function() {
		this.getDay = false;
		this.getMap = false;
		this.itinerary = false;
		this.days = false;
		this.user = false;
		this.displaySingleDay = false;
		this.loginData.email = '';
		this.loginData.password = '';
	};


	// GET ALL USER DAYS
	this.getAllDays = function() {
		this.userEdit = false;
		this.getDay = false;
		this.getMap = false;
		this.map = false;
		this.itinerary = false;
		this.displaySingleDay = false;
		this.days = true;
	};


	// SHOW SPECIFIC DAY
	this.getSingleDay = function(input) {
		console.log(input);
		console.log(input._id);
		$http({
			method: "GET",
			url: '/users/days/' + input._id
		}).then(
		// success
		function(response) {
			console.log(response);
			self.singleDay = response.data;
			// hide days list
			self.days = false;
			// display single day
			self.displaySingleDay = true;
		});
	};


	// GO BACK TO TODAY'S DAY
	this.today = function() {
		console.log("this.today is running");
		console.log(dayObj);
		this.displaySingleDay = false;
		this.days = false;
		this.itinerary = true;
	};
 
	


}]); // <--------------------------------------------------------------------- END OF CONTROLLER











































