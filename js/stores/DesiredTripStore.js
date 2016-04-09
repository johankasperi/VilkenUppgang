const _ = require('underscore');
const AsyncStorage = require('react-native').AsyncStorage;
const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';
const TRIPS_STORAGE_KEY = '@VilkenUppgang:searchedTrips';

var desiredTrip = {
  id: null,
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
};

var storedTrips = [];

function setFrom(from) {
  desiredTrip.from = from;
}

function setTo(to) {
  desiredTrip.to = to;
}

function setDate(date) {
  desiredTrip.date = date;
}

function setTimeType(timeType) {
  desiredTrip.timeType = timeType;
}

function destroy() {
  desiredTrip = {
    id: null,
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
  };
}

function setFromStorage(id) {
  if(id < storedTrips.length) {
    setFrom(storedTrips[id].from);
    setTo(storedTrips[id].to);
  }
}

function loadTrips(callback) {
  AsyncStorage.getItem(TRIPS_STORAGE_KEY, function(error, result) {
    if(result !== null) {
      storedTrips = JSON.parse(result);
      callback();
    }
  });
}

function saveTrips() {
  desiredTrip.id = storedTrips.length - 1;
  storedTrips.push(desiredTrip);
  AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(storedTrips), function(error) {});
}

var DesiredTripStore = assign({}, EventEmitter.prototype, {

  get: function() {
    return desiredTrip;
  },

  getAllStored: function() {
    return storedTrips;
  },

  getFormattedDate: function() {
    var year = desiredTrip.date.getFullYear();
    var month = desiredTrip.date.getMonth()+1;
    month = month > 9 ? month : "0" + month.toString();
    var day = desiredTrip.date.getDate();
    day = day > 9 ? day : "0" + day.toString();
    return year + '-' + month + '-' + day;
  },

  getFormattedTime: function() {
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
  var id, from, to, date, time, timeType;

  switch(action.actionType) {
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
      id = null;
      from = null;
      to = null;
      date = null;
      time = null;
      timeType = null
      destroy();
      DesiredTripStore.emitChange();
      break;

    case "DESIRED_TRIP_SETFROMSTORAGE":
      id = action.id;
      if(id !== null) {
        setFromStorage(id);
        DesiredTripStore.emitChange();
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
  }

});

module.exports = DesiredTripStore;
