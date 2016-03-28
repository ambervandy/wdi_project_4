var app = angular.module('weekendApp', []);

// USER CONTROLLER
app.controller('userController', ['$http', '$scope', function($http, $scope) {

	// variable for this to use
	var self = this;


	// get data for all users
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
			console.log(response.data)
		},
		// error
		function(err) {
			console.log("ERROR");
		});
	};


	


}]); // <--------------------------------------------------------------------- END OF CONTROLLER











































