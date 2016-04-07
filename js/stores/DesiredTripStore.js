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
  date: new Date(),
  timeType: "departure"
};

function create(from, to, date, timeType) {
  desiredTrip = {
    from: from,
    to: to,
    date: date,
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

function setTimeType(timeType) {
  desiredTrip.timeType = timeType;
}

function destroy() {
  var desiredTrip = {
    from: null,
    to: null,
    date: new Date(),
    timeType: "departure"
  };
}

var DesiredTripStore = assign({}, EventEmitter.prototype, {

  get: function() {
    return desiredTrip;
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
  var from, to, date, time, timeType;

  switch(action.actionType) {
    case "create":
      from = action.from;
      to = action.to;
      date = action.date;
      timeType = action.timeType.trim();
      if (from !== null && to !== null && date !== '' && timeType !== '') {
        create(from, fromId, to, toId, date, timeType);
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
      date = action.date;
      if(date !== null) {
        setDate(date);
        DesiredTripStore.emitChange();
      }
      break;

    case "setTimeType":
      timeType = action.timeType.trim();
      if(timeType !== null) {
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
