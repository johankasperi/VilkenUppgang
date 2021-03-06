'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TripActions = require('../actions/TripActions');

var CHANGE_EVENT = 'change';

var _trips = [];

var setTrips = function(trips) {
	_trips = trips;
}

var appendTrips = function(trips) {
  trips.shift();
	_trips.push.apply(_trips, trips);
}

var prependTrips = function(trips) {
  trips.pop();
  trips.push.apply(trips, _trips);
  _trips = trips;
}

var setTrip = function(trip, idx) {
  _trips[idx] = trip;
}

var setCoordinates = function(tripId, legId, coordinates) {
  console.log(_trips[tripId]);
  _trips[tripId].LegList.Leg[legId]["GeometryPoints"] = coordinates.Geometry.Points;
}

var addExit = function(exitData) {
  var trip = _trips[exitData.tripId];
  trip.LegList.Leg[trip.LegList.Leg.length - 2].exitInfo = exitData.exit;
}

var getUTCDate = function(date, time) {
    date = date.split("-");
    var year = parseInt(date[0]);
    var month = date[1]-1;
    var day = parseInt(date[2]);
    time = time.split(":");
    var hours = parseInt(time[0]);
    var minutes = parseInt(time[1]);
    var d = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0));
    d.setTime( d.getTime() + new Date().getTimezoneOffset()*60*1000 );
    return d;
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
    var dateTime = getUTCDate(date, time);
    return dateTime;
  },

  getLastDeparture: function() {
  	if(_trips.length < 1) {
  		return
  	}
  	var lastTrip = _trips[_trips.length-1].LegList.Leg;
  	var date = lastTrip[0].Origin.date;
    var time = lastTrip[0].Origin.time;
    var dateTime = getUTCDate(date, time);
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

    case "SET_EXIT":
      // TODO: Fixa en check om tomt
      addExit(payload.data);
      TripStore.emitChange();
      break;

    case "GET_COORDINATES":
      // TODO: Fixa en check om tomt
      setCoordinates(payload.tripId, payload.legId, payload.data);
      TripStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TripStore;