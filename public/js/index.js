console.log("This works!");

// global variables
var startingCoordinates = '';
var directionDisplay;
var directionsService;
var map;


$(function() {

	var startPos;
	var geoOptions = {
		timeout: 10 * 1000
	}

	var geoSuccess = function(position) {
		startPos = position;
		startingCoordinates = startPos.coords.latitude + ',' + startPos.coords.longitude;
		console.log(startingCoordinates);
	};

	navigator.geolocation.getCurrentPosition(geoSuccess);

});



window.initMap = function() {
    var directionsService = new google.maps.DirectionsService();
	    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: {lat: 40.7445086, lng: -73.9987273}
  	});

  	directionsDisplay.setMap(map);

	document.getElementById('getDirections').addEventListener('click', function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	});
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {

	// create array for all locations
	var waypts = [];

	// get middle locations
	var brunch = document.getElementById('brunchAddress').value;
	var activity = document.getElementById('activityAddress').value;
	var drinks = document.getElementById('drinksAddress').value;
	var dinner = document.getElementById('dinnerAddress').value;

	// push into waypoints object
	waypts.push({location: brunch, stopover: true});
	waypts.push({location: activity, stopover: true});
	waypts.push({location: drinks, stopover: true});
	// waypts.push({location: dinner, stopover: true});

	console.log(waypts);
	console.log(startingCoordinates);

	directionsService.route({
	    origin: startingCoordinates,
	    destination: document.getElementById('dinnerAddress').value,
	    waypoints: waypts,
	    optimizeWaypoints: false,
	    travelMode: google.maps.TravelMode.WALKING
	}, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	      var route = response.routes[0];
	      // var summaryPanel = document.getElementById('directions-panel');
	      // summaryPanel.innerHTML = '';
	      // // For each route, display summary information.
	      // for (var i = 0; i < route.legs.length; i++) {
	      //   var routeSegment = i + 1;
	      //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
	      //       '</b><br>';
	      //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
	      //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
	      //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
	      // }
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });
}






















