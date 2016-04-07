const _ = require('underscore');
const AsyncStorage = require('react-native').AsyncStorage;
const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';
const FAVORITES_STORAGE_KEY = '@VilkenUppgang:favoritePlaces';

var searchedPlaces = [];
var searchState = "ready";
var favorites = [];

function loadFavorites(callback) {
  AsyncStorage.getItem(FAVORITES_STORAGE_KEY, function(error, result) {
    if(result !== null) {
      favorites = JSON.parse(result);
      callback();
    }
  });
}

function addFavorite(data) {
  var exists = _.some(favorites, function(item){ return item.id === data.id; });
  console.log(exists);
  if(!exists) {
    favorites.push(data);
    saveFavorites();
  }
}

function removeFavorite(data) {
  favorites = _.reject(favorites, function(item){ return item.id === data.id; });
  saveFavorites();
}

function saveFavorites() {
  AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites), function(error) {});
}

var PlacesStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return searchedPlaces;
  },

  getState: function() {
    return searchState;
  },

  getFavorites: function() {
    return favorites;
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
  var favorite;

  switch(action.actionType) {

    case "SEARCH_PLACES":
      searchState = action.state;

      if(action.state === "ready") {
        searchedPlaces = action.data;
      }
      else if(action.state === "destroy") {
        searchedPlaces = [];
      }
      PlacesStore.emitChange();
      break;

    case "LOAD_FAVORITES":
      loadFavorites(function() {
        PlacesStore.emitChange();
      });
      break;

    case "ADD_FAVORITE":
      favorite = action.favorite;
      if(favorite.id && favorite.name) {
        addFavorite(favorite);
      }
      PlacesStore.emitChange();
      break;

    case "REMOVE_FAVORITE":
      favorite = action.favorite;
      if(favorite.id && favorite.name) {
        removeFavorite(favorite);
      }
      PlacesStore.emitChange();
      break;
    default:

  }

});

module.exports = PlacesStore;
