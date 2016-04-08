'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '886e10690ad4421b96ee3f53945a84cd';

var DesiredTripStore = require('../stores/DesiredTripStore');

module.exports = {

	getTrips: function() {
		var trip = DesiredTripStore.get();

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
		if(trip.date != null) {
			query = query + "&date=" + DesiredTripStore.getFormattedDate() + "&time=" + DesiredTripStore.getFormattedTime();
		}
		console.log(query);
		fetch(query, {method: "GET"})
	    .then((response) => response.json())
	    .then((responseData) => {
	        AppDispatcher.dispatch({actionType: "GET_TRIPS", state: "ready", data: responseData});
	    })
	    .done();
	},

	setTrip: function() {

		console.log("in set trip");
		var trip = 
			{
				"dur": "4",
				"chg": "0",
				"co2": "0.00",
				"LegList": {
					"Leg": {
						"idx": "0",
						"name": "tunnelbanans röda linje 13",
						"type": "METRO",
						"dir": "Ropsten",
						"line": "13",
						"Origin": {
							"name": "Slussen",
							"type": "ST",
							"id": "400102011",
							"lon": "18.071491",
							"lat": "59.319511",
							"routeIdx": "18",
							"time": "14:01",
							"date": "2016-04-06"
						},
						"Destination": {
							"name": "T-Centralen",
							"type": "ST",
							"id": "400101051",
							"lon": "18.061486",
							"lat": "59.331358",
							"routeIdx": "20",
							"time": "14:05",
							"date": "2016-04-06"
						},
						"JourneyDetailRef": {
							"ref": "ref%3D133539%2F48987%2F94758%2F2871%2F74%3Fdate%3D2016-04-06%26station_evaId%3D400102011%26station_type%3Ddep%26lang%3Dsv%26format%3Djson%26"
						},
						"GeometryRef": {
							"ref": "ref%3D133539%2F48987%2F94758%2F2871%2F74%26startIdx%3D18%26endIdx%3D20%26lang%3Dsv%26format%3Djson%26"
						}
					}
				},
				"PriceInfo": {
					"TariffZones": {
						"$": "A"
					},
					"TariffRemark": {
						"$": "2 biljett"
					}
				}
			};
		AppDispatcher.dispatch({actionType: "SET_TRIP", state: "ready", trip: trip});
	}

}
