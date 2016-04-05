const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

var desiredTravel = {
  from: null,
  to: null,
  time: null,
  timeType: "departure"
};

function create(from, to, time, timeType) {
  travel = {
    from: from,
    to: to,
    time: time,
    timeType: timeType
  };
}

function setFrom(from) {
  desiredTravel.from = from;
}

function setTo(to) {
  desiredTravel.to = to;
}

function setTime(time) {
  desiredTravel.time = time;
}

function setTimeType(timeType) {
  desiredTravel.timeType = timeType;
}

function destroy() {
  var desiredTravel = {
    from: null,
    to: null,
    time: null,
    timeType: "departure"
  };
}

var DesiredTravelStore = assign({}, EventEmitter.prototype, {

  get: function() {
    return desiredTravel;
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
  var from, to, time, timeType;

  switch(action.actionType) {
    case "create":
      from = action.from.trim();
      to = action.to.trim();
      time = action.time.trim();
      timeType = action.timeType.trim();
      if (from !== '' && to !== '' && time !== '' && timeType !== '') {
        create(from, to, time, timeType);
        DesiredTravelStore.emitChange();
      }
      break;

    case "setFrom":
      from = action.from.trim();
      if(from !== '') {
        setFrom(from);
        DesiredTravelStore.emitChange();
      }
      break;

    case "setTo":
      to = action.to.trim();
      if(to !== '') {
        setTo(to);
        DesiredTravelStore.emitChange();
      }
      break;

    case "setTime":
      time = action.time.trim();
      if(time !== '') {
        setTime(time);
        DesiredTravelStore.emitChange();
      }
      break;

    case "setTimeType":
      timeType = action.timeType.trim();
      if(timeType !== '') {
        setTimeType(timeType);
        DesiredTravelStore.emitChange();
      }
      break;

    case "destroy":
      from = "";
      to = "";
      time = "";
      timeType = "";
      destroy();
      DesiredTravelStore.emitChange();
      break;

    default:

  }

});

module.exports = DesiredTravelStore;
