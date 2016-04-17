'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '886e10690ad4421b96ee3f53945a84cd';

var DesiredTripStore = require('../stores/DesiredTripStore');

module.exports = {

	getTrips: function(dateTime, getEarlierTrips = false) {
		var actionType = "GET_TRIPS";
		var searchForArrival = 0;
		var numTrips = 6;
		var trip = DesiredTripStore.get(); 
		if(!dateTime) {
			numTrips = 5;
			dateTime = trip.date;
			if(trip.timeType == 'departure') {
				searchForArrival = 0;
			}
			else {
				searchForArrival = 1;
			}
		}
		else if(getEarlierTrips) {
			actionType = "GET_EARLIER_TRIPS";
			searchForArrival = 1;
		}
		else {
			actionType = "GET_LATER_TRIPS";
		}



		if(trip.from == null || trip.to == null) {
			return;
		}


		var query = "http://api.sl.se/api2/TravelplannerV2/trip.json?key=" + apiKey;
		var origin = "";
		if(trip.from.id != 0) {
			origin = "&originId=" + trip.from.id;
		}
		else {
			origin = "&originCoordName=" + encodeURIComponent(trip.from.name) + "&originCoordLong=" + trip.from.lon + "&originCoordLat=" + trip.from.lat;

		}
		var destination = ""
		if(trip.to.id != 0) {
			destination = "&destId=" + trip.to.id;
		}
		else {
			destination = "&destCoordName=" + encodeURIComponent(trip.to.name) + "&destCoordLong=" + trip.to.lon + "&destCoordLat=" + trip.to.lat;;
		}
		query = query + origin + destination + "&searchForArrival=" + searchForArrival + "&numTrips=" + numTrips;

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
