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

	// activity search
	yelp.search(
		// search params
		{ category_filter: 'active', 
		  location: 'New York',
		  // radius_filter: 10,
		  sort: 2,
		  limit: 10 }
		  // success
		).then(function (data) {

			// getting random integer to return random business activity
			var num = Math.floor(Math.random() * 10 + 1);

			console.log('======================================================');
			console.log('                 BEGINNING OF ACTIVITY                ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('                    END OF ACTIVITY                   ');
			console.log('======================================================');

			// need to figure out how to send back json data
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

			console.log('======================================================');
			console.log('         BEGINNING OF ACTIVITY BY NEIGHBORHOOD        ');
			console.log('======================================================');
	  		console.log(data.businesses[num]);
	  		console.log('======================================================');
			console.log('             END OF ACTIVITY BY NEIGHBORHOOD          ');
			console.log('======================================================');

			// need to figure out how to send back json data
			res.send(data.businesses[num]);
		})
		.catch(function (err) {
	  		console.error(err);
	});
});




// MODULE.EXPORTS
module.exports = router;













































