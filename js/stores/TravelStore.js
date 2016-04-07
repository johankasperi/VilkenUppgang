'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var travels = {
  from: 'Hogdalen',
  to: null,
  arrivalTime: null,
  departureTime: null
};

var setTravel = function(obj) {
	travel = obj;
}

var TravelStore = assign({}, EventEmitter.prototype, {
  
  get: function() {
    return travel;
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

    case "setTravel":
      if (payload.travel !== '') {
        setTravel(payload.travel);
        TodoStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = TravelStore;