var app = angular.module('weekendApp', []);

// USER CONTROLLER
app.controller('userController', ['$http', '$scope', function($http, $scope) {

	// VAR FOR THIS
	var self = this;


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
			self.brunch = response.data.brunch;
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
			self.drinks = response.data.drinks;
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
			self.dinner = response.data.dinner;
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};

	


}]); // <--------------------------------------------------------------------- END OF CONTROLLER











































