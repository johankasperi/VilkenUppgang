var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var travel = {
  from: null,
  to: null,
  time: null,
  timeType: "departure",

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

var DesiredTravelStore = assign({}, EventEmitter.prototype, {

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

AppDispatcher.register(function(action) {
  var from, to, time, timeType;

  switch(action.actionType) {
    
    case "create":
      from = action.from.trim();
      to = action.to.trim();
      time = action.time;
      timeType = action.timeType.trim();
      if(action !== "" && to !== "" && time !== "" && timeType !== "") {
        create(from, to, time, timeType);
      }
      break;

    case "setFrom":
      from = action.from.trim();
      if(from !== "") {
        setFrom(from);
      }
      break;

    case "setTo":
      to = action.to.trim();
      if(to !== "") {
        setTo(to);
      }
      break;

    case "setTime":
      time = action.time.trim();
      if(time !== "") {
        setTime(time);
      }
      break;

    case "setTimeType":
      timeType = action.timeType.trim();
      if(timeType !== "") {
        setTimeType(timeType);
      }
      break;

    case "destroy":
      from = "";
      to = "";
      time = "";
      timeType = "";
      destroy();
      break;

    default:

  }
});
