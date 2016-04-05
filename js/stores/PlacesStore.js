const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

var searchedPlaces = [];
var searchState = "ready";

var PlacesStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return searchedPlaces;
  },

  getState: function() {
    return searchState;
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

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    
    case "SEARCH_PLACES":
      if(!action.state) {
        break;
      }
      searchState = action.state;

      if(action.state === "ready") {
        searchedPlaces = action.data.ResponseData;
      }
      PlacesStore.emitChange();
      break;

    default:

  }

});

module.exports = PlacesStore;
