// REQUIREMENTS
var express = require('express');
var router = express.Router();
var Yelp = require('yelp');


// API ACCESS KEY INFO
var yelp = new Yelp({
  consumer_key: 'ZTla45xrRjuLOdRhqv0I5g',
  consumer_secret: 'dyHyoBU0KmVKXgn4nIJPz78nzyY',
  token: 'mp4e4cADUhjsVNV8e3YOwyxOog1X4zZK',
  token_secret: 'FGxFB--9XIvaxFoBoD10FZOgtfs',
});


// empty object to capture lat and long from activity for nearby brunch and drinks
var activityLatLong = {};


// RANDOM ACTIVITY REQUEST 
router.get('/random', function(req, res) {

	// ACTIVITY SEARCH
	yelp.search(
		// search params
		{ category_filter: 'active', 
		  location: 'New York',
		  sort: 2,
		  limit: 10 }
		  // success
		).then(function (data) {
			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 10 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('                 BEGINNING OF ACTIVITY                ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log(data.businesses[num].location.coordinate.latitude);
	  		console.log(data.businesses[num].location.coordinate.longitude);

	  		// add lat and long of random activity to activityLatLong object for later use
	  		activityLatLong.latitude = data.businesses[num].location.coordinate.latitude;
	  		activityLatLong.longitude = data.businesses[num].location.coordinate.longitude;
	  		console.log(activityLatLong);

	  		console.log('======================================================');
			console.log('                    END OF ACTIVITY                   ');
			console.log('======================================================');

			// SET OFF BRUNCH, DRINKS, AND DINNER FUNCTIONS
			brunch(activityLatLong);
			drinks(activityLatLong);
			dinner(activityLatLong);

			// send back json data
			res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});


// SEARCH BY NEIGHBORHOOD ACTIVITY REQUEST
router.get('/neighborhood/:id', function(req, res) {
	// sending neighborhood as param
	console.log(req.params.id);

	// create variable for entire string to be entered at location
	var location = req.params.id + ', New York, NY'

	// activity search
	yelp.search(
		// search params
		{ category_filter: 'active', 
		  location: location,
		  // radius_filter: 10,
		  sort: 2,
		  limit: 10 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 10 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('         BEGINNING OF ACTIVITY BY NEIGHBORHOOD        ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('             END OF ACTIVITY BY NEIGHBORHOOD          ');
			console.log('======================================================');

			// add lat and long of random activity to activityLatLong object for later use
	  		activityLatLong.latitude = data.businesses[num].location.coordinate.latitude;
	  		activityLatLong.longitude = data.businesses[num].location.coordinate.longitude;
	  		console.log(activityLatLong);

			// SET OFF BRUNCH, DRINKS, AND DINNER FUNCTIONS
			brunch(activityLatLong);
			drinks(activityLatLong);
			dinner(activityLatLong);

			// need to figure out how to send back json data
			// res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});



// BRUNCH
var brunch = function(activityLatLong) {

	latitude = activityLatLong.latitude
	longitude = activityLatLong.longitude

	yelp.search(
		// search params
		{ term: 'brunch',
		  location: 'New York',
		  cll: latitude,longitude,
		  sort: 2,
		  limit: 10 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 10 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('                  BEGINNING OF BRUNCH                 ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                      END OF BRUNCH                   ');
			console.log('======================================================');


			// need to figure out how to send back json data
			// res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
};


// DRINKS
var drinks = function(activityLatLong) {

	latitude = activityLatLong.latitude
	longitude = activityLatLong.longitude

	yelp.search(
		// search params
		{ term: 'cocktails', 
		  cll: latitude,longitude,
		  sort: 2,
		  limit: 10 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 10 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('                  BEGINNING OF DRINKS                 ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                      END OF DRINKS                   ');
			console.log('======================================================');


			// need to figure out how to send back json data
			// res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
};


// DINNER
var dinner = function(activityLatLong) {

	latitude = activityLatLong.latitude
	longitude = activityLatLong.longitude

	yelp.search(
		// search params
		{ term: 'dinner', 
		  cll: latitude,longitude,
		  sort: 2,
		  limit: 10 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 10 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('                  BEGINNING OF DINNER                 ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                      END OF DINNER                   ');
			console.log('======================================================');


			// need to figure out how to send back json data
			// res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
};



// MODULE.EXPORTS
module.exports = router;













































