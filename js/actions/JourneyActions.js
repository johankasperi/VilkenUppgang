'use strict';

module.exports = {

	getJourney: function(ref) {
		var query = "http://api.sl.se/api2/TravelplannerV2/trip.json?key=" + apiKey + "&" + ref;
		console.log(query);
		fetch(query, {method: "GET"})
	    .then((response) => response.json())
	    .then((responseData) => {
	    		var trips = getCorrectFormat(responseData);
	    		for(var i = 0; i < trips.length; i++) {
	    			trips[i] = getExitInfo(trips[i]);
	    		}
	        AppDispatcher.dispatch({actionType: actionType, state: "ready", data: trips});
	    })
	    .done();
	}
	
}