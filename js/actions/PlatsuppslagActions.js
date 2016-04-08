const AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '4e98a09b8fe84f1589922ae73098b946';

module.exports = {

  search: function(key) {
    if(key.length < 3) {
      AppDispatcher.dispatch({actionType: "SEARCH_PLACES", state: "destroy"});
      return;
    }
    fetch("http://api.sl.se/api2/typeahead.json?key="+apiKey+"&searchstring="+key+"&stationsonly="+false, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
        AppDispatcher.dispatch({actionType: "SEARCH_PLACES", key: key, state: "ready", data: responseData.ResponseData});
    })
    .done();
  }

};
