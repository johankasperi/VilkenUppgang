'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _trips = [];

var setTrips = function(trips) {
	_trips = getCorrectFormat(trips);
}

var appendTrips = function(trips) {
	_trips.push.apply(_trips, getCorrectFormat(trips));
	console.log(_trips);
}

var prependTrips = function(trips) {
  trips = getCorrectFormat(trips);
  trips.push.apply(trips, _trips);
  _trips = trips;
}

var getCorrectFormat = function(trips) {
	trips = trips.TripList.Trip;
	for(var i=0;i<trips.length;i++) {
		var trip = [];
		if(!Array.isArray(trips[i].LegList.Leg)) {
			trip.push(trips[i].LegList.Leg)
		}
		else {
			trip = trips[i].LegList.Leg;
		}
		trips[i].LegList.Leg = trip;
	}
	return trips;
}

var TripStore = assign({}, EventEmitter.prototype, {
  
  getAll: function() {
    return _trips;
  },

  getTrip: function(idx) {
  	return _trips[idx];
  },

  getDestination: function() {
  	if(_trips.length < 1) {
  		return
  	}
	return _trips[0].LegList.Leg[_trips[0].LegList.Leg.length-1].Destination.name;
  },

  getOrigin: function() {
  	if(_trips.length < 1) {
  		return
  	}
	return _trips[0].LegList.Leg[0].Origin.name;
  },

  getFirstArrival: function() {
    if(_trips.length < 1) {
      return
    }
    var firstTrip = _trips[0].LegList.Leg;
    var date = firstTrip[firstTrip.length-1].Destination.date;
    var time = firstTrip[firstTrip.length-1].Destination.time;
    var dateTime = new Date(date + ' ' + time + ':00');
    return dateTime;
  },

  getLastDeparture: function() {
  	if(_trips.length < 1) {
  		return
  	}
  	var lastTrip = _trips[_trips.length-1].LegList.Leg;
  	var date = lastTrip[0].Origin.date;
  	var time = lastTrip[0].Origin.time;
  	var dateTime = new Date(date + ' ' + time + ':00');
  	return dateTime;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {

  switch(payload.actionType) {

    case "GET_TRIPS":
      // TODO: Fixa en check om tomt
      setTrips(payload.data);
   	  TripStore.emitChange();
      break;

    case "GET_LATER_TRIPS":
      // TODO: Fixa en check om tomt
      appendTrips(payload.data);
   	  TripStore.emitChange();
      break;

    case "GET_EARLIER_TRIPS":
      // TODO: Fixa en check om tomt
      prependTrips(payload.data);
      TripStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TripStore;