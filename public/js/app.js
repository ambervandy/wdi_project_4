var app = angular.module('weekendApp', []);

// USER CONTROLLER
app.controller('userController', ['$http', '$scope', function($http, $scope) {

	// variable for this to use
	var self = this;


	// get data for all users
	$http.get('/users').then(
		// success
		function(response) {
			self.users = response.data;
		}, 
		// error
		function() {
			console.log("ERROR");
		}
	);



}]); // <--------------------------------------------------------------------- END OF CONTROLLER