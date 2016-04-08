'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '886e10690ad4421b96ee3f53945a84cd';

var DesiredTripStore = require('../stores/DesiredTripStore');

module.exports = {

	getTrips: function(dateTime) {
		var actionType = "GET_TRIPS";
		console.log(dateTime);
		var trip = DesiredTripStore.get(); 
		if(!dateTime) {
			dateTime = trip.date;
		}
		else {
			actionType = "GET_LATER_TRIPS"
		}



		if(trip.from == null || trip.to == null) {
			return;
		}
		var searchForArrival;
		if(trip.timeType == 'departure') {
			searchForArrival = 0;
		}
		else {
			searchForArrival = 1;
		}
		var query = "http://api.sl.se/api2/TravelplannerV2/trip.json?key=" + apiKey;
		query = query + "&originId=" + trip.from.id + "&destId=" + trip.to.id + "&searchForArrival=" + searchForArrival;

		if(dateTime != null) {
			query = query + "&date=" + DesiredTripStore.getFormattedDate(dateTime) + "&time=" + DesiredTripStore.getFormattedTime(dateTime);
		}
		console.log(query);
		fetch(query, {method: "GET"})
	    .then((response) => response.json())
	    .then((responseData) => {
	        AppDispatcher.dispatch({actionType: actionType, state: "ready", data: responseData});
	    })
	    .done();
	},

	setTrip: function() {
		AppDispatcher.dispatch({actionType: "SET_TRIP", state: "ready", trip: trip});
	}

}
