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


// RANDOM ACTIVITY REQUEST 
router.get('/random', function(req, res) {

	// ACTIVITY SEARCH
	yelp.search(
		// search params
		{ category_filter: 'fleamarkets,walkingtours,parks,amusementparks,aquariums,archery,battingcages,beaches,bowling,challengecourses,climbing,discgolf,escapegames,gokarts,golf,hiking,lasertag,mini_golf,mountainbiking,paintball,parks,recreation,rock_climbing,skatingrinks,swimmingpools,tennis,waterparks,zoos,arcades,bingo,gardens,cabaret,casinos,farms,festivals,hauntedhouses,jazzandblues,museums,observatories,paintandsip,planetarium,hookah_bars,karaoke,artclasses,wineries,arttours,bustours,foodtours,winetours',
		  location: 'New York',
		  limit: 20 }
		  // success
		).then(function (data) {
			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 20 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('                 BEGINNING OF ACTIVITY                ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                    END OF ACTIVITY                   ');
			console.log('======================================================');

			// send back activity data
			res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});


// SEARCH BY NEIGHBORHOOD ACTIVITY REQUEST
router.get('/neighborhood/:id', function(req, res) {

	// create variable for entire string to be entered at location
	var location = req.params.id + ', New York, NY'

	// activity search
	yelp.search(
		// search params
		{ category_filter: 'fleamarkets,walkingtours,parks,amusementparks,aquariums,archery,battingcages,beaches,bowling,challengecourses,climbing,discgolf,escapegames,gokarts,golf,hiking,lasertag,mini_golf,mountainbiking,paintball,parks,recreation,rock_climbing,skatingrinks,swimmingpools,tennis,waterparks,zoos,arcades,bingo,gardens,cabaret,casinos,farms,festivals,hauntedhouses,jazzandblues,museums,observatories,paintandsip,planetarium,hookah_bars,karaoke,artclasses,wineries,arttours,bustours,foodtours,winetours', 
		  location: location,
		  sort: 2,
		  limit: 20 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 20 + 1);
			console.log(num)

			console.log('======================================================');
			console.log('         BEGINNING OF ACTIVITY BY NEIGHBORHOOD        ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('             END OF ACTIVITY BY NEIGHBORHOOD          ');
			console.log('======================================================');

	  		// send back activity data
			res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});



// BRUNCH ROUTE
router.get('/brunch/:id', function(req, res) {

	console.log(req.params.id);

	yelp.search(
		// search params
		{ 	term: 'brunch',
		  	location: req.params.id,
		  	radius_filter: 800,
		  	sort: 2,
		  	limit: 20 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var total = data.businesses.length

			if (total < 20) {
				var num = Math.floor(Math.random() * total + 1);
			}
			else {
				var num = Math.floor(Math.random() * 20 + 1);
			}

			console.log('======================================================');
			console.log('                  BEGINNING OF BRUNCH                 ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                      END OF BRUNCH                   ');
			console.log('======================================================');

			// send back brunch data
			res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});


// DRINKS
router.get('/drinks/:id', function(req, res) {	

	yelp.search(
		// search params
		{ 	term: 'bars',
		  	location: req.params.id,
		  	radius_filter: 800,
		  	sort: 2,
		  	limit: 20 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var total = data.businesses.length

			if (total < 20) {
				var num = Math.floor(Math.random() * total + 1);
			}
			else {
				var num = Math.floor(Math.random() * 20 + 1);
			}

			console.log('======================================================');
			console.log('                  BEGINNING OF DRINKS                 ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                      END OF DRINKS                   ');
			console.log('======================================================');

			// send back drinks data
			res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});


// DINNER
router.get('/dinner/:id', function(req, res) {	

	yelp.search(
		// search params
		{ 	term: 'dinner',
		  	location: req.params.id,
		  	radius_filter: 800,
		  	sort: 2,
		  	limit: 20 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var total = data.businesses.length

			if (total < 20) {
				var num = Math.floor(Math.random() * total + 1);
			}
			else {
				var num = Math.floor(Math.random() * 20 + 1);
			}

			console.log('======================================================');
			console.log('                  BEGINNING OF DINNER                 ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                      END OF DINNER                   ');
			console.log('======================================================');

			// send back dinner data
			res.send(data.businesses[num]);

		})
		.catch(function (err) {
	  		console.error(err);
	});
});



// MODULE.EXPORTS
module.exports = router;










































