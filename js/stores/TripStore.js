'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _trips = {};

var setTrips = function(trips) {
	_trips = trips;
}

var TripStore = assign({}, EventEmitter.prototype, {
  
  getAll: function() {
    return _trips;
  },

  getTrip: function(idx) {
  	return _trips[idx];
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
    	console.log("in store");
      // TODO: Fixa en check om tomt
      setTrips(payload.data);
   	  TripStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TripStore;