'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _trips = [];

var setTrips = function(trips) {
	_trips = trips.TripList.Trip;
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
	var trip = _trips[0];
	var destination;
	if(!Array.isArray(trip.LegList.Leg)) {
		destination = trip.LegList.Leg.Destination.name;
	}
	else {
		console.log(trip);
		destination = trip.LegList.Leg[trip.LegList.Leg.length-1].Destination.name;
	}
	return destination;
  },

  getOrigin: function() {
  	if(_trips.length < 1) {
  		return
  	}
  	var trip = _trips[0];
  	var origin;
  	if(!Array.isArray(trip.LegList.Leg)) {
		origin = trip.LegList.Leg.Origin.name;
	}
	else {
		origin = trip.LegList.Leg[0].Origin.name;
	}
	return origin;
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

    default:
      // no op
  }
});

module.exports = TripStore;