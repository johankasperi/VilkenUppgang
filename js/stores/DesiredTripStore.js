const _ = require('underscore');
const AsyncStorage = require('react-native').AsyncStorage;
const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';
const TRIPS_STORAGE_KEY = '@VilkenUppgang:searchedTrips';

var desiredTrips = [];
var storedDesiredTrips = [];
var activeTripIndex = null;

function create() {
  desiredTrips.push({
    id: desiredTrips.length,
    from: {
      name: null,
      id: null
    },
    to: {
      name: null,
      id: null
    },
    date: new Date(),
    timeType: "departure",
  });
  activeTripIndex = desiredTrips.length - 1;
}

function setFrom(from) {
  desiredTrips[activeTripIndex].from = from;
}

function setTo(to) {
  desiredTrips[activeTripIndex].to = to;
}

function setDate(date) {
  desiredTrips[activeTripIndex].date = date;
}

function setTimeType(timeType) {
  desiredTrips[activeTripIndex].timeType = timeType;
}

function destroy() {
  desiredTrips.splice(activeTripIndex, 1);
  create();
}

function loadTrips(callback) {
  AsyncStorage.getItem(TRIPS_STORAGE_KEY, function(error, result) {
    if(result !== null) {
      storedDesiredTrips = JSON.parse(result);
      callback();
    }
  });
}

function saveTrips() {
  storedDesiredTrips = desiredTrips;
  _.each(desiredTrips, function(trip) { trip.isStored = true; });
  AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(desiredTrips), function(error) {});
}

var DesiredTripStore = assign({}, EventEmitter.prototype, {

  get: function() {
    return desiredTrips[activeTripIndex];
  },

  getAll: function() {
    return desiredTrips;
  },

  getAllStored: function() {
    return storedDesiredTrips;
  },

  getFormattedDate: function() {
    var desiredTrip = desiredTrips[activeTripIndex];
    var year = desiredTrip.date.getFullYear();
    var month = desiredTrip.date.getMonth()+1;
    month = month > 9 ? month : "0" + month.toString();
    var day = desiredTrip.date.getDate();
    day = day > 9 ? day : "0" + day.toString();
    return year + '-' + month + '-' + day;
  },

  getFormattedTime: function() {
    var desiredTrip = desiredTrips[activeTripIndex];
    var hours = desiredTrip.date.getHours();
    hours = hours > 9 ? hours : "0" + hours.toString();
    var minutes = desiredTrip.date.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes.toString();
    return hours + ':' + minutes;
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
  var from, to, date, time, timeType;

  switch(action.actionType) {
    case "DESIRED_TRIP_CREATE":
      create();
      DesiredTripStore.emitChange();
      break;

    case "DESIRED_TRIP_SETFROM":
      from = action.from;
      if(from.id !== null && from.name !== null) {
        setFrom(from);
        DesiredTripStore.emitChange();
      }
      break;

    case "DESIRED_TRIP_SETTO":
      to = action.to;
      if(to.id !== null && to.name !== null) {
        setTo(to);
        DesiredTripStore.emitChange();
      }
      break;

    case "DESIRED_TRIP_SETDATE":
      date = action.date;
      if(date !== null) {
        setDate(date);
        DesiredTripStore.emitChange();
      }
      break;

    case "DESIRED_TRIP_SETTIMETYPE":
      timeType = action.timeType.trim();
      if(timeType !== null) {
        setTimeType(timeType);
        DesiredTripStore.emitChange();
      }
      break;

    case "DESIRED_TRIP_DESTROY":
      from = null;
      to = null;
      date = null;
      time = null;
      timeType = null
      destroy();
      DesiredTripStore.emitChange();
      break;

    case "DESIRED_TRIP_SETACTIVEINDEX":
      if(action.activeIndex !== null) {
        activeIndex = action.activeIndex;
      }
      break;

    case "DESIRED_TRIP_LOADSTORAGE":
      loadTrips(function() {
        DesiredTripStore.emitChange();
      });
      break;

    case "DESIRED_TRIP_SAVESTORAGE":
      saveTrips();
      break;

    default:
      console.log(action.actionType);
  }

});

module.exports = DesiredTripStore;
