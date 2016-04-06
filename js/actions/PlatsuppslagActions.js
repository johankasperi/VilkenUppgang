const AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '4e98a09b8fe84f1589922ae73098b946';

module.exports = {

  search: function(key) {
    console.log(key);
    if(key.length < 3) {
      return;
    }
    fetch("http://api.sl.se/api2/typeahead.json?key="+apiKey+"&searchstring="+key+"&stationsonly="+false, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
        console.log("Dispatch");
        AppDispatcher.dispatch({actionType: "SEARCH_PLACES", key: key, state: "ready", data: responseData});
    })
    .done();
  }

};
