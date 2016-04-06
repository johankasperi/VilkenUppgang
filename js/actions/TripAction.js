'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '4e98a09b8fe84f1589922ae73098b946';

module.exports = {

	getTrip: function(from, to, date, time, searchForArrival = 0) {
		if(from == null || to == null) {
			return;
		}
		var query = "http://api.sl.se/api2/TravelplannerV2/trip.json?key=" + apiKey;
		query = query + "&originId=" + from + "&destId=" + to + "&searchForArrival=" + searchForArrival;
		if(date != null && time != null) {
			query = query + "&date=" + date + "&time=" + time;
		}
		fetch(query, {method: "GET"})
	    .then((response) => response.json())
	    .then((responseData) => {
	        AppDispatcher.dispatch({actionType: "GET_TRIP", state: "ready", data: responseData});
	    })
	    .done();

	}

}
