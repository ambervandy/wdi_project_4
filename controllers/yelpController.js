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
// var activityLatLong = {};

// empty string containing the address of the activity
var activityAdd = '';


// RANDOM ACTIVITY REQUEST 
router.get('/random', function(req, res) {

	// ACTIVITY SEARCH
	yelp.search(
		// search params
		{ category_filter: 'fleamarkets,walkingtours,parks',
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
	  		// console.log(data.businesses[num].location.coordinate.latitude);
	  		// console.log(data.businesses[num].location.coordinate.longitude);

	  		// add lat and long of random activity to activityLatLong object for later use
	  		// activityLatLong.latitude = data.businesses[num].location.coordinate.latitude;
	  		// activityLatLong.longitude = data.businesses[num].location.coordinate.longitude;
	  		// console.log(activityLatLong);


	  		// get address for activity to add to address string
	  		activityAdd = data.businesses[num].location.display_address.join(', ');
	  		console.log(activityAdd);

	  		console.log('======================================================');
			console.log('                    END OF ACTIVITY                   ');
			console.log('======================================================');

			// SET OFF BRUNCH, DRINKS, AND DINNER FUNCTIONS
			brunch(activityAdd);
			drinks(activityAdd);
			dinner(activityAdd);

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
	  		// activityLatLong.latitude = data.businesses[num].location.coordinate.latitude;
	  		// activityLatLong.longitude = data.businesses[num].location.coordinate.longitude;
	  		// console.log(activityLatLong);

	  		// get address for activity to add to address string
	  		activityAdd = data.businesses[num].location.display_address.join(', ');
	  		console.log(activityAdd);

			// SET OFF BRUNCH, DRINKS, AND DINNER FUNCTIONS
			brunch(activityAdd);
			drinks(activityAdd);
			dinner(activityAdd);

			// need to figure out how to send back json data
			// res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});



// BRUNCH
var brunch = function(activityAdd) {
	console.log('This is the activity address: ' + activityAdd);

	yelp.search(
		// search params
		{ term: 'brunch',
		  location: activityAdd,
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
var drinks = function(activityAdd) {
	console.log('This is the activity address: ' + activityAdd);

	yelp.search(
		// search params
		{ term: 'bars',
		  location: activityAdd,
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
var dinner = function(activityAdd) {
	console.log('This is the activity address: ' + activityAdd);

	yelp.search(
		// search params
		{ term: 'dinner',
		  location: activityAdd,
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




// amusementparks,aquariums,archery,battingcages,beaches,bowling,challengecourses,climbing,discgolf,escapegames,gokarts,golf,hiking,lasertag,mini_golf,mountainbiking,paintball,parks,rafting,recreation,rock_climbing,skatingrinksswimmingpools,tenniswaterparks,zoos,arcades,fencing,galleries,bingo,gardens,cabaret,casinos,farms,festivals,hauntedhouses,jazzandblues,museums,observatories,paintandsip,planetarium,wineries,winetastingroom,hookah_bars,karaoke,artclasses,cheesetastingclasses,winetastingclasses,wineries,architecturaltours,arttours,bustours,foodtours,historicaltours,walkingtours,winetours,fleamarkets', 








































