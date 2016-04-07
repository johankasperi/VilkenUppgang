const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

var desiredTrip = {
  from: {
    name: null,
    id: null
  },
  to: {
    name: null,
    id: null
  },
  date: null,
  time: null,
  timeType: "departure"
};

function create(from, to, date, time, timeType) {
  desiredTrip = {
    from: from,
    to: to,
    date: date,
    time: time,
    timeType: timeType
  };
}

function setFrom(from) {
  desiredTrip.from = from;
}

function setTo(to) {
  desiredTrip.to = to;
}

function setDate(date) {
  desiredTrip.date = date;
}

function setTime(time) {
  desiredTrip.time = time;
}

function setTimeType(timeType) {
  desiredTrip.timeType = timeType;
}

function destroy() {
  var desiredTrip = {
    from: null,
    to: null,
    date: null,
    time: null,
    timeType: "departure"
  };
}

var DesiredTripStore = assign({}, EventEmitter.prototype, {

  get: function() {
    return desiredTrip;
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
    case "create":
      from = action.from;
      to = action.to;
      date = action.date;
      time = action.time.trim();
      timeType = action.timeType.trim();
      if (from !== null && to !== null && date !== '' && time !== '' && timeType !== '') {
        create(from, fromId, to, toId, date, time, timeType);
        DesiredTripStore.emitChange();
      }
      break;

    case "setFrom":
      from = action.from;
      if(from.id !== null && from.name !== null) {
        setFrom(from);
        DesiredTripStore.emitChange();
      }
      break;

    case "setTo":
      to = action.to;
      if(to.id !== null && to.name !== null) {
        setTo(to);
        DesiredTripStore.emitChange();
      }
      break;

    case "setDate":
      date = action.time;
      if(date !== '') {
        setDate(date);
        DesiredTripStore.emitChange();
      }
      break;

    case "setTime":
      time = action.time.trim();
      if(time !== '') {
        setTime(time);
        DesiredTripStore.emitChange();
      }
      break;

    case "setTimeType":
      timeType = action.timeType.trim();
      if(timeType !== '') {
        setTimeType(timeType);
        DesiredTripStore.emitChange();
      }
      break;

    case "destroy":
      from = null;
      to = null;
      date = null;
      time = null;
      timeType = null
      destroy();
      DesiredTripStore.emitChange();
      break;

    default:

  }

});

module.exports = DesiredTripStore;
