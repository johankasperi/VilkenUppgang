var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var travel = {
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
  travel.from = from;
}

function setTo(to) {
  travel.to = to;
}

function setTime(time) {
  travel.time = time;
}

function setTimeType(timeType) {
  travel.timeType = timeType;
}

function destroy() {
  var travel = {
    from: null,
    to: null,
    time: null,
    timeType: "departure"
  };
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

}
