console.log("This works!");


// DYNAMICALLY ADDING THE GOOGLE MAPS API SCRIPT TO HEADER
function loadAPI() {


	// make sure the map is false every time we approach it
	var thisMap = document.querySelector('script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUEpj1aqPq0_0wU5s1SQGf5B-382gVGKA&callback=initMap"]');
	if (thisMap) {
		console.log('it exists already!');
		thisMap = null;
		console.log(thisMap);
	}
	else {
		console.log("it doesn't exist yet");
	};

	// create the script for the map
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUEpj1aqPq0_0wU5s1SQGf5B-382gVGKA&callback=initMap";
    script.type = "text/javascript";
    script.setAttribute("id", "mapScript");
    document.getElementsByTagName("head")[0].appendChild(script);
};



// GLOBAL VARIABLES
var startingCoordinates = '';
var directionDisplay;
var directionsService;
var map;




// GET CURRENT LOCATION OF USER
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




// FIRE INIT MAP
window.initMap = function() {
    var directionsService = new google.maps.DirectionsService();
	    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: {lat: 40.7445086, lng: -73.9987273}
  	});

  	directionsDisplay.setMap(map);

	// document.getElementById('getDirections').addEventListener('click', function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	// });
};




// CALC AND DISPLAY ROUTE
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



// RELOAD PAGE ON LOGOUT
var reload = function() {
	window.location.reload(true); 
};




// CHANGE SAVE DAY BUTTON AFTER SAVING A DAY
var saveDay = function() {
	console.log("clicked!");
	$('#saveButton').css({ "background-color": "#bd586c", "border-color": "#bd586c" }).text("SAVED");
}
















